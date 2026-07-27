import { QRCodeSVG } from 'qrcode.react'
import { motion } from 'framer-motion'
import { HiOutlineDeviceMobile, HiOutlinePrinter } from 'react-icons/hi'
import { SITE, QR_SCAN_URL } from '../config/site'

const steps = [
  { num: '01', text: SITE.qr.step1 },
  { num: '02', text: SITE.qr.step2 },
  { num: '03', text: SITE.qr.step3 },
]

export default function EventQRCard({ embedded = false }) {
  const scanUrl =
    typeof window !== 'undefined' ? `${window.location.origin}/?scan=1` : QR_SCAN_URL

  const content = (
    <>
      <div className={embedded ? 'mb-4 text-center lg:text-left' : 'mb-5 text-center'}>
        {!embedded && (
          <p className="mb-1 text-[10px] font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
            {SITE.qr.eyebrow}
          </p>
        )}
        <h2 className="font-display text-xl font-bold text-[#4E342E]">{SITE.qr.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#6D4C41]/75">{SITE.qr.subtitle}</p>
      </div>

      <div className="relative mx-auto mb-4 flex justify-center lg:mx-0 lg:justify-start">
        <div className="relative" style={{ width: 200, height: 200 }}>
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-2xl bg-[#D4AF37]/15 blur-xl"
          />

          {[
            'top-0 left-0 border-t-2 border-l-2',
            'top-0 right-0 border-t-2 border-r-2',
            'bottom-0 left-0 border-b-2 border-l-2',
            'bottom-0 right-0 border-b-2 border-r-2',
          ].map((cls) => (
            <div key={cls} className={`absolute h-6 w-6 border-[#D4AF37]/70 ${cls}`} />
          ))}

          <motion.div
            animate={{ top: ['8%', '92%', '8%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute right-3 left-3 z-10 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_12px_#D4AF37]"
          />

          <div className="absolute inset-3 flex items-center justify-center rounded-xl border border-[#4E342E]/10 bg-white p-2.5 shadow-inner">
            <QRCodeSVG
              value={scanUrl}
              size={148}
              level="H"
              includeMargin={false}
              bgColor="#FFFFFF"
              fgColor="#4E342E"
            />
          </div>
        </div>
      </div>

      <div
        className={`mb-4 flex items-center gap-2 text-sm font-medium text-[#4E342E] ${embedded ? 'justify-center lg:justify-start' : 'justify-center'}`}
      >
        <HiOutlineDeviceMobile className="h-4 w-4 shrink-0 text-[#D4AF37]" />
        {SITE.qr.scanLabel}
      </div>

      <div className="mb-4 space-y-2">
        {steps.map((s) => (
          <div
            key={s.num}
            className="flex items-center gap-3 rounded-xl bg-[#FFF8EE]/90 px-3.5 py-2.5"
          >
            <span className="font-display text-sm font-bold text-[#D4AF37]">{s.num}</span>
            <span className="text-xs text-[#6D4C41]">{s.text}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => window.print()}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#4E342E]/12 bg-[#FFF8EE]/80 py-2.5 text-xs font-semibold text-[#4E342E] transition-colors hover:border-[#D4AF37]/40 hover:bg-[#F3E5D0] print:hidden"
      >
        <HiOutlinePrinter className="h-4 w-4 text-[#D4AF37]" />
        {SITE.qr.printButton}
      </button>
    </>
  )

  if (embedded) {
    return <div className="w-full min-w-0 flex-1">{content}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass-luxury w-full max-w-sm overflow-hidden rounded-3xl border border-[#4E342E]/8 p-6 shadow-xl"
    >
      {content}
    </motion.div>
  )
}
