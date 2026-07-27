import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Candidate from './pages/Candidate'
import ScanGate from './components/ScanGate'
import { SCAN_KEY } from './config/site'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-[100dvh]"
      >
        <Routes location={location}>
          <Route
            path="/"
            element={
              sessionStorage.getItem(SCAN_KEY) === 'true' &&
              !window.location.search.includes('scan=1') ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Landing />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              <ScanGate>
                <Dashboard />
              </ScanGate>
            }
          />
          <Route
            path="/candidate/:id"
            element={
              <ScanGate>
                <Candidate />
              </ScanGate>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
