import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthContextProvider } from './contexts/AuthContext.tsx'
import { ImageProvider } from './contexts/ImageContext.tsx'
import { Toaster } from './components/ui/toaster.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ImageProvider>
    <AuthContextProvider>
    <Toaster />
      <App />
    </AuthContextProvider>
    </ImageProvider>
  </React.StrictMode>,
)
