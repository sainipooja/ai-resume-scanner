import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { candidates } from '../src/data/candidates.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const out = path.join(__dirname, '..', 'public', 'resumes')

function html(c) {
  const edu = c.education
    .map(
      (e) => `
    <tr>
      <td>${e.year}</td>
      <td>${e.degree}</td>
      <td>${e.institution}</td>
      <td>${e.score}</td>
    </tr>`
    )
    .join('')

  const skills = c.skills.map((s) => `<li>${s}</li>`).join('')
  const languages = c.languages.map((l) => `<li>${l}</li>`).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${c.name} — Resume</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Times New Roman', Times, serif;
      color: #000;
      line-height: 1.5;
      max-width: 800px;
      margin: 0 auto;
      padding: 36px 40px;
      background: #fff;
      font-size: 14px;
    }
    h1 {
      text-align: center;
      font-size: 22px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 4px;
    }
    .subtitle {
      text-align: center;
      font-size: 14px;
      margin-bottom: 16px;
    }
    .contact {
      text-align: center;
      font-size: 13px;
      margin-bottom: 20px;
      line-height: 1.7;
    }
    section { margin-bottom: 18px; }
    section h2 {
      font-size: 14px;
      text-transform: uppercase;
      border-bottom: 1px solid #000;
      padding-bottom: 3px;
      margin-bottom: 10px;
      letter-spacing: 0.5px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }
    th, td {
      border: 1px solid #000;
      padding: 6px 8px;
      text-align: left;
      vertical-align: top;
    }
    th { background: #f5f5f5; font-weight: bold; }
    ul {
      padding-left: 22px;
      font-size: 13px;
    }
    li { margin-bottom: 4px; }
    .print-btn {
      position: fixed;
      top: 16px;
      right: 16px;
      background: #333;
      color: #fff;
      border: none;
      padding: 8px 18px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      font-family: Arial, sans-serif;
    }
    @media print {
      .print-btn { display: none; }
      body { padding: 20px; }
    }
  </style>
</head>
<body>
  <button class="print-btn" onclick="window.print()">Print as PDF</button>

  <h1>${c.name}</h1>
  <p class="subtitle">${c.role}</p>

  <div class="contact">
    <strong>Email:</strong> ${c.email}<br>
    <strong>Phone:</strong> ${c.phone}<br>
    <strong>Address:</strong> ${c.address}
  </div>

  <section>
    <h2>Educational Qualification</h2>
    <table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Course / Degree</th>
          <th>Institution</th>
          <th>Percentage / CGPA</th>
        </tr>
      </thead>
      <tbody>${edu}</tbody>
    </table>
  </section>

  <section>
    <h2>Technical Skills</h2>
    <ul>${skills}</ul>
  </section>

  <section>
    <h2>Languages Known</h2>
    <ul>${languages}</ul>
  </section>
</body>
</html>`
}

if (!fs.existsSync(out)) fs.mkdirSync(out, { recursive: true })

candidates.forEach((c) => {
  fs.writeFileSync(path.join(out, `resume${c.id}.html`), html(c), 'utf-8')
  console.log(`✓ resume${c.id}.html — ${c.name}`)
})

console.log('Done — simple fresher resumes generated')
