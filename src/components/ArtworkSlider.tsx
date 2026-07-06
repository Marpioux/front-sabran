import { useCallback, useEffect, useRef, useState } from 'react'
import type { Artwork } from '../data/artworks'
import styles from './ArtworkSlider.module.css'

type Props = {
  artworks: Artwork[]
  /** Défilement automatique (ms). 0 = désactivé. */
  autoplay?: number
}

/**
 * Carousel « peek » en boucle infinie : l'œuvre active au centre, les voisines
 * réduites et estompées en aperçu de part et d'autre — sans jamais de vide aux
 * extrémités. Réalisé par triplement de la liste + saut invisible en fin de
 * transition. Flèches, dots, clavier, autoplay en pause au survol.
 */
export default function ArtworkSlider({ artworks, autoplay = 6000 }: Props) {
  const n = artworks.length
  // Trois copies : la navigation vit dans la copie centrale [n .. 2n-1].
  const extended = [...artworks, ...artworks, ...artworks]

  const [pos, setPos] = useState(n) // index dans `extended`
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)

  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [cell, setCell] = useState(360)
  const [stageW, setStageW] = useState(0)

  // Dimensionnement responsive des cellules
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const update = () => {
      const w = el.clientWidth
      setStageW(w)
      setCell(Math.round(Math.min(400, Math.max(220, w * 0.52))))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const realIndex = ((pos % n) + n) % n

  const next = useCallback(() => setPos((p) => p + 1), [])
  const prev = useCallback(() => setPos((p) => p - 1), [])
  const goToReal = useCallback(
    (i: number) => setPos((p) => p - (((p % n) + n) % n) + i),
    [n],
  )

  // Autoplay
  useEffect(() => {
    if (!autoplay || paused) return
    const t = window.setTimeout(next, autoplay)
    return () => window.clearTimeout(t)
  }, [autoplay, paused, next, pos])

  // Clavier
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  // Saut invisible pour rester dans la copie centrale
  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== trackRef.current || e.propertyName !== 'transform') return
    if (pos >= 2 * n) {
      setAnimate(false)
      setPos((p) => p - n)
    } else if (pos < n) {
      setAnimate(false)
      setPos((p) => p + n)
    }
  }

  // Réactive la transition après un saut (au frame suivant)
  useEffect(() => {
    if (animate) return
    const raf = requestAnimationFrame(() => setAnimate(true))
    return () => cancelAnimationFrame(raf)
  }, [animate])

  const offset = stageW / 2 - cell / 2 - pos * cell
  const current = artworks[realIndex]

  return (
    <section
      className={styles.slider}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carrousel"
      aria-label="Sélection d'œuvres"
    >
      <div className={styles.stage} ref={stageRef}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={prev}
          aria-label="Œuvre précédente"
        >
          <Chevron dir="left" />
        </button>

        <div
          ref={trackRef}
          className={styles.track}
          style={{
            transform: `translate3d(${offset}px,0,0)`,
            transition: animate ? undefined : 'none',
            opacity: stageW ? 1 : 0,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extended.map((art, j) => {
            const active = j === pos
            return (
              <div
                key={j}
                className={`${styles.cell} ${active ? styles.active : styles.inactive}`}
                style={{ width: cell }}
                aria-hidden={!active}
              >
                <button
                  type="button"
                  className={styles.cellBtn}
                  onClick={() => setPos(j)}
                  tabIndex={active ? -1 : 0}
                  aria-label={art.name ? `Voir ${art.name}` : 'Voir l’œuvre'}
                >
                  <img
                    src={art.image}
                    alt={art.alt}
                    className={styles.image}
                    draggable={false}
                    decoding="async"
                  />
                </button>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={next}
          aria-label="Œuvre suivante"
        >
          <Chevron dir="right" />
        </button>
      </div>

      {/* Légende de l'œuvre active */}
      <figcaption
        className={`${styles.caption} ${current.name ? '' : styles.captionEmpty}`}
        key={current.id}
      >
        {current.name && <span className={styles.name}>{current.name}</span>}
        {current.origin && <span className={styles.meta}>{current.origin}</span>}
        {current.dimension && (
          <span className={styles.meta}>{current.dimension}</span>
        )}
        {current.note && <span className={styles.note}>{current.note}</span>}
      </figcaption>

      <div className={styles.dots} role="tablist" aria-label="Sélection d'œuvres">
        {artworks.map((art, i) => (
          <button
            key={art.id}
            type="button"
            role="tab"
            aria-selected={i === realIndex}
            aria-label={`Œuvre ${i + 1}${art.name ? ` — ${art.name}` : ''}`}
            className={`${styles.dot} ${i === realIndex ? styles.dotActive : ''}`}
            onClick={() => goToReal(i)}
          />
        ))}
      </div>
    </section>
  )
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      {dir === 'left' ? <path d="M15 5 8 12l7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  )
}
