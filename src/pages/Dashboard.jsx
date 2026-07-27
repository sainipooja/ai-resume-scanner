import { motion } from 'framer-motion'
import { candidates } from '../data/candidates'
import CandidateCard from '../components/CandidateCard'
import ParticleBackground from '../components/ParticleBackground'
import { BackToHome } from '../components/BackNav'
import { SITE } from '../config/site'

export default function Dashboard() {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackToHome />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="mb-5 inline-block rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-5 py-1.5 text-xs font-bold tracking-[0.15em] text-[#D4AF37] uppercase"
          >
            {SITE.dashboard.badge}
          </motion.span>

          <h1 className="font-display mb-4 text-4xl font-bold text-[#4E342E] sm:text-5xl md:text-6xl">
            {SITE.dashboard.title}
          </h1>

          <p className="mx-auto mb-3 max-w-2xl text-base leading-relaxed text-[#6D4C41]/80 sm:text-lg">
            {SITE.dashboard.subtitle}
          </p>

          <p className="mx-auto max-w-xl text-sm font-medium tracking-wide text-[#D4AF37]">
            {SITE.dashboard.footer}
          </p>

          <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {candidates.map((c, i) => (
            <CandidateCard key={c.id} candidate={c} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
