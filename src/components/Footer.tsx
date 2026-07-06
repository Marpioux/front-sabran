import { useSettings } from '../settings'
import { L, ui } from '../i18n'
import styles from './Footer.module.css'

export default function Footer() {
  const { lang } = useSettings()
  const SEP = (
    <span className={styles.sep} aria-hidden="true">
      |
    </span>
  )

  return (
    <footer className={styles.footer}>
      <p className={styles.line}>
        <a
          href="https://www.google.com/maps/search/?api=1&query=7+rue+Jacob+75006+Paris"
          target="_blank"
          rel="noopener noreferrer"
        >
          7 rue Jacob – 75006 Paris
        </a>
        {SEP}
        <span>CNE Expert</span>
        {SEP}
        <span>
          {L(ui.footer.appointment, lang)}:{' '}
          <a href="mailto:contact@sabran.art">contact@sabran.art</a>
        </span>
        {SEP}
        <a href="tel:+33142022372">+ 33 1 42 02 23 72</a>
        {SEP}
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </p>
    </footer>
  )
}
