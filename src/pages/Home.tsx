import ArtworkSlider from '../components/ArtworkSlider'
import { artworks } from '../data/artworks'
import { useSettings } from '../settings'
import { usePageMeta } from '../seo'
import { L, ui } from '../i18n'
import styles from './Home.module.css'

export default function Home() {
  const { lang } = useSettings()
  usePageMeta(`SABRAN — ${L(ui.home.title, lang)}`, L(ui.seo.tagline, lang))
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>{L(ui.home.title, lang)}</h1>
      <ArtworkSlider artworks={artworks} />
    </div>
  )
}
