import { events } from '../data/events'
import { useSettings } from '../settings'
import { L, ui } from '../i18n'
import styles from './Events.module.css'

export default function Events() {
  const { lang } = useSettings()
  return (
    <div className={`${styles.page} reveal`}>
      <header className={styles.head}>
        <h1 className={styles.title}>{L(ui.events.title, lang)}</h1>
        <p className={styles.lead}>{L(ui.events.lead, lang)}</p>
      </header>

      <ul className={styles.list}>
        {events.map((e) => (
          <li key={e.id} className={styles.item}>
            <div className={styles.when}>
              <span className={styles.dates}>{L(e.dates, lang)}</span>
              <span className={styles.kind}>{L(e.kind, lang)}</span>
            </div>
            <div className={styles.body}>
              <h2 className={styles.name}>{e.name}</h2>
              <span className={styles.loc}>{L(e.location, lang)}</span>
              <p className={styles.excerpt}>{L(e.excerpt, lang)}</p>
              <a
                className={styles.link}
                href={e.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {L(ui.events.action, lang)} <span aria-hidden="true">→</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
