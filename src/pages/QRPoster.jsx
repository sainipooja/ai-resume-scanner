import { QRCodeSVG } from 'qrcode.react'
import { motion } from 'framer-motion'
import { HiOutlinePrinter, HiOutlineDeviceMobile, HiOutlineArrowLeft } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { SITE } from '../config/site'
import ParticleBackground from '../components/ParticleBackground'

const steps = [
  { num: '01', text: SITE.poster.step1 },
  { num: '02', text: SITE.poster.step2 },
  { num: '03', text: SITE.poster.step3 },
]

export default function QRPoster() {
  const handlePrint = () => window.print()
  const scanUrl = `${window.location.origin}/?scan=1`

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 py-12 print:py-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-luxury relative w-full overflow-hidden rounded-[2rem] p-10 text-center shadow-2xl print:rounded-2xl print:p-8 print:shadow-none"
        >
          {/* Decorative corners */}
          <div className="pointer-events-none absolute inset-4 rounded-3xl border border-[#D4AF37]/20 print:inset-2" />

          <p className="mb-2 text-[10px] font-bold tracking-[0.35em] text-[#D4AF37] uppercase">
            {SITE.poster.event}
          </p>

          <h1 className="font-display mb-1 text-4xl font-bold text-[#4E342E]">{SITE.name}</h1>
          <p className="mb-8 text-base font-medium text-[#6D4C41]/80">{SITE.poster.headline}</p>

          <div className="relative mx-auto mb-8 inline-block">
            <div className="absolute -inset-3 rounded-3xl bg-[#D4AF37]/10 blur-md" />
            <div className="relative rounded-2xl border-2 border-[#D4AF37]/30 bg-white p-5 shadow-inner">
              <QRCodeSVG
                value={scanUrl}
                size={200}
                level="H"
                includeMargin
                bgColor="#FFFFFF"
                fgColor="#4E342E"
                imageSettings={{
                  src: '/favicon.svg',
                  height: 32,
                  width: 32,
                  excavate: true,
                }}
              />
            </div>
          </div>

          <div className="mb-8 flex items-center justify-center gap-2 text-sm font-medium text-[#4E342E]">
            <HiOutlineDeviceMobile className="h-5 w-5 text-[#D4AF37]" />
            {SITE.poster.scanLabel}
          </div>

          <div className="mb-8 space-y-3 text-left">
            {steps.map((s) => (
              <div key={s.num} className="flex items-center gap-4 rounded-xl bg-[#FFF8EE]/80 px-4 py-3">
                <span className="font-display text-lg font-bold text-[#D4AF37]">{s.num}</span>
                <span className="text-sm text-[#6D4C41]">{s.text}</span>
              </div>
            ))}
          </div>

          <p className="mb-6 break-all text-[10px] text-[#6D4C41]/40">{scanUrl}</p>

          <div className="flex flex-col gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="btn-chocolate inline-flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold tracking-wide"
            >
              <HiOutlinePrinter className="h-4 w-4" />
              {SITE.poster.printButton}
            </button>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 text-sm font-medium text-[#6D4C41]/70 hover:text-[#4E342E]"
            >
              <HiOutlineArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
