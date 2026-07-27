/**
 * IMPORTANT: After deploying to Vercel, replace PRODUCTION_URL with your actual URL.
 * Example: https://my-resume-scanner.vercel.app
 *
 * In development, the QR code automatically uses your local server URL
 * so phone scanning works on the same WiFi network.
 */
const PRODUCTION_URL = 'https://ai-resume-scanner-delta.vercel.app'

function getSiteUrl() {
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    return window.location.origin
  }
  return PRODUCTION_URL
}

export const SITE_URL = getSiteUrl()

/** QR links here — scanning this URL on a phone opens the app and starts the scan flow */
export const QR_SCAN_URL = `${typeof window !== 'undefined' ? window.location.origin : PRODUCTION_URL}/?scan=1`

export const SITE = {
  name: 'AI Resume Scanner',
  tagline: 'Scan Candidates Instantly',
  scanSteps: [
    'QR Code Detected...',
    'Reading Profiles...',
    'Matching Skills...',
    'Fetching Resumes...',
    'Preparing Dashboard...',
    'Access Granted',
  ],
}

export const SCAN_KEY = 'ai-scanner-access-granted'
