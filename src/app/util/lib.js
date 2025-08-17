import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import fs from 'fs/promises';
import path from "path";
function generate_duties(duties){
    const gen_duties = duties.split(";").map(d => d.trim());
    console.log(gen_duties.map((d,i)=>`<li>${d}</li>`).join(""));
    return gen_duties.map((d,i)=>`<li>${d}</li>`).join("");
}

export async function generate_pdf(records){
    const tempDir = "/tmp";
    await fs.mkdir(tempDir, { recursive: true });
    const browser = await puppeteer.launch({
      args : chromium.args,
      defaultViewport : chromium.defaultViewport,
      executablePath : await chromium.executablePath(),
      headless : chromium.headless
    });
    const page = await browser.newPage();
    const imagePath = path.join(process.cwd(),"public/offer-bg-1.png");
    //const res = await fetch(imagePath);
const buffer=await fs.readFile(imagePath);
const base_64 = buffer.toString("base64");
    const html = generate_html(records,base_64);
    await page.setContent(html,{waitUntil : 'load'});
    const outputPath = `/tmp/${records.name.replace(/\s+/g,"_")}-offer-letter.pdf`
    await page.pdf({
        path : outputPath,
        format : 'A4',
        printBackground : true
    });
    await browser.close();
    return outputPath;
}


function generate_html(record,img){
    console.log(record.duties);
    const bg_style = `data:image/png;base64,${img}`;
    const duties = generate_duties(record.duties);
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
      width: 210mm;   /* A4 size */
      height: 297mm;
      background: url("${bg_style}") no-repeat center center;
      background-size: cover;
      padding: 40mm 25mm; /* space for margins */
      box-sizing: border-box;
      page-break-after: always;
    }
    h1, h2, h3 {
      margin: 0;
    }
    .content {
      white-space: pre-wrap; /* preserves line breaks */
      font-size: 12pt;
      line-height: 1.5;
    }
      
      ol {
  margin-top: -30px;   /* reduce top gap */
  margin-bottom: -20px;
  padding-left: 20px; /* control indent */
}
ol li {
  margin-bottom: 5px; /* spacing between duties */
}
  </style>
</head>
<body>
  <!-- Page 1 -->
  <div class="page">
    <div class="content">
<b>${record.date}</b>

To ${record.name}

Subject- ${record.subject}

Dear ${record.name},

We are excited to present to you this formal offer of appointment for the position of <b>${record.post}</b> at BlockseBlock. Your expertise and professional background stand out as a great fit for our team.

<b>Position</b>
You will be engaged as a <b>${record.post}</b>. In your new role, you will be expected to fulfill the following primary duties.

<b>Primary Duties</b>
<ol>
    ${duties}
</ol>

<b>Commencement of Internship</b>
Your anticipated start date with BlockseBlock is set for ${record.date}.
    </div>
  </div>

  <!-- Page 2 -->
<div class ="page">
<div class ="content">


<b>Internship Period</b>

Your Internship period will be of 45 days.The duration of training will be from ${record.date} to ${record.end_date}. Your continued employment with the Company is subject to your meeting the qualifying criteria till the end of the training and Successful completion of the training.

<b>Compensation</b>

This internship does not offer a stipend or salary

<b>At-Will Employment</b>

Please understand that your employment with Blockseblock is at-will. This means that either you or the company may terminate the employment relationship at any time , for any reason with or without notice.

<b>Confidentiality and Non-Compete Agreement</b>

As part of your onboarding process, you will be required to read, understand, and agree to abide by the company's confidentiality and non-compete agreement.

</div>
</div>

  <!-- Page 3 -->
  <div class="page">
    <div class="content">
<b>General Terms and Conditions</b>

- You are expected to perform your duties with initiative, efficiency, and economy.
- Adherence to company policies is mandatory.
- Any outside employment or business activity will account for legal actions against you and immediate termination of your employment.
- Confidentiality of proprietary information is paramount during and after your tenure.
- Intellectual property generated during employment shall be the sole property of Blockseblock.
- Termination may result from any misconduct or breach of company policy.

<b>Documentation</b>
Please sign and return the enclosed copy of this letter as an acknowledgment of the terms and provide the following documents:
- Signed copy of this offer letter
- Copies of your address and ID proofs

Sincerely,
Sahil Thakur  
Director  
Blockseblock


<b>Acknowledgment ${record.name} :- ______________________</b>  
[Please sign above as confirmation of acceptance of the offer terms and conditions]
    </div>
  </div>
</body>
</html>

    `
}
