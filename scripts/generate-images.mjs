/**
 * Downloads gender-correct Indian portrait photos for each candidate.
 * Run: npm run generate-images
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { candidates } from '../src/data/candidates.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'images')

const usedUrls = new Set()

async function fetchMatchingPhoto(expectedGender) {
  for (let attempt = 0; attempt < 50; attempt++) {
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
  const file = `candidate${c.id}.jpg`
  fs.writeFileSync(path.join(outDir, file), buffer)
  console.log(`✓ ${file} — ${c.name} (${c.gender})`)
}

console.log('\nGender-matched Indian portraits saved to public/images/')
