import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium"
import path from "path"
import fs from "fs/promises"

function generate_html(name , img, startDate, endDate,role){
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
      width: 210mm;   
      height: 297mm;
      background:url("${bg_style}") no-repeat center center;
      background-size: cover;
      padding: 40mm 15mm; 
      box-sizing: border-box;
      page-break-after: always;
      position: relative;
    }
     .name{
  
      margin-top : 20px;
      font-size: 17px;
      line-height: 1.25;
    }
     .heading{
      display: flex;
      gap: 120px;
      font-size: 20px;
      padding-top: 40px;
      font:bold
    }
    h2{
      padding-top: 5%;
      text-align: center;
      text-decoration: underline;
    }
    .footer{
      font-size: 17px;
      
      width: 90%;
    }
  </style>
</head>
<body>
<div class="page">
    
  <div class="heading">
    <div>Sub : Internship Certificate</div>
    <div>Date: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
  </div>
    <h2>TO WHOM IT MAY CONCERN</h2>

    <div class="name">
      <p>This is to certify that <b>${name}</b> has successfully completed an internship at Blockseblock as ${role}. The internship was held between ${startDate} to ${endDate}, with a total duration of 45 days.</p>

      <p>During this time, they showed tremendous dedication, enthusiasm, and a willingness to learn. <b>${name}</b> actively participated in various projects and tasks, gaining practical experience. They are a valuable team member and made a positive impact during their time with us.</p>

      <p><b>${name}</b> commitment to professional growth and the contributions made during the internship are greatly appreciated. They displayed strong skills, which bode well for their future career.</p>

      <p>We would like to extend our best wishes to <b>${name}</b> for a successful future, and we are confident that they will continue to excel in their chosen field.</p>

      <p>If you have any further questions regarding <b>${name}</b> internship or performance at BlockseBlock, please do not hesitate to reach out to us.</p>
    </div>
  </div>
</body>
</html>
    `
}

export async function generate_internship_certificate(name, startDate, endDate, role){
    const browser =await puppeteer.launch(
        {
            args : chromium.args,
            defaultViewport : chromium.defaultViewport,
            executablePath : await chromium.executablePath(),
            headless : chromium.headless
        }
    );
    const page = await browser.newPage();
    const imagePath = path.join(process.cwd(),"public/intern.jpg")
    const base_64 =await fs.readFile(imagePath);
    const buffer = base_64.toString("base64");
    const html = generate_html(name, buffer,startDate,endDate,role);
    const outputPath = `/tmp/${name.replace(/\s+/g,"_")}-certificate.pdf`
    await page.setContent(html);
    await page.pdf({
        path : outputPath,
        preferCSSPageSize : true,
        printBackground : true,
        width : '210mm',
        height : '297mm',
        margin: { top: "0", right: "0", bottom: "0", left: "0" }
    });
    await browser.close();
    return outputPath;
}