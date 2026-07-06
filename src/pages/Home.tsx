import ArtworkSlider from '../components/ArtworkSlider'
import { artworks } from '../data/artworks'
import { useSettings } from '../settings'
import { L, ui } from '../i18n'
import styles from './Home.module.css'

export default function Home() {
  const { lang } = useSettings()
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>{L(ui.home.title, lang)}</h1>
      <ArtworkSlider artworks={artworks} />
    </div>
  )
}
