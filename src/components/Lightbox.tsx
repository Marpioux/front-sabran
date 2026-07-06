import { useEffect } from 'react'
import type { Artwork } from '../data/artworks'
import { L, ui, type Lang } from '../i18n'
import styles from './Lightbox.module.css'

type Props = {
  artworks: Artwork[]
  index: number
  lang: Lang
  onClose: () => void
  onNav: (i: number) => void
}

/** Vue plein écran immersive (fond sombre) d'une œuvre, avec navigation. */
export default function Lightbox({ artworks, index, lang, onClose, onNav }: Props) {
  const n = artworks.length
  const art = artworks[index]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav((index + 1) % n)
      if (e.key === 'ArrowLeft') onNav((index - 1 + n) % n)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [index, n, onClose, onNav])

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className={styles.close}
        onClick={onClose}
        aria-label={L(ui.a11y.close, lang)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <button
        type="button"
        className={`${styles.nav} ${styles.prev}`}
        onClick={(e) => { e.stopPropagation(); onNav((index - 1 + n) % n) }}
        aria-label={L(ui.a11y.prev, lang)}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1" fill="none" aria-hidden="true"><path d="M15 5 8 12l7 7" /></svg>
      </button>

      <figure className={styles.figure} onClick={(e) => e.stopPropagation()}>
        <img src={art.image} alt={art.alt} className={styles.img} />
        <figcaption className={styles.cap}>
          {L(art.name, lang) && <span className={styles.name}>{L(art.name, lang)}</span>}
          {art.origin && <span className={styles.meta}>{L(art.origin, lang)}</span>}
          {art.dimension && <span className={styles.meta}>{L(art.dimension, lang)}</span>}
          {art.note && <span className={styles.note}>{L(art.note, lang)}</span>}
        </figcaption>
      </figure>

      <button
        type="button"
        className={`${styles.nav} ${styles.next}`}
        onClick={(e) => { e.stopPropagation(); onNav((index + 1) % n) }}
        aria-label={L(ui.a11y.next, lang)}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1" fill="none" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  )
}
