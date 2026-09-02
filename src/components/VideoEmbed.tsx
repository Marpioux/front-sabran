import { useState } from 'react'
import type { VideoItem } from '../data/videos'
import { L, ui, type Lang } from '../i18n'
import styles from './VideoEmbed.module.css'

type Props = {
  video: VideoItem
  lang: Lang
}

/**
 * Lecteur YouTube en façade : la miniature est servie par le site et
 * l'iframe (donc les requêtes vers YouTube) n'est montée qu'au clic.
 */
export default function VideoEmbed({ video, lang }: Props) {
  const [playing, setPlaying] = useState(false)
  const title = L(video.title, lang)

  return (
    <div className={styles.frame}>
      {playing ? (
        <iframe
          className={styles.player}
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className={styles.facade}
          onClick={() => setPlaying(true)}
          aria-label={`${L(ui.a11y.playVideo, lang)} — ${title}`}
        >
          <img
            src={video.thumb}
            alt=""
            width={1000}
            height={563}
            loading="lazy"
            decoding="async"
          />
          <span className={styles.play} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="26" height="26" focusable="false">
              <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}
