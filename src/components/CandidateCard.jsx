import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineEye, HiOutlineDownload } from 'react-icons/hi'

export default function CandidateCard({ candidate, index }) {
  const handleDownload = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const res = await fetch(candidate.resumeFile)
      const html = await res.text()
      const blob = new Blob([html], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = candidate.downloadName
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      window.open(candidate.resumeFile, '_blank')
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12, rotateX: 2, rotateY: -2 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className="group glass-card relative overflow-hidden rounded-3xl shadow-lg shadow-[#4E342E]/10 transition-shadow hover:shadow-2xl hover:shadow-[#D4AF37]/20"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4E342E] via-[#D4AF37] to-[#4E342E]" />

      <div className="p-6">
        <div className="mb-5 flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#4E342E] opacity-50 blur-sm transition-opacity group-hover:opacity-80" />
            <img
              src={candidate.image}
              alt={candidate.name}
              className="relative h-20 w-20 rounded-full border-3 border-[#FFF8EE] object-cover shadow-lg"
            />
            <div className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-[#4E342E]">
              {candidate.id}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-xl font-bold text-[#4E342E]">{candidate.name}</h3>
            <p className="text-sm font-semibold text-[#D4AF37]">{candidate.role}</p>
            <p className="mt-1 truncate text-xs text-[#6D4C41]/70">{candidate.college}</p>
          </div>
        </div>

        <div className="mb-4 space-y-2 text-xs">
          <div className="rounded-xl bg-[#FFF8EE]/80 p-2.5">
            <span className="text-[#6D4C41]/50">Department</span>
            <p className="font-medium leading-snug text-[#4E342E]">{candidate.department}</p>
          </div>
          <div className="rounded-xl bg-[#FFF8EE]/80 p-2.5">
            <span className="text-[#6D4C41]/50">Graduation</span>
            <p className="font-medium text-[#4E342E]">Class of {candidate.graduationYear}</p>
          </div>
        </div>

        <div className="mb-3 flex flex-wrap gap-1.5">
          {candidate.skills.map((s) => (
            <span key={s} className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-2.5 py-0.5 text-xs font-medium text-[#6D4C41]">
              {s}
            </span>
          ))}
        </div>

        <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-[#6D4C41]/80">{candidate.bio}</p>

        <div className="flex gap-3">
          <Link
            to={`/candidate/${candidate.id}`}
            className="btn-chocolate flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold"
          >
            <HiOutlineEye className="h-4 w-4" />
            View Profile
          </Link>
          <button
            onClick={handleDownload}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#4E342E]/15 bg-[#FFF8EE] py-2.5 text-xs font-semibold text-[#4E342E] transition-colors hover:bg-[#F3E5D0]"
          >
            <HiOutlineDownload className="h-4 w-4" />
            Download CV
          </button>
        </div>
      </div>
    </motion.article>
  )
}
