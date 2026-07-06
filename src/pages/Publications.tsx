import { publications } from '../data/publications'
import styles from './Publications.module.css'

export default function Publications() {
  return (
    <div className={`${styles.page} reveal`}>
      <header className={styles.head}>
        <h1 className={styles.title}>Publications</h1>
        <p className={styles.lead}>
          Parutions, catalogues et références sur les arts classiques d'Afrique
          et d'Océanie.
        </p>
      </header>

      <ul className={styles.list}>
        {publications.map((p) => (
          <li key={p.id} className={styles.item}>
            <a
              className={styles.cover}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={p.cover}
                alt={`Couverture — ${p.title} ${p.issue}`}
                width={403}
                height={520}
                loading="lazy"
                decoding="async"
              />
            </a>
            <div className={styles.body}>
              <span className={styles.kicker}>
                {p.issue} · {p.date}
              </span>
              <h2 className={styles.itemTitle}>{p.title}</h2>
              <p className={styles.excerpt}>{p.excerpt}</p>
              <a
                className={styles.link}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consulter <span aria-hidden="true">→</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
