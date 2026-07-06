import tribal119 from '../assets/publications/tribal-119.webp'

export interface Publication {
  id: string
  title: string
  issue: string
  date: string
  excerpt: string
  cover: string
  href: string
}

/** Publications & parutions — à compléter au fil des sorties. */
export const publications: Publication[] = [
  {
    id: 'tribal-119',
    title: 'Tribal Art Magazine',
    issue: 'N° 119',
    date: 'Printemps 2026',
    excerpt:
      "Le numéro de printemps 2026 — neuf articles de fond consacrés à l'histoire et aux collections d'art tribal, références indispensables pour les passionnés.",
    cover: tribal119,
    href: 'https://www.tribalartmagazine.com/fr/magazines/324-tribal-119-printemps-2026.html',
  },
]
