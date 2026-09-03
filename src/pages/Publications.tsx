import { publications } from '../data/publications'
import { videos } from '../data/videos'
import VideoEmbed from '../components/VideoEmbed'
import { useSettings } from '../settings'
import { usePageMeta } from '../seo'
import { L, ui } from '../i18n'
import styles from './Publications.module.css'

export default function Publications() {
  const { lang } = useSettings()
  usePageMeta(`${L(ui.publications.title, lang)}, SABRAN`, L(ui.publications.lead, lang))
  return (
    <div className={`${styles.page} reveal`}>
      <header className={styles.head}>
        <h1 className={styles.title}>{L(ui.publications.title, lang)}</h1>
        <p className={styles.lead}>{L(ui.publications.lead, lang)}</p>
      </header>

      <section className={styles.section} aria-labelledby="section-parutions">
        <h2 id="section-parutions" className={styles.sectionTitle}>
          {L(ui.publications.sectionPrint, lang)}
        </h2>

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
                  alt={`${p.title}, ${L(p.issue, lang)}`}
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
                <h3 className={styles.itemTitle}>{p.title}</h3>
                <p className={styles.excerpt}>{L(p.excerpt, lang)}</p>
                <a
                  className={styles.link}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${L(ui.publications.action, lang)}, ${p.title}, ${L(p.issue, lang)} ${L(ui.a11y.newTab, lang)}`}
                >
                  {L(ui.publications.action, lang)} <span aria-hidden="true">→</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="section-videos">
        <h2 id="section-videos" className={styles.sectionTitle}>
          {L(ui.publications.sectionVideo, lang)}
        </h2>

        <ul className={styles.videoList}>
          {videos.map((v) => (
            <li key={v.id} className={styles.videoItem}>
              <VideoEmbed video={v} lang={lang} />
              <div className={styles.body}>
                <span className={styles.kicker}>
                  {L(v.kind, lang)} · {L(v.date, lang)}
                </span>
                <h3 className={styles.itemTitle}>{L(v.title, lang)}</h3>
                <p className={styles.excerpt}>{L(v.excerpt, lang)}</p>
                <a
                  className={styles.link}
                  href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${L(ui.publications.watch, lang)}, ${L(v.title, lang)} ${L(ui.a11y.newTab, lang)}`}
                >
                  {L(ui.publications.watch, lang)} <span aria-hidden="true">→</span>
                </a>
                <p className={styles.notice}>{L(ui.publications.videoNotice, lang)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
