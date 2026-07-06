import { useCallback, useEffect, useRef, useState } from 'react'
import type { Artwork } from '../data/artworks'
import { useSettings } from '../settings'
import { L, ui } from '../i18n'
import Lightbox from './Lightbox'
import styles from './ArtworkSlider.module.css'

type Props = {
  artworks: Artwork[]
  autoplay?: number
}

export default function ArtworkSlider({ artworks, autoplay = 6000 }: Props) {
  const { lang } = useSettings()
  const n = artworks.length
  const extended = [...artworks, ...artworks, ...artworks]

  const [pos, setPos] = useState(n)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  const [zoom, setZoom] = useState<number | null>(null)

  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [cell, setCell] = useState(360)
  const [stageW, setStageW] = useState(0)

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

  // Autoplay (en pause si zoom ouvert)
  useEffect(() => {
    if (!autoplay || paused || zoom !== null) return
    const t = window.setTimeout(next, autoplay)
    return () => window.clearTimeout(t)
  }, [autoplay, paused, next, pos, zoom])

  // Clavier (désactivé quand la lightbox gère elle-même les touches)
  useEffect(() => {
    if (zoom !== null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, zoom])

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
          aria-label={L(ui.a11y.prev, lang)}
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
            const name = L(art.name, lang)
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
                  onClick={() =>
                    active ? setZoom(realIndex) : setPos(j)
                  }
                  aria-label={
                    active
                      ? L(ui.a11y.zoom, lang)
                      : name || 'Œuvre'
                  }
                >
                  <img
                    src={art.image}
                    alt={art.alt}
                    className={styles.image}
                    draggable={false}
                    decoding="async"
                  />
                  {!active && name && (
                    <span className={styles.peekName}>{name}</span>
                  )}
                </button>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={next}
          aria-label={L(ui.a11y.next, lang)}
        >
          <Chevron dir="right" />
        </button>
      </div>

      <figcaption
        className={`${styles.caption} ${current.name.fr || current.name.en ? '' : styles.captionEmpty}`}
        key={current.id + lang}
      >
        {L(current.name, lang) && (
          <span className={styles.name}>{L(current.name, lang)}</span>
        )}
        {current.origin && <span className={styles.meta}>{L(current.origin, lang)}</span>}
        {current.dimension && (
          <span className={styles.meta}>{L(current.dimension, lang)}</span>
        )}
        {current.note && <span className={styles.note}>{L(current.note, lang)}</span>}
      </figcaption>

      <div className={styles.dots} role="tablist" aria-label="Sélection d'œuvres">
        {artworks.map((art, i) => (
          <button
            key={art.id}
            type="button"
            role="tab"
            aria-selected={i === realIndex}
            aria-label={`Œuvre ${i + 1}`}
            className={`${styles.dot} ${i === realIndex ? styles.dotActive : ''}`}
            onClick={() => goToReal(i)}
          />
        ))}
      </div>

      {zoom !== null && (
        <Lightbox
          artworks={artworks}
          index={zoom}
          lang={lang}
          onClose={() => setZoom(null)}
          onNav={(i) => {
            setZoom(i)
            goToReal(i)
          }}
        />
      )}
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
