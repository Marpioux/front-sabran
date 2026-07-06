import { publications } from '../data/publications'
import { useSettings } from '../settings'
import { L, ui } from '../i18n'
import styles from './Publications.module.css'

export default function Publications() {
  const { lang } = useSettings()
  return (
    <div className={`${styles.page} reveal`}>
      <header className={styles.head}>
        <h1 className={styles.title}>{L(ui.publications.title, lang)}</h1>
        <p className={styles.lead}>{L(ui.publications.lead, lang)}</p>
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
                alt={`${p.title} — ${L(p.issue, lang)}`}
                width={403}
                height={520}
                loading="lazy"
                decoding="async"
              />
            </a>
            <div className={styles.body}>
              <span className={styles.kicker}>
                {L(p.issue, lang)} · {L(p.date, lang)}
              </span>
              <h2 className={styles.itemTitle}>{p.title}</h2>
              <p className={styles.excerpt}>{L(p.excerpt, lang)}</p>
              <a
                className={styles.link}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${L(ui.publications.action, lang)} — ${p.title}, ${L(p.issue, lang)} ${L(ui.a11y.newTab, lang)}`}
              >
                {L(ui.publications.action, lang)} <span aria-hidden="true">→</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
