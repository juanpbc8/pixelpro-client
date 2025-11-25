import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'
// Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Legacy CSS - Core Styles
import './css/header.css'
import './css/index.css'
import './css/PagPrincipalEstilo.css'

// App Styles
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
