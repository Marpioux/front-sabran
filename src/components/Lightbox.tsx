import { useEffect, useRef } from 'react'
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

/** Vue plein écran immersive (dialogue modal accessible) d'une œuvre. */
export default function Lightbox({ artworks, index, lang, onClose, onNav }: Props) {
  const n = artworks.length
  const art = artworks[index]
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Verrou de défilement + touches (Échap, flèches)
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

  // Gestion du focus : focus initial, piège de focus (Tab), restauration à la fermeture
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    const onTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialogRef.current) return
      const items = dialogRef.current.querySelectorAll<HTMLElement>('button')
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onTab)
    return () => {
      document.removeEventListener('keydown', onTab)
      opener?.focus?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={dialogRef}
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={L(ui.a11y.dialog, lang)}
    >
      <button
        ref={closeRef}
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
