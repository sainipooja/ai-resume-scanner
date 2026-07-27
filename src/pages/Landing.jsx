import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineSparkles, HiOutlineQrcode } from 'react-icons/hi'
import { SITE, SCAN_KEY } from '../config/site'
import FuturisticScanner from '../components/FuturisticScanner'
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

  // Real QR scan: phone camera opens ?scan=1 → auto-start scan sequence
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
          className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#FFF8EE]/60 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#6D4C41] uppercase backdrop-blur-sm"
            >
              <HiOutlineSparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
              Neural Recruitment System v2.0
            </motion.div>

            <h1 className="font-display mb-3 text-5xl font-bold tracking-tight text-[#4E342E] sm:text-6xl md:text-7xl">
              {SITE.name}
            </h1>
            <p className="text-lg font-medium tracking-wide text-[#6D4C41]/80 sm:text-xl">
              {SITE.tagline}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="my-10"
          >
            <FuturisticScanner active={false} size={300} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <Link
              to="/poster"
              className="inline-flex items-center gap-2 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-6 py-3 text-sm font-semibold text-[#4E342E] transition-colors hover:bg-[#D4AF37]/20"
            >
              <HiOutlineQrcode className="h-5 w-5 text-[#D4AF37]" />
              View QR Poster (Print &amp; Scan)
            </Link>

            <p className="max-w-xs text-center text-xs text-[#6D4C41]/60">
              Scan the QR code on your poster with a phone camera to open profiles in real time
            </p>

            <motion.button
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setScanning(true)}
              className="btn-chocolate relative overflow-hidden rounded-2xl px-12 py-4 text-sm font-bold tracking-[0.25em] uppercase shadow-2xl"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              />
              Demo Scan
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
