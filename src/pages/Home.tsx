import ArtworkSlider from '../components/ArtworkSlider'
import { artworks } from '../data/artworks'
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Arts d'Afrique et d'Océanie</h1>
      <ArtworkSlider artworks={artworks} />
    </div>
  )
}
