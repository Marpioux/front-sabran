import type { Localized } from '../i18n'

export interface EventItem {
  id: string
  name: string
  kind: Localized
  dates: Localized
  location: Localized
  excerpt: Localized
  href: string
}

/** Événements & foires — à compléter au fil de l'agenda. */
export const events: EventItem[] = [
  {
    id: 'parcours-des-mondes-2026',
    name: 'Parcours des Mondes',
    kind: { fr: 'Salon international', en: 'International fair' },
    dates: { fr: '8 – 13 septembre 2026', en: '8–13 September 2026' },
    location: {
      fr: 'Saint-Germain-des-Prés, Paris',
      en: 'Saint-Germain-des-Prés, Paris',
    },
    excerpt: {
      fr: "Salon international des arts d'Afrique, d'Océanie, d'Asie, des Amériques et d'archéologie, dans le Quartier des Beaux-Arts.",
      en: 'International fair for the arts of Africa, Oceania, Asia, the Americas and archaeology, in the Beaux-Arts district.',
    },
    href: 'https://www.parcours-des-mondes.com/',
  },
]
