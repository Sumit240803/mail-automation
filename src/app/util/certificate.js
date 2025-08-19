import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium"
import path from "path"
import fs from "fs/promises"
function generate_html(name , img){
    const bg_style =  `data:image/png;base64,${img}`;
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Offer Letter</title>
  <style>
    body {
      margin: 0;
      font-family: sans-serif;
    }
    .page {
      height: 210mm;   
      width: 297mm;
      background: url("${bg_style}") no-repeat center center;
      background-size: contain;
      padding: 40mm 25mm; 
      box-sizing: border-box;
      page-break-after: always;
      position: relative;
    }
    .name{
      position: absolute;
      top: 47%;
      left: 46%;
      text-align: center;
      font-size: 28px;
    }
  </style>
</head>
<body>
<div class="page">
<div class="name">
  ${name}
</div>
</div>
</body>
</html>
    `
}



export async function generate_pdf_achievement(name){
    const browser =await puppeteer.launch(
        {
            args : chromium.args,
            defaultViewport : chromium.defaultViewport,
            executablePath : await chromium.executablePath(),
            headless : chromium.headless
        }
    );
    const page = await browser.newPage();
    const imagePath = path.join(process.cwd(),"public/achievement.jpg")
    const base_64 =await fs.readFile(imagePath);
    const buffer = base_64.toString("base64");
    const html = generate_html(name, buffer);
    const outputPath = `/tmp/${name.replace(/\s+/g,"_")}-achievement-certificate.pdf`
    await page.setContent(html);
    await page.pdf({
        path : outputPath,
        preferCSSPageSize : true,
        printBackground : true,
        width : '297mm',
        height : '210mm',
        margin: { top: "0", right: "0", bottom: "0", left: "0" }
    });
    await browser.close();
    return outputPath;
}

export async function generate_pdf_participation(name){
    const browser =await puppeteer.launch(
        {
            args : chromium.args,
            defaultViewport : chromium.defaultViewport,
            executablePath : await chromium.executablePath(),
            headless : chromium.headless
        }
    );
    const page = await browser.newPage();
    const imagePath = path.join(process.cwd(),"public/participation.jpg")
    const base_64 =await fs.readFile(imagePath);
    const buffer = base_64.toString("base64");
    const html = generate_html(name, buffer);
    const outputPath = `/tmp/${name.replace(/\s+/g,"_")}-participation-certificate.pdf`
    await page.setContent(html);
    await page.pdf({
        path : outputPath,
        preferCSSPageSize : true,
        printBackground : true,
        width : '297mm',
        height : '210mm',
        margin: { top: "0", right: "0", bottom: "0", left: "0" }
    });
    await browser.close();
    return outputPath;
}