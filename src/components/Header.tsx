import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'
import { useSettings } from '../settings'
import { L, ui } from '../i18n'
import styles from './Header.module.css'

const links = [
  { to: '/publications', label: ui.nav.publications },
  { to: '/evenements', label: ui.nav.events },
  { to: '/a-propos', label: ui.nav.about },
]

export default function Header() {
  const { lang, setLang } = useSettings()

  return (
    <header className={styles.header}>
      <Link
        to="/"
        className={styles.brand}
        aria-label={L(ui.nav.home, lang)}
        viewTransition
      >
        <Logo width={132} />
      </Link>

      <div className={styles.right}>
        <nav className={styles.nav}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              viewTransition
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {L(l.label, lang)}
            </NavLink>
          ))}
        </nav>

        <div className={styles.lang} role="group" aria-label="Language">
          <button
            type="button"
            className={lang === 'fr' ? styles.langActive : styles.langBtn}
            onClick={() => setLang('fr')}
            aria-pressed={lang === 'fr'}
          >
            FR
          </button>
          <span className={styles.langSep} aria-hidden="true">
            /
          </span>
          <button
            type="button"
            className={lang === 'en' ? styles.langActive : styles.langBtn}
            onClick={() => setLang('en')}
            aria-pressed={lang === 'en'}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  )
}
