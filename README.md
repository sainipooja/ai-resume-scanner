# AI Resume Scanner

A futuristic, interactive recruitment experience built with React + Vite. Users must complete an AI scanning sequence before accessing the candidate dashboard.

## Run

```bash
cd ai-resume-scanner
npm install
npm run dev
```

## Experience Flow

1. **Landing** — Futuristic scanner, cream/chocolate/gold theme, **START SCANNING** only
2. **Scan Animation** — 4-second sequence with laser sweep, progress bar, status messages
3. **Dashboard** — "Candidates Detected" with 10 premium stagger-animated cards
4. **Resume Page** — `/candidate/1` … `/candidate/10` full profiles

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- React Router
- React Icons

## Deploy to Vercel

Push to GitHub → Import on Vercel → Deploy (vercel.json included)

## Real QR Scan Flow (Phone)

1. **Deploy** to Vercel (or run `npm run dev -- --host` for local network testing)
2. Update `SITE_URL` in `src/config/site.js` with your live URL
3. Open **`/poster`** in the app → Print the QR code → Put it on your university poster
4. **Recruiter scans QR with phone camera** → Opens `yoursite.vercel.app/?scan=1`
5. Scan animation plays automatically → **Candidates Detected** dashboard appears

### Test on your phone (before deploy)

```bash
npm run dev -- --host
```

Find your PC IP (e.g. `192.168.1.5`), set in `site.js`:

```js
export const SITE_URL = 'http://192.168.1.5:5173'
```

Open `/poster` on desktop, scan QR with phone (same WiFi).

## Profile Photos

Real Indian portrait photos in `public/images/`. Regenerate:

```bash
npm run generate-images
```

## Project Structure

```
src/
├── components/   FuturisticScanner, ScanSequence, ParticleBackground, CandidateCard
├── pages/        Landing, Dashboard, Candidate
├── data/         candidates.js
└── config/       site.js
public/
├── images/       candidate portraits
└── resumes/      HTML resumes (Print as PDF)
```

## Reset Scan

Click **New Scan** on dashboard, or clear session storage:

```js
sessionStorage.removeItem('ai-scanner-access-granted')
```
