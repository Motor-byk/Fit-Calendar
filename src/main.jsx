import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router"
import './index.css'
import App from './App.jsx'
import AuthProvider from './auth/AuthProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        {/* Inside the router: the provider's consumers navigate on sign-in and sign-out. */}
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
