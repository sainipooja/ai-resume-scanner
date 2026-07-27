import { Navigate, useLocation } from 'react-router-dom'
import { SCAN_KEY } from '../config/site'

export default function ScanGate({ children }) {
  const location = useLocation()
  const granted = sessionStorage.getItem(SCAN_KEY) === 'true'

  if (!granted) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return children
}
