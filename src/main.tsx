import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { SettingsProvider } from './settings.tsx'
import App from './App.tsx'
import Home from './pages/Home.tsx'

// Pages secondaires chargées à la demande (chunks séparés)
const Publications = lazy(() => import('./pages/Publications.tsx'))
const Events = lazy(() => import('./pages/Events.tsx'))
const About = lazy(() => import('./pages/About.tsx'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route index element={<Home />} />
            <Route path="publications" element={<Publications />} />
            <Route path="evenements" element={<Events />} />
            <Route path="a-propos" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  </StrictMode>,
)
