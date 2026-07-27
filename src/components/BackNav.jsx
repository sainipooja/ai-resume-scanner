import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineHome, HiOutlineArrowLeft } from 'react-icons/hi'
import { SCAN_KEY } from '../config/site'

export function BackToHome() {
  const navigate = useNavigate()

  const goHome = () => {
    sessionStorage.removeItem(SCAN_KEY)
    navigate('/')
  }

  return (
    <motion.button
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={goHome}
      className="inline-flex items-center gap-2 rounded-xl border border-[#4E342E]/12 bg-[#FFF8EE]/90 px-4 py-2.5 text-sm font-semibold text-[#4E342E] shadow-sm backdrop-blur-sm transition-colors hover:border-[#D4AF37]/40 hover:bg-[#F3E5D0]"
    >
      <HiOutlineHome className="h-4 w-4 text-[#D4AF37]" />
      Back to Home
    </motion.button>
  )
}

export function BackToDashboard() {
  const navigate = useNavigate()

  return (
    <motion.button
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate('/dashboard')}
      className="inline-flex items-center gap-2 rounded-xl border border-[#4E342E]/12 bg-[#FFF8EE]/90 px-4 py-2.5 text-sm font-semibold text-[#4E342E] shadow-sm backdrop-blur-sm transition-colors hover:border-[#D4AF37]/40 hover:bg-[#F3E5D0]"
    >
      <HiOutlineArrowLeft className="h-4 w-4 text-[#D4AF37]" />
      All Candidates
    </motion.button>
  )
}
