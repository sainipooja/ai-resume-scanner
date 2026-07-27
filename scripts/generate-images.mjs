/**
 * Downloads gender-correct Indian portrait photos for each candidate.
 * Note: randomuser.me IGNORES gender when seed is set — so we fetch without seed
 * and verify gender + uniqueness.
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

const usedUrls = new Set()

async function fetchMatchingPhoto(expectedGender) {
  for (let attempt = 0; attempt < 40; attempt++) {
    const res = await fetch(
      `https://randomuser.me/api/?gender=${expectedGender}&nat=in&inc=picture,gender&noinfo`
    )
    const json = await res.json()
    const user = json.results[0]

    if (user.gender === expectedGender && !usedUrls.has(user.picture.large)) {
      usedUrls.add(user.picture.large)
      return user.picture.large
    }
  }
  throw new Error(`Could not find unique ${expectedGender} Indian photo`)
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

for (const c of candidates) {
  const photoUrl = await fetchMatchingPhoto(c.gender)
  const imgRes = await fetch(photoUrl)
  const buffer = Buffer.from(await imgRes.arrayBuffer())
  fs.writeFileSync(path.join(outDir, c.file), buffer)
  console.log(`✓ ${c.file} — ${c.name} (${c.gender})`)
}

console.log('\nGender-matched Indian portraits saved to public/images/')
