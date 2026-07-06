import logo from '../assets/logo.png'
import styles from './Logo.module.css'

type Props = {
  /** Largeur du logo en px */
  width?: number
}

/** Logo officiel SABRAN (glyphe + wordmark), extrait de la maquette. */
export default function Logo({ width = 150 }: Props) {
  return (
    <img
      src={logo}
      alt="SABRAN"
      className={styles.logo}
      style={{ width }}
      draggable={false}
    />
  )
}
