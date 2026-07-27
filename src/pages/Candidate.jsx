import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineArrowLeft, HiOutlineDownload, HiOutlinePrinter } from 'react-icons/hi'
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa'
import { getCandidateById } from '../data/candidates'
import ParticleBackground from '../components/ParticleBackground'

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
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 flex flex-wrap items-center justify-between gap-4"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-[#4E342E]/15 bg-[#FFF8EE]/80 px-4 py-2.5 text-sm font-semibold text-[#4E342E] backdrop-blur-sm hover:bg-[#F3E5D0]"
          >
            <HiOutlineArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="flex gap-2">
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleDownload} className="btn-chocolate inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold">
              <HiOutlineDownload className="h-4 w-4" /> Download Resume
            </motion.button>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => window.open(candidate.resumeFile, '_blank')} className="inline-flex items-center gap-2 rounded-xl border border-[#4E342E]/15 bg-[#FFF8EE] px-5 py-2.5 text-sm font-semibold text-[#4E342E]">
              <HiOutlinePrinter className="h-4 w-4" /> Print Resume
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
              <img src={candidate.image} alt={candidate.name} className="mb-6 h-40 w-40 rounded-2xl border-4 border-[#FFF8EE] object-cover shadow-xl sm:mb-0" />
              <div className="text-center sm:text-left">
                <h1 className="font-display text-4xl font-bold text-[#4E342E]">{candidate.name}</h1>
                <p className="mt-1 text-xl font-semibold text-[#D4AF37]">{candidate.role}</p>
                <p className="mt-2 text-[#6D4C41]/70">{candidate.college} · {candidate.department} · Class of {candidate.graduationYear}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                  {[
                    { icon: FaLinkedin, href: candidate.linkedin, label: 'LinkedIn' },
                    { icon: FaGithub, href: candidate.github, label: 'GitHub' },
                    { icon: FaGlobe, href: candidate.portfolio, label: 'Portfolio' },
                  ].map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-[#FFF8EE] px-3 py-1.5 text-xs font-medium text-[#6D4C41] hover:text-[#D4AF37]">
                      <Icon className="h-3.5 w-3.5" /> {label}
                    </a>
                  ))}
                </div>
                <p className="mt-3 text-sm text-[#6D4C41]/70">{candidate.email} · {candidate.phone}</p>
              </div>
            </div>

            <Section title="Career Objective" delay={0.1}>
              <p className="leading-relaxed text-[#6D4C41]">{candidate.objective}</p>
            </Section>

            <Section title="Education" delay={0.15}>
              {candidate.education.map((e) => (
                <div key={e.degree} className="mb-4">
                  <h3 className="font-semibold text-[#4E342E]">{e.degree}</h3>
                  <p className="text-sm text-[#6D4C41]/70">{e.institution} · {e.year} · {e.score}</p>
                </div>
              ))}
            </Section>

            <Section title="Technical Skills" delay={0.2}>
              <div className="flex flex-wrap gap-2">
                {candidate.technicalSkills.map((s) => (
                  <span key={s} className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-medium text-[#4E342E]">{s}</span>
                ))}
              </div>
            </Section>

            <Section title="Projects" delay={0.25}>
              {candidate.projects.map((p) => (
                <div key={p.name} className="mb-4">
                  <h3 className="font-semibold text-[#4E342E]">{p.name}</h3>
                  <p className="text-sm text-[#6D4C41]">{p.desc}</p>
                  <p className="text-xs text-[#D4AF37]">Tech: {p.tech}</p>
                </div>
              ))}
            </Section>

            <Section title="Internships" delay={0.3}>
              {candidate.internships.map((i) => (
                <div key={i.company} className="mb-4">
                  <div className="flex flex-wrap justify-between gap-2">
                    <h3 className="font-semibold text-[#4E342E]">{i.role} — {i.company}</h3>
                    <span className="text-sm text-[#6D4C41]/50">{i.period}</span>
                  </div>
                  <p className="text-sm text-[#6D4C41]">{i.desc}</p>
                </div>
              ))}
            </Section>

            <Section title="Experience" delay={0.32}>
              {candidate.experience.map((e) => (
                <div key={e.company} className="mb-4">
                  <div className="flex flex-wrap justify-between gap-2">
                    <h3 className="font-semibold text-[#4E342E]">{e.role} — {e.company}</h3>
                    <span className="text-sm text-[#6D4C41]/50">{e.period}</span>
                  </div>
                  <p className="text-sm text-[#6D4C41]">{e.desc}</p>
                </div>
              ))}
            </Section>

            <Section title="Certifications" delay={0.35}>
              <ul className="space-y-2">
                {candidate.certifications.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-[#6D4C41]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />{c}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Achievements" delay={0.38}>
              <ul className="space-y-2">
                {candidate.achievements.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-[#6D4C41]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4E342E]" />{a}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Languages" delay={0.4}>
              <div className="flex flex-wrap gap-3">
                {candidate.languages.map((l) => (
                  <span key={l} className="text-sm text-[#6D4C41]">{l}</span>
                ))}
              </div>
            </Section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
