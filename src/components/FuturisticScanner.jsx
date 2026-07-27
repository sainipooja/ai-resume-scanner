import { motion } from 'framer-motion'

export default function FuturisticScanner({ active = false, size = 320 }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Outer glow */}
      <motion.div
        animate={active ? { scale: [1, 1.08, 1], opacity: [0.4, 0.8, 0.4] } : { opacity: 0.3 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-2xl"
      />

      {/* Rotating ring 1 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: active ? 4 : 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-dashed border-[#D4AF37]/40"
        style={{ borderWidth: active ? 2 : 1 }}
      />

      {/* Rotating ring 2 */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: active ? 3 : 15, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-4 rounded-full border border-[#4E342E]/20"
      />

      {/* Rotating ring 3 - gold arc */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: active ? 2 : 10, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-8 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, #D4AF37 60deg, transparent 120deg, transparent 360deg)`,
          opacity: active ? 0.8 : 0.4,
        }}
      />

      {/* Radar sweep */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: active ? 1.5 : 4, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-12 overflow-hidden rounded-full"
      >
        <div
          className="absolute top-1/2 left-1/2 h-1/2 w-1 origin-bottom-left"
          style={{
            background: 'linear-gradient(to top, rgba(212,175,55,0.6), transparent)',
            transform: 'rotate(0deg)',
          }}
        />
      </motion.div>

      {/* Glass core */}
      <div className="glass-luxury absolute inset-16 flex items-center justify-center rounded-full animate-pulse-gold">
        <div className="relative h-full w-full overflow-hidden rounded-full">
          {/* Laser sweep */}
          {active && (
            <motion.div
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_20px_#D4AF37]"
            />
          )}

          {/* Center icon */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              animate={active ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="font-display text-3xl font-bold text-[#4E342E]"
            >
              AI
            </motion.div>
            <span className="mt-1 text-[10px] font-semibold tracking-[0.3em] text-[#D4AF37] uppercase">
              Scanner
            </span>
          </div>

          {/* Crosshair */}
          <div className="absolute top-1/2 right-2 left-2 h-px bg-[#4E342E]/15" />
          <div className="absolute top-2 bottom-2 left-1/2 w-px bg-[#4E342E]/15" />
        </div>
      </div>

      {/* Corner brackets */}
      {[
        { className: 'top-0 left-0', rotate: '' },
        { className: 'top-0 right-0', rotate: 'rotate-90' },
        { className: 'bottom-0 right-0', rotate: 'rotate-180' },
        { className: 'bottom-0 left-0', rotate: '-rotate-90' },
      ].map((corner, i) => (
        <div
          key={i}
          className={`absolute ${corner.className} h-6 w-6 border-t-2 border-l-2 border-[#D4AF37]/60 ${corner.rotate}`}
        />
      ))}
    </div>
  )
}
