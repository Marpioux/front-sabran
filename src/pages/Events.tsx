import { events } from '../data/events'
import styles from './Events.module.css'

export default function Events() {
  return (
    <div className={`${styles.page} reveal`}>
      <header className={styles.head}>
        <h1 className={styles.title}>Événements</h1>
        <p className={styles.lead}>
          Foires, salons et rendez-vous où retrouver SABRAN.
        </p>
      </header>

      <ul className={styles.list}>
        {events.map((e) => (
          <li key={e.id} className={styles.item}>
            <div className={styles.when}>
              <span className={styles.dates}>{e.dates}</span>
              <span className={styles.kind}>{e.kind}</span>
            </div>
            <div className={styles.body}>
              <h2 className={styles.name}>{e.name}</h2>
              <span className={styles.loc}>{e.location}</span>
              <p className={styles.excerpt}>{e.excerpt}</p>
              <a
                className={styles.link}
                href={e.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Découvrir <span aria-hidden="true">→</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
