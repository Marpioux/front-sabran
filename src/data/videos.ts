import type { Localized } from '../i18n'
import parcoursObjets from '../assets/videos/parcours-objets.webp'

export interface VideoItem {
  id: string
  /** Identifiant YouTube — sert à construire l'URL d'embed et le lien externe. */
  youtubeId: string
  title: Localized
  kind: Localized
  date: Localized
  excerpt: Localized
  thumb: string
}

/** Vidéos & interventions — à compléter au fil des captations. */
export const videos: VideoItem[] = [
  {
    id: 'parcours-objets-inha',
    youtubeId: '30eCjsobEzo',
    title: {
      fr: "Parcours d'objets : archives de marchands et de scientifiques",
      en: 'Object Trajectories: Dealers’ and Scientists’ Archives',
    },
    kind: { fr: 'Séminaire · INHA', en: 'Seminar · INHA' },
    date: { fr: '10 février 2022', en: '10 February 2022' },
    excerpt: {
      fr: "Séminaire de l'Institut national d'histoire de l'art consacré au parcours des objets extra-occidentaux, retracé à travers les archives de marchands et de scientifiques.",
      en: 'A seminar at the Institut national d’histoire de l’art devoted to the trajectories of non-Western objects, traced through the archives of dealers and scientists.',
    },
    thumb: parcoursObjets,
  },
]
