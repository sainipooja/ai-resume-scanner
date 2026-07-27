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
            className="mb-8 text-center"
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

          <div className="flex w-full max-w-4xl flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center lg:gap-14">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="hidden shrink-0 lg:block"
            >
              <FuturisticScanner active={false} size={260} />
            </motion.div>

            <div className="flex w-full max-w-sm flex-col items-center gap-6">
              <EventQRCard />

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setScanning(true)}
                className="btn-chocolate relative w-full overflow-hidden rounded-2xl px-10 py-4 text-sm font-semibold tracking-wide shadow-2xl"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                />
                {SITE.previewButton}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}
