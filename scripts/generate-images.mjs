/**
 * Downloads realistic Indian portrait photos for each candidate.
 * Run: npm run generate-images
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'images')

const candidates = [
  { file: 'candidate1.jpg', gender: 'female', name: 'Priya Sharma' },
  { file: 'candidate2.jpg', gender: 'male', name: 'Arjun Mehta' },
  { file: 'candidate3.jpg', gender: 'female', name: 'Kavitha Reddy' },
  { file: 'candidate4.jpg', gender: 'male', name: 'Rahul Verma' },
  { file: 'candidate5.jpg', gender: 'female', name: 'Ananya Iyer' },
  { file: 'candidate6.jpg', gender: 'male', name: 'Vikram Singh' },
  { file: 'candidate7.jpg', gender: 'female', name: 'Meera Nair' },
  { file: 'candidate8.jpg', gender: 'female', name: 'Sneha Patel' },
  { file: 'candidate9.jpg', gender: 'male', name: 'Aditya Kapoor' },
  { file: 'candidate10.jpg', gender: 'male', name: 'Rohan Desai' },
]

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

for (const c of candidates) {
  const apiUrl = `https://randomuser.me/api/?gender=${c.gender}&nat=in&inc=picture`
  const res = await fetch(apiUrl)
  const json = await res.json()
  const photoUrl = json.results[0].picture.large

  const imgRes = await fetch(photoUrl)
  const buffer = Buffer.from(await imgRes.arrayBuffer())
  fs.writeFileSync(path.join(outDir, c.file), buffer)
  console.log(`✓ ${c.file} — ${c.name} (${c.gender})`)
}

console.log('\nReal portrait photos saved to public/images/')
