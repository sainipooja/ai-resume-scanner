import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE, SCAN_KEY } from '../config/site'
import FuturisticScanner from '../components/FuturisticScanner'
import EventQRCard from '../components/EventQRCard'
import ParticleBackground from '../components/ParticleBackground'
import ScanSequence from '../components/ScanSequence'

export default function Landing() {
  const [scanning, setScanning] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const handleComplete = () => {
    sessionStorage.setItem(SCAN_KEY, 'true')
    navigate('/dashboard', { replace: true })
  }

  useEffect(() => {
    if (searchParams.get('scan') === '1') {
      setScanning(true)
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [searchParams])

  return (
    <>
      <ParticleBackground />
      <AnimatePresence>
        {scanning && <ScanSequence key="scan" onComplete={handleComplete} />}
      </AnimatePresence>

      {!scanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12"
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#FFF8EE]/70 px-5 py-2 text-xs font-semibold tracking-wide text-[#6D4C41] backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              {SITE.badge}
            </motion.div>

            <h1 className="font-display mb-3 text-5xl font-bold tracking-tight text-[#4E342E] sm:text-6xl md:text-7xl">
              {SITE.name}
            </h1>
            <p className="text-lg font-medium tracking-wide text-[#6D4C41]/80 sm:text-xl">
              {SITE.tagline}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="glass-luxury w-full max-w-3xl overflow-hidden rounded-3xl border border-[#4E342E]/8 p-6 shadow-xl sm:p-8"
          >
            <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-0">
              {/* AI Scanner — vertically centred with QR panel */}
              <div className="flex w-full shrink-0 flex-col items-center justify-center lg:w-[240px]">
                <FuturisticScanner active={false} size={220} />
                <p className="mt-3 text-[10px] font-bold tracking-[0.35em] text-[#D4AF37] uppercase">
                  AI Powered
                </p>
              </div>

              {/* Divider */}
              <div className="hidden w-px shrink-0 self-stretch bg-gradient-to-b from-transparent via-[#D4AF37]/25 to-transparent lg:mx-8 lg:block" />

              {/* Mobile divider */}
              <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent lg:hidden" />

              {/* QR Scanner */}
              <EventQRCard embedded />
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setScanning(true)}
            className="btn-chocolate relative mt-8 w-full max-w-3xl overflow-hidden rounded-2xl px-10 py-4 text-sm font-semibold tracking-wide shadow-2xl"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            />
            {SITE.previewButton}
          </motion.button>
        </motion.div>
      )}
    </>
  )
}
