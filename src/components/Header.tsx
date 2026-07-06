import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'
import styles from './Header.module.css'

const links = [
  { to: '/publications', label: 'Publications' },
  { to: '/evenements', label: 'Événements' },
  { to: '/a-propos', label: 'À propos' },
]

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand} aria-label="Accueil — SABRAN">
        <Logo />
      </Link>

      <nav className={styles.nav}>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
