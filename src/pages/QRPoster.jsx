import { QRCodeSVG } from 'qrcode.react'
import { motion } from 'framer-motion'
import { HiOutlinePrinter, HiOutlineDeviceMobile, HiOutlineExclamation } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { SITE } from '../config/site'
import ParticleBackground from '../components/ParticleBackground'

export default function QRPoster() {
  const handlePrint = () => window.print()

  const hostname = window.location.hostname
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1'
  const scanUrl = `${window.location.origin}/?scan=1`

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 py-16 print:min-h-0 print:py-8">
        {isLocalhost && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 w-full rounded-2xl border border-red-300/50 bg-red-50/90 p-4 text-left print:hidden"
          >
            <div className="flex gap-3">
              <HiOutlineExclamation className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
              <div>
                <p className="text-sm font-bold text-red-800">Phone cannot scan localhost!</p>
                <p className="mt-1 text-xs leading-relaxed text-red-700">
                  In your terminal, find the <strong>Network:</strong> URL (e.g.{' '}
                  <code className="rounded bg-red-100 px-1">http://192.168.x.x:5173</code>
                  ). Open that URL on your PC, then go to <strong>/poster</strong> again.
                  Both phone and PC must be on the <strong>same WiFi</strong>.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-luxury w-full rounded-3xl p-8 text-center shadow-2xl print:shadow-none"
        >
          <p className="mb-2 text-xs font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
            University Career Fair 2026
          </p>
          <h1 className="font-display mb-2 text-3xl font-bold text-[#4E342E]">{SITE.name}</h1>
          <p className="mb-8 text-sm text-[#6D4C41]/80">{SITE.tagline}</p>

          {!isLocalhost && (
            <>
              <div className="mx-auto mb-6 inline-block rounded-2xl bg-white p-4 shadow-inner print:p-2">
                <QRCodeSVG
                  value={scanUrl}
                  size={220}
                  level="H"
                  includeMargin
                  bgColor="#FFFFFF"
                  fgColor="#4E342E"
                  imageSettings={{
                    src: '/favicon.svg',
                    height: 36,
                    width: 36,
                    excavate: true,
                  }}
                />
              </div>

              <div className="mb-6 flex items-center justify-center gap-2 text-sm text-[#6D4C41]">
                <HiOutlineDeviceMobile className="h-5 w-5 text-[#D4AF37]" />
                <span>Scan with your phone camera</span>
              </div>
            </>
          )}

          <p className="mb-2 text-xs font-medium text-[#6D4C41]/60">
            {isLocalhost ? 'Use Network URL (not localhost):' : 'Scanning opens:'}
          </p>
          <p className="mb-8 break-all text-[11px] text-[#D4AF37]">{scanUrl}</p>

          <div className="flex flex-col gap-3 print:hidden">
            {!isLocalhost && (
              <button
                onClick={handlePrint}
                className="btn-chocolate inline-flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold tracking-wider uppercase"
              >
                <HiOutlinePrinter className="h-4 w-4" />
                Print Poster
              </button>
            )}
            <Link
              to="/"
              className="text-sm font-medium text-[#6D4C41]/70 underline-offset-2 hover:text-[#4E342E] hover:underline"
            >
              ← Back to App
            </Link>
          </div>
        </motion.div>

        <p className="mt-8 max-w-sm text-center text-xs text-[#6D4C41]/50 print:hidden">
          {isLocalhost
            ? 'Tip: For reliable phone scanning, deploy to Vercel and use your live URL in site.js'
            : 'Print this page and place it on your poster. Recruiters scan with their phone camera.'}
        </p>
      </div>
    </div>
  )
}
