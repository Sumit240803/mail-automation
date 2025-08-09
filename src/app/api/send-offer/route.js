import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";
import fetch from "node-fetch";
import csv from "csv-parser";

// Convert Google Drive share link to direct download link
function convertGoogleDriveLink(url) {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    const fileId = match[1];
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
  return url; // if not Google Drive, return as is
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const csvFile = formData.get("csv");

    if (!csvFile) {
      return NextResponse.json({ success: false, error: "CSV file missing" });
    }

    // Save CSV temporarily
    const bytes = await csvFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempDir = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
    const csvPath = path.join(tempDir, csvFile.name);
    await writeFile(csvPath, buffer);

    // Parse CSV
    const rows = [];
    await new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on("data", (data) => rows.push(data))
        .on("end", resolve)
        .on("error", reject);
    });

    // Setup mail transport
    const transport = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.NEXT_PUBLIC_USER,
        pass: process.env.NEXT_PUBLIC_PW,
      },
    });

    const results = [];

    for (const row of rows) {
      const { name, email, offer_letter, subject, body } = row;

      if (!name || !email || !offer_letter || !subject || !body) {
        results.push({ email, status: "❌ Missing fields" });
        continue;
      }

      // Convert and download PDF
      const fileUrl = convertGoogleDriveLink(offer_letter);
      const res = await fetch(fileUrl);
      if (!res.ok) {
        results.push({ email, status: "❌ Failed to download file" });
        continue;
      }
      const pdfBuffer = Buffer.from(await res.arrayBuffer());

      const filePath = path.join(tempDir, `${name}-offer.pdf`);
      await writeFile(filePath, pdfBuffer);

      try {
        await transport.sendMail({
          from: '"BlockseBlock" <associations@blockseblock.com>',
          to: email,
          subject,
          html: body.replace("{name}", name),
          attachments: [
            {
              filename: `${name}-offer.pdf`,
              path: filePath,
            },
          ],
        });
        results.push({ email, status: "✅ Sent" });
      } catch (err) {
        results.push({ email, status: `❌ Email error: ${err.message}` });
      }

      // Delete temp file
      fs.unlinkSync(filePath);
    }

    // Delete temp CSV
    fs.unlinkSync(csvPath);

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
