import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineCheckCircle } from 'react-icons/hi'
import { SITE } from '../config/site'
import FuturisticScanner from './FuturisticScanner'
import ParticleBackground from './ParticleBackground'

export default function ScanSequence({ onComplete }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [scannerSize, setScannerSize] = useState(220)

  const steps = SITE.scanSteps
  const totalMs = 4000
  const stepMs = totalMs / steps.length

  useEffect(() => {
    const updateSize = () => setScannerSize(window.innerWidth < 640 ? 200 : 240)
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 2, 100))
    }, totalMs / 50)

    const stepInterval = setInterval(() => {
      setStepIndex((i) => {
        if (i >= steps.length - 1) {
          clearInterval(stepInterval)
          return i
        }
        return i + 1
      })
    }, stepMs)

    const completeTimer = setTimeout(() => {
      setDone(true)
      clearInterval(progressInterval)
      setProgress(100)
      setTimeout(onComplete, 800)
    }, totalMs)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
      clearTimeout(completeTimer)
    }
  }, [onComplete, stepMs, steps.length, totalMs])

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex min-h-[100dvh] w-full items-center justify-center overflow-hidden"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <ParticleBackground active />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center justify-center px-6 py-10">
        <FuturisticScanner active size={scannerSize} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 w-full text-center sm:mt-10"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="font-display mb-5 min-h-[2.5rem] text-xl font-semibold text-[#4E342E] sm:mb-6 sm:min-h-[2.75rem] sm:text-2xl"
            >
              {done ? (
                <span className="flex items-center justify-center gap-2 text-[#D4AF37]">
                  <HiOutlineCheckCircle className="h-6 w-6 sm:h-7 sm:w-7" />
                  {steps[steps.length - 1]}
                </span>
              ) : (
                <span className="cursor-blink">{steps[stepIndex]}</span>
              )}
            </motion.p>
          </AnimatePresence>

          <div className="glass-luxury overflow-hidden rounded-full p-1">
            <div className="relative h-2 overflow-hidden rounded-full bg-[#F3E5D0]">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#4E342E] via-[#D4AF37] to-[#4E342E]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>
          <p className="mt-3 text-xs font-medium tracking-widest text-[#6D4C41]/60 uppercase">
            {progress}% Complete
          </p>
        </motion.div>
      </div>
    </motion.div>,
    document.body
  )
}
