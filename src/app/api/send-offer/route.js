import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";

import csv from "csv-parser";
import { generate_pdf } from "@/app/util/lib";



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
    const tempDir = "/tmp";
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
      const {name, email,subject, body, date,role,duties,post} = row;

      if (!name || !email || !subject || !body || !date || !post || !duties || !role) {
        results.push({ email, status: "❌ Missing fields" });
        continue;
      }
      const record = {
        name : name,
        email : email,
        subject : subject,
        body : body,
        date : date,
        post : post,
        duties : duties,
        role : role
      }
      const filePath = await generate_pdf(record);

      try {
        await transport.sendMail({
          from: '"BlockseBlock" <associations@blockseblock.com>',
          to: email,
          subject,
          html: body.replace(/\{name\}/g, name),
          attachments: [
            {
              filename: `${name}-offer-letter.pdf`,
              path: filePath,
            },
          ],
        });
        results.push({ email, status: "✅ Sent" });
      } catch (err) {
        results.push({ email, status: `❌ Email error: ${err.message}` });
      }

      // Delete temp file
      try{fs.unlinkSync(filePath)}catch{};
    }

    // Delete temp CSV
    fs.unlinkSync(csvPath);

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
