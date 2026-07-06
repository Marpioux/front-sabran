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

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export default function ArtworkSlider({ artworks, autoplay = 5000 }: Props) {
  const { lang } = useSettings()
  const n = artworks.length
  const extended = [...artworks, ...artworks, ...artworks]

  const [pos, setPos] = useState(n)
  const [animate, setAnimate] = useState(true)
  const [hoverPause, setHoverPause] = useState(false)
  const [focusPause, setFocusPause] = useState(false)
  const [userPause, setUserPause] = useState(false)
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

  // Autoplay — respecte pause utilisateur/survol/focus, zoom et reduced-motion (2.2.2)
  const paused = hoverPause || focusPause || userPause || zoom !== null
  useEffect(() => {
    if (!autoplay || paused || prefersReducedMotion()) return
    const t = window.setTimeout(next, autoplay)
    return () => window.clearTimeout(t)
  }, [autoplay, paused, next, pos])

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
      onMouseEnter={() => setHoverPause(true)}
      onMouseLeave={() => setHoverPause(false)}
      onFocusCapture={() => setFocusPause(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node))
          setFocusPause(false)
      }}
      aria-roledescription="carrousel"
      aria-label={L(ui.a11y.gallery, lang)}
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
                  tabIndex={active ? 0 : -1}
                  onClick={() => (active ? setZoom(realIndex) : setPos(j))}
                  aria-label={
                    active
                      ? L(ui.a11y.zoom, lang)
                      : `${L(ui.a11y.goToArtwork, lang)}${name ? ` : ${name}` : ''}`
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
        aria-live="polite"
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

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.playPause}
          onClick={() => setUserPause((p) => !p)}
          aria-label={L(userPause ? ui.a11y.play : ui.a11y.pause, lang)}
        >
          {userPause ? <PlayIcon /> : <PauseIcon />}
        </button>

        <div className={styles.dots}>
          {artworks.map((art, i) => (
            <button
              key={art.id}
              type="button"
              aria-current={i === realIndex ? 'true' : undefined}
              aria-label={`${L(ui.a11y.goToArtwork, lang)} ${i + 1}`}
              className={styles.dotHit}
              onClick={() => goToReal(i)}
            >
              <span
                className={`${styles.dot} ${i === realIndex ? styles.dotActive : ''}`}
              />
            </button>
          ))}
        </div>
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      {dir === 'left' ? <path d="M15 5 8 12l7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 5l12 7-12 7z" />
    </svg>
  )
}
