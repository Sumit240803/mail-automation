import nodemailer from "nodemailer"
import fs from "fs";
import { writeFile } from "fs/promises";
import csv from "csv-parser"
import { NextResponse } from "next/server";
import path from "path";
import { generate_pdf_openxai } from "@/app/util/openxai";
import { generate_pdf_openxai2 } from "@/app/util/openxai2";
export async function POST(req){
    try {
        const formData = await req.formData();
        const csvFile = formData.get("csv");
        if (!csvFile) {
              return NextResponse.json({ success: false, error: "CSV file missing" });
            }
        const bytes = await csvFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const tempDir = "/tmp"
        if(!fs.existsSync(tempDir)){
           await fs.promises.mkdir(tempDir,{recursive : true});
        }
        const csvPath = path.join(tempDir, csvFile.name);
        await writeFile(csvPath,buffer);
        const rows = [];
        await new Promise((resolve,reject)=>{
            fs.createReadStream(csvPath)
            .pipe(csv())
            .on("data",(data)=>rows.push(data))
            .on("end",resolve)
            .on("error",reject)
        });
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
              const {name, email} = row;
        
              if (!name || !email ) {
                results.push({ email, status: "❌ Missing fields" });
                continue;
              }
              
              const filePath = await generate_pdf_openxai2(name);
        
              try {
                await transport.sendMail({
                  from: '"BlockseBlock" <associations@blockseblock.com>',
                  to: email,
                  subject : "Certificate of Achievement from OpenxAI Bootcamp",
                  html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Certificate of Achievement</title>
    <style>
      body { font-family: Arial, Helvetica, sans-serif; background:#f9fafb; margin:0; padding:0; }
      .container { max-width:600px; margin:40px auto; background:#ffffff; padding:30px; border-radius:10px; box-shadow:0 2px 8px rgba(0,0,0,0.05); }
      h1 { color:#111827; font-size:22px; margin-bottom:16px; }
      p { color:#374151; font-size:15px; line-height:1.6; }
      .highlight { font-weight:bold; color:#111827; }
      .footer { font-size:13px; color:#6b7280; margin-top:30px; text-align:center; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Congratulations, ${name}! 🎉</h1>
      <p>
        We are proud to award you this <span class="highlight">Certificate of Achievement</span> 
        for the successful completion of the <strong>Hands-on Bootcamp on Artificial Intelligence</strong>.
      </p>
      <p>
        This certificate recognizes your commitment to applied learning and professional excellence 
        in the field of AI. 
      </p>
      <p>
        Please find your official certificate attached as a PDF. You can keep it for your records or 
        share it to showcase your accomplishment.
      </p>
      <p class="footer">
        — BlockseBlock & OpenxAI Team<br>
        <strong>Date: ${new Date().toLocaleDateString()}</strong>
      </p>
    </div>
  </body>
</html>
`,
                  attachments: [
                    {
                      filename: `${name}-certificate.pdf`,
                      path: filePath,
                    },
                  ],
                });
                results.push({ email, status: "✅ Sent" });
              } catch (err) {
                results.push({ email, status: `❌ Email error: ${err.message}` });
              }
            }
            return NextResponse.json({ success: true, results });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}