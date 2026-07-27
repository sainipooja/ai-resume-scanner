import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineCheckCircle } from 'react-icons/hi'
import { SITE } from '../config/site'
import FuturisticScanner from './FuturisticScanner'
import ParticleBackground from './ParticleBackground'

export default function ScanSequence({ onComplete }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  const steps = SITE.scanSteps
  const totalMs = 4000
  const stepMs = totalMs / steps.length

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
    >
      <ParticleBackground active />

      <div className="relative z-10 flex flex-col items-center px-6">
        <FuturisticScanner active size={280} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 w-full max-w-md text-center"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="font-display mb-6 text-2xl font-semibold text-[#4E342E]"
            >
              {done ? (
                <span className="flex items-center justify-center gap-2 text-[#D4AF37]">
                  <HiOutlineCheckCircle className="h-7 w-7" />
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
    </motion.div>
  )
}
