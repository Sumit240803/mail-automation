
export function generate_offer_email(projectName, hackathonName, courseLink, enquiryForm){
 
    return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>BSB — Project Review</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #eef2f7;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .container {
      max-width: 700px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    }
    .header {
      background: linear-gradient(135deg, #2563eb, #1e40af);
      color: #fff;
      padding: 30px 40px;
      text-align: left;
    }
    .header h1 {
      font-size: 22px;
      margin: 0;
      font-weight: 700;
    }
    .content {
      padding: 30px 40px;
      color: #1e293b;
    }
    .content p {
      line-height: 1.6;
      font-size: 15px;
      margin-bottom: 14px;
    }
    .content ul {
      margin: 10px 0 16px 20px;
    }
    .content li {
      margin-bottom: 8px;
    }
    .highlight {
      background: #eff6ff;
      border-left: 4px solid #2563eb;
      padding: 10px 14px;
      border-radius: 6px;
      margin-bottom: 16px;
    }
    .btn-group {
      margin: 24px 0;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .btn {
      display: inline-block;
      text-decoration: none;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 600;
      text-align: center;
      transition: all 0.3s ease;
    }
    .btn-primary {
      background-color: #2563eb;
      color: white;
    }
    .btn-primary:hover {
      background-color: #1d4ed8;
    }
    .btn-outline {
      border: 2px solid #2563eb;
      color: #2563eb;
      background: transparent;
    }
    .btn-outline:hover {
      background: #2563eb;
      color: #fff;
    }
    .footer {
      background-color: #f8fafc;
      text-align: center;
      padding: 20px 30px;
      font-size: 13px;
      color: #64748b;
    }
    .footer a {
      color: #2563eb;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>“${projectName}” can be more than a project — it can start your career </h1>
    </div>

    <div class="content">
      <p>Hi <strong>[First Name]</strong>,</p>
      <p>You did an amazing job with <strong>“${projectName}”</strong> during <strong>${hackathonName}</strong></p>
      <p>Our BSB team personally reviewed your project (yep, every single part ), and we loved the creativity and intent behind it. It’s got huge potential — just needs a few technical refinements to reach that career-building level.</p>

      <div class="highlight">
        <p><strong>While reviewing “${projectName},” here’s what we noticed:</strong></p>
        <ul>
          <li>The smart contract logic needs better optimization and modularity.</li>
          <li>Integration between frontend and blockchain components can be smoother.</li>
          <li>Error handling & testing can be improved for better stability.</li>
        </ul>
      </div>

      <p>These are very common challenges developers face early in their journey — and mastering them is exactly what takes your project from college-level to industry-ready.</p>
      <p>That’s why we’ve built a hands-on Web development / Python course designed around these exact gaps. It’s fully practical, mentor-led, and helps you fix the real issues we found — step by step.</p>

      <div class="btn-group">
        <a href="${courseLink}" class="btn btn-primary">Get 50% Off — Enrol Now</a>
        <a href="${enquiryForm}" class="btn btn-outline">Enquire / Ask a Question</a>
      </div>

      <p>Since you were part of <strong>${hackathonName}</strong>, you’re getting an exclusive <strong>50% off</strong>, plus lifetime mentor support to keep improving your dev journey </p>
      <p>Once you’ve applied these upgrades, send us your improved version of <strong>“${projectName}”</strong>. We’d love to check it again and see your progress — and will recommend your profile which is best suited as per your tech skills.</p>

      <p>Keep coding. Keep building. Keep growing.</p>
      <p>Regards,<br>Team <strong>BSB</strong></p>
    </div>

 
  </div>
</body>
</html>

    `
}




