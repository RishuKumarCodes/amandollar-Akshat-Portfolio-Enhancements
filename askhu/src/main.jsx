import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { VariantsProvider } from './contexts/VariantsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VariantsProvider>
      <App />
    </VariantsProvider>
  </StrictMode>,
)
