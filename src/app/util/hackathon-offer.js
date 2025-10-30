
export function generate_offer_email(projectName, hackathonName, courseLink, feedbackPoints,course,offer){
 
    return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>BSB — Project Review</title>
  </head>
  <body>
   

    <p>Hi</p>

    <p>You did an amazing job with “${projectName}” during ${hackathonName}.</p>

    <p>Our BSB team personally reviewed your project (yep, every single part), and we loved the creativity and intent behind it. It’s got huge potential — just needs a few technical refinements to reach that career-building level.</p>

    <p><strong>While reviewing "${projectName}," here's what we noticed:</strong></p>
    <ul>
      ${feedbackPoints}
    </ul>

    <p>These are very common challenges developers face early in their journey — and mastering them is exactly what takes your project from college-level to industry-ready.</p>

    <p>That’s why we’ve built a hands-on ${course} course designed around these exact gaps. It’s fully practical, mentor-led, and helps you fix the real issues we found — step by step.</p>

    <p>
      <a href="${courseLink}">Get ${offer}% Off — Enrol Now</a><br>
     
    </p>

    <p>Since you were part of ${hackathonName}, you’re getting an exclusive 50% off, plus lifetime mentor support to keep improving your dev journey.</p>

    <p>Once you’ve applied these upgrades, send us your improved version of “${projectName}”. We’d love to check it again and see your progress — and will recommend your profile which is best suited as per your tech skills.</p>

    <p>Keep coding. Keep building. Keep growing.</p>

    <p>Regards,<br>Team BSB</p>
  </body>
</html>

    `
}




