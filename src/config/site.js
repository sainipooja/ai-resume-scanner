/**
 * IMPORTANT: After deploying to Vercel, replace PRODUCTION_URL with your actual URL.
 */
const PRODUCTION_URL = 'https://ai-resume-scanner-delta.vercel.app'

function getSiteUrl() {
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    return window.location.origin
  }
  return PRODUCTION_URL
}

export const SITE_URL = getSiteUrl()

export const QR_SCAN_URL = `${typeof window !== 'undefined' ? window.location.origin : PRODUCTION_URL}/?scan=1`

export const SITE = {
  name: 'AI Resume Scanner',
  tagline: 'Discover Top Talent in Seconds',
  badge: 'Campus Placement Drive · 2026',
  qrButton: 'Get Event QR Code',
  qrHint: 'Print the QR code on your poster. Anyone can scan it with a phone camera to view all resumes instantly.',
  previewButton: 'Preview Experience',
  scanSteps: [
    'QR Code Detected...',
    'Reading Profiles...',
    'Matching Skills...',
    'Fetching Resumes...',
    'Preparing Dashboard...',
    'Access Granted',
  ],
  dashboard: {
    badge: 'Scan Successful',
    title: 'Top Candidates Found',
    subtitle: 'Ten verified engineering graduates — explore profiles, skills, and resumes in one place.',
    footer: 'Class of 2026 · Engineering & Technology · Open to opportunities',
  },
  poster: {
    event: 'University Placement Drive 2026',
    headline: 'Scan to Explore Resumes',
    step1: 'Open your phone camera',
    step2: 'Point at the QR code',
    step3: 'Browse all candidate profiles',
    printButton: 'Print for Poster',
    scanLabel: 'Scan with Phone Camera',
  },
}

export const SCAN_KEY = 'ai-scanner-access-granted'
