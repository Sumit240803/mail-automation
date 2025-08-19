import nodemailer from "nodemailer"
import fs from "fs";
import { writeFile } from "fs/promises";
import csv from "csv-parser"
import { generate_pdf_achievement } from "@/app/util/certificate";
import { NextResponse } from "next/server";
import path from "path";
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
              const {name, email,subject, body} = row;
        
              if (!name || !email || !subject || !body ) {
                results.push({ email, status: "❌ Missing fields" });
                continue;
              }
              
              const filePath = await generate_pdf_achievement(name);
        
              try {
                await transport.sendMail({
                  from: '"BlockseBlock" <associations@blockseblock.com>',
                  to: email,
                  subject,
                  html: body.replace(/\{name\}/g, name),
                  attachments: [
                    {
                      filename: `${name}-achievement-certificate.pdf`,
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