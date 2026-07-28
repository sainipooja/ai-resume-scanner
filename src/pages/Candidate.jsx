import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineDownload, HiOutlinePrinter, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi'
import { getCandidateById } from '../data/candidates'
import ParticleBackground from '../components/ParticleBackground'
import { BackToHome, BackToDashboard } from '../components/BackNav'

function Section({ title, children, delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8"
    >
      <h2 className="font-display mb-4 border-b border-[#D4AF37]/30 pb-2 text-lg font-semibold text-[#4E342E]">
        {title}
      </h2>
      {children}
    </motion.section>
  )
}

export default function Candidate() {
  const { id } = useParams()
  const candidate = getCandidateById(id)
  if (!candidate) return <Navigate to="/dashboard" replace />

  const handleDownload = async () => {
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
    <div className="relative min-h-screen">
      <ParticleBackground />
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex flex-wrap items-center gap-3">
            <BackToHome />
            <BackToDashboard />
          </div>
          <div className="flex gap-2">
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleDownload} className="btn-chocolate inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold">
              <HiOutlineDownload className="h-4 w-4" /> Download CV
            </motion.button>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => window.open(candidate.resumeFile, '_blank')} className="inline-flex items-center gap-2 rounded-xl border border-[#4E342E]/15 bg-[#FFF8EE] px-5 py-2.5 text-sm font-semibold text-[#4E342E]">
              <HiOutlinePrinter className="h-4 w-4" /> Save as PDF
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card overflow-hidden rounded-3xl shadow-2xl shadow-[#4E342E]/10"
        >
          <div className="h-2 bg-gradient-to-r from-[#4E342E] via-[#D4AF37] to-[#4E342E]" />

          <div className="p-8 sm:p-10">
            <div className="mb-10 flex flex-col items-center border-b border-[#D4AF37]/20 pb-10 sm:flex-row sm:items-start sm:gap-8">
              <img src={candidate.image} alt={candidate.name} className="mb-6 h-36 w-36 rounded-2xl border-4 border-[#FFF8EE] object-cover shadow-xl sm:mb-0" />
              <div className="text-center sm:text-left">
                <h1 className="font-display text-3xl font-bold text-[#4E342E] sm:text-4xl">{candidate.name}</h1>
                <p className="mt-1 text-lg font-semibold text-[#D4AF37]">{candidate.role}</p>
                <p className="mt-2 text-sm text-[#6D4C41]/70">{candidate.college} · {candidate.department}</p>
                <p className="text-sm text-[#6D4C41]/70">Class of {candidate.graduationYear}</p>
              </div>
            </div>

            <Section title="Contact Details" delay={0.1}>
              <div className="space-y-3 text-sm text-[#6D4C41]">
                <p className="flex items-start gap-3">
                  <HiOutlineMail className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                  {candidate.email}
                </p>
                <p className="flex items-start gap-3">
                  <HiOutlinePhone className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                  {candidate.phone}
                </p>
                <p className="flex items-start gap-3">
                  <HiOutlineLocationMarker className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                  {candidate.address}
                </p>
              </div>
            </Section>

            <Section title="Educational Qualification" delay={0.15}>
              <div className="overflow-x-auto rounded-xl border border-[#4E342E]/10">
                <table className="w-full min-w-[480px] text-left text-sm">
                  <thead className="bg-[#FFF8EE] text-xs uppercase tracking-wide text-[#6D4C41]/70">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Year</th>
                      <th className="px-4 py-3 font-semibold">Course</th>
                      <th className="px-4 py-3 font-semibold">Institution</th>
                      <th className="px-4 py-3 font-semibold">Score</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#6D4C41]">
                    {candidate.education.map((e) => (
                      <tr key={e.degree} className="border-t border-[#4E342E]/8">
                        <td className="px-4 py-3">{e.year}</td>
                        <td className="px-4 py-3 font-medium text-[#4E342E]">{e.degree}</td>
                        <td className="px-4 py-3">{e.institution}</td>
                        <td className="px-4 py-3">{e.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section title="Technical Skills" delay={0.2}>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((s) => (
                  <span key={s} className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-medium text-[#4E342E]">{s}</span>
                ))}
              </div>
            </Section>

            <Section title="Languages Known" delay={0.25}>
              <div className="flex flex-wrap gap-3">
                {candidate.languages.map((l) => (
                  <span key={l} className="rounded-lg bg-[#FFF8EE] px-3 py-1.5 text-sm text-[#6D4C41]">{l}</span>
                ))}
              </div>
            </Section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
