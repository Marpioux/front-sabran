import styles from './Footer.module.css'

const SEP = <span className={styles.sep} aria-hidden="true">|</span>

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.line}>
        <span>7 rue Jacob – 75006 Paris</span>
        {SEP}
        <span>CNE Expert</span>
        {SEP}
        <span>
          By appointment:{' '}
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
