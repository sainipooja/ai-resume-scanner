import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { candidates } from '../src/data/candidates.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const out = path.join(__dirname, '..', 'public', 'resumes')

function html(c) {
  const edu = c.education.map((e) => `<div class="item"><h3>${e.degree}</h3><p>${e.institution} · ${e.year} · ${e.score}</p></div>`).join('')
  const proj = c.projects.map((p) => `<div class="item"><h3>${p.name}</h3><p>${p.desc}</p><p class="tech">${Array.isArray(p.tech) ? p.tech.join(', ') : p.tech}</p></div>`).join('')
  const intern = c.internships.map((i) => `<div class="item"><div class="row"><h3>${i.role} — ${i.company}</h3><span>${i.period}</span></div><p>${i.desc}</p></div>`).join('')
  const exp = c.experience.map((e) => `<div class="item"><div class="row"><h3>${e.role} — ${e.company}</h3><span>${e.period}</span></div><p>${e.desc}</p></div>`).join('')

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${c.name} — ${c.role}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Georgia,serif;color:#4E342E;line-height:1.65;max-width:850px;margin:0 auto;padding:40px 32px;background:#FFF8EE}
.header{text-align:center;border-bottom:3px solid #D4AF37;padding-bottom:24px;margin-bottom:28px}
.header h1{font-size:30px;color:#4E342E;margin-bottom:4px}
.header h2{font-size:17px;color:#6D4C41;font-weight:500;margin-bottom:14px}
.contact{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;font-size:12px;color:#6D4C41}
section{margin-bottom:24px}
section>h2{font-size:14px;color:#D4AF37;text-transform:uppercase;letter-spacing:1.2px;border-bottom:1px solid #F3E5D0;padding-bottom:6px;margin-bottom:14px}
.summary{font-size:14px;text-align:justify;color:#6D4C41}
.skills{display:flex;flex-wrap:wrap;gap:8px}
.tag{background:#F3E5D0;color:#4E342E;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600}
.item{margin-bottom:14px}
.item h3{font-size:14px;color:#4E342E}
.item p,.item li{font-size:13px;color:#6D4C41}
.row{display:flex;justify-content:space-between;flex-wrap:wrap;gap:4px}
.row span{font-size:12px;color:#A1887F}
.tech{font-size:11px;color:#D4AF37;margin-top:3px}
.certs li{font-size:13px;list-style:none;padding:3px 0 3px 16px;position:relative;color:#6D4C41}
.certs li::before{content:"◆";position:absolute;left:0;color:#D4AF37;font-size:8px;top:6px}
.print-btn{position:fixed;top:20px;right:20px;background:linear-gradient(135deg,#4E342E,#6D4C41);color:#FFF8EE;border:none;padding:10px 22px;border-radius:10px;cursor:pointer;font-weight:600;z-index:100}
@media print{.print-btn{display:none}body{padding:20px}}
</style></head><body>
<button class="print-btn" onclick="window.print()">Print as PDF</button>
<div class="header"><h1>${c.name}</h1><h2>${c.role}</h2>
<div class="contact"><span>${c.email}</span><span>•</span><span>${c.phone}</span><span>•</span><span>${c.college}</span></div></div>
<section><h2>Career Objective</h2><p class="summary">${c.objective}</p></section>
<section><h2>Education</h2>${edu}</section>
<section><h2>Technical Skills</h2><div class="skills">${c.technicalSkills.map((s)=>`<span class="tag">${s}</span>`).join('')}</div></section>
<section><h2>Projects</h2>${proj}</section>
<section><h2>Internships</h2>${intern}</section>
<section><h2>Experience</h2>${exp}</section>
<section><h2>Certifications</h2><ul class="certs">${c.certifications.map((x)=>`<li>${x}</li>`).join('')}</ul></section>
<section><h2>Achievements</h2><ul class="certs">${c.achievements.map((x)=>`<li>${x}</li>`).join('')}</ul></section>
<section><h2>Contact</h2><p class="summary">${c.email} · ${c.phone}<br>${c.linkedin} · ${c.github}</p></section>
</body></html>`
}

if (!fs.existsSync(out)) fs.mkdirSync(out, { recursive: true })
candidates.forEach((c) => {
  fs.writeFileSync(path.join(out, `resume${c.id}.html`), html(c), 'utf-8')
  console.log(`✓ resume${c.id}.html — ${c.name}`)
})
console.log('Done')
