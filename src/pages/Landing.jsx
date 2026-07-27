import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineQrcode } from 'react-icons/hi'
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
            className="flex max-w-md flex-col items-center gap-5"
          >
            <Link
              to="/poster"
              className="group inline-flex w-full max-w-sm items-center justify-center gap-3 rounded-2xl border border-[#4E342E]/10 bg-[#FFF8EE]/80 px-6 py-4 shadow-md backdrop-blur-sm transition-all hover:border-[#D4AF37]/40 hover:shadow-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37]/15 transition-colors group-hover:bg-[#D4AF37]/25">
                <HiOutlineQrcode className="h-5 w-5 text-[#D4AF37]" />
              </span>
              <span className="text-sm font-semibold text-[#4E342E]">{SITE.qrButton}</span>
            </Link>

            <p className="max-w-sm text-center text-sm leading-relaxed text-[#6D4C41]/75">
              {SITE.qrHint}
            </p>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setScanning(true)}
              className="btn-chocolate relative overflow-hidden rounded-2xl px-14 py-4 text-sm font-semibold tracking-wide shadow-2xl"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              />
              {SITE.previewButton}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
