import { motion } from 'framer-motion'
import { HiOutlineRefresh } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { candidates } from '../data/candidates'
import CandidateCard from '../components/CandidateCard'
import ParticleBackground from '../components/ParticleBackground'
import { SCAN_KEY } from '../config/site'

export default function Dashboard() {
  const navigate = useNavigate()

  const rescan = () => {
    sessionStorage.removeItem(SCAN_KEY)
    navigate('/', { replace: true })
  }

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
            className="mb-4 inline-block rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-1 text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase"
          >
            Scan Complete
          </motion.span>
          <h1 className="font-display mb-3 text-4xl font-bold text-[#4E342E] sm:text-5xl md:text-6xl">
            Candidates Detected
          </h1>
          <p className="mx-auto max-w-xl text-[#6D4C41]/70">
            {candidates.length} engineering profiles matched and ready for review
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={rescan}
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#4E342E]/15 px-5 py-2.5 text-xs font-semibold tracking-wider text-[#6D4C41] uppercase transition-colors hover:bg-[#F3E5D0]"
          >
            <HiOutlineRefresh className="h-4 w-4" />
            New Scan
          </motion.button>
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
