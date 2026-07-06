export interface EventItem {
  id: string
  name: string
  kind: string
  dates: string
  location: string
  excerpt: string
  href: string
}

/** Événements & foires — à compléter au fil de l'agenda. */
export const events: EventItem[] = [
  {
    id: 'parcours-des-mondes-2026',
    name: 'Parcours des Mondes',
    kind: 'Salon international',
    dates: '8 – 13 septembre 2026',
    location: 'Saint-Germain-des-Prés, Paris',
    excerpt:
      "Salon international des arts d'Afrique, d'Océanie, d'Asie, des Amériques et d'archéologie, dans le Quartier des Beaux-Arts.",
    href: 'https://www.parcours-des-mondes.com/',
  },
]
