import type { Localized } from '../i18n'
import tribal119 from '../assets/publications/tribal-119.webp'

export interface Publication {
  id: string
  title: string
  issue: Localized
  date: Localized
  excerpt: Localized
  cover: string
  href: string
}

/** Publications & parutions — à compléter au fil des sorties. */
export const publications: Publication[] = [
  {
    id: 'tribal-119',
    title: 'Tribal Art Magazine',
    issue: { fr: 'N° 119', en: 'No. 119' },
    date: { fr: 'Printemps 2026', en: 'Spring 2026' },
    excerpt: {
      fr: "Le numéro de printemps 2026 — neuf articles de fond consacrés à l'histoire et aux collections d'art tribal, références indispensables pour les passionnés.",
      en: 'The spring 2026 issue — nine in-depth articles on the history and collections of tribal art, essential references for enthusiasts.',
    },
    cover: tribal119,
    href: 'https://www.tribalartmagazine.com/fr/magazines/324-tribal-119-printemps-2026.html',
  },
]
