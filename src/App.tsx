import { Outlet, useLocation } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { useSettings } from './settings'
import { L } from './i18n'
import styles from './App.module.css'

const skip = { fr: 'Aller au contenu', en: 'Skip to content' }

function App() {
  const { pathname } = useLocation()
  const { lang } = useSettings()

  // Remonter en haut à chaque changement de page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className={styles.shell}>
      <a className="skip-link" href="#main-content">
        {L(skip, lang)}
      </a>
      <Header />
      <main id="main-content" className={styles.main} tabIndex={-1}>
        <Suspense fallback={<div className={styles.loading} aria-hidden="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
