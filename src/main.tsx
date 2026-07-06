import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Publications from './pages/Publications.tsx'
import Events from './pages/Events.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
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
  </StrictMode>,
)
