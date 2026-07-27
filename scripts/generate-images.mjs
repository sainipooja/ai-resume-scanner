/**
 * Downloads unique Indian portrait photos for each candidate.
 * Uses unique seeds so no two candidates share the same photo.
 * Run: npm run generate-images
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'images')

const candidates = [
  { file: 'candidate1.jpg', gender: 'female', seed: 'priya-sharma-rvce-2026' },
  { file: 'candidate2.jpg', gender: 'male', seed: 'arjun-mehta-pes-2026' },
  { file: 'candidate3.jpg', gender: 'female', seed: 'kavitha-reddy-bms-2026' },
  { file: 'candidate4.jpg', gender: 'male', seed: 'rahul-verma-msrit-2026' },
  { file: 'candidate5.jpg', gender: 'female', seed: 'ananya-iyer-christ-2026' },
  { file: 'candidate6.jpg', gender: 'male', seed: 'vikram-singh-dsce-2026' },
  { file: 'candidate7.jpg', gender: 'female', seed: 'meera-nair-manipal-2026' },
  { file: 'candidate8.jpg', gender: 'female', seed: 'sneha-patel-vit-2026' },
  { file: 'candidate9.jpg', gender: 'male', seed: 'aditya-kapoor-srm-2026' },
  { file: 'candidate10.jpg', gender: 'male', seed: 'rohan-desai-bits-2026' },
]

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

for (const c of candidates) {
  const apiUrl = `https://randomuser.me/api/?seed=${encodeURIComponent(c.seed)}&gender=${c.gender}&nat=in&inc=picture`
  const res = await fetch(apiUrl)
  const json = await res.json()
  const photoUrl = json.results[0].picture.large

  const imgRes = await fetch(photoUrl)
  const buffer = Buffer.from(await imgRes.arrayBuffer())
  fs.writeFileSync(path.join(outDir, c.file), buffer)
  console.log(`✓ ${c.file} — seed: ${c.seed}`)
}

console.log('\nUnique Indian portraits saved to public/images/')
