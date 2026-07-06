export type Lang = 'fr' | 'en'

/** Champ traduisible */
export interface Localized {
  fr: string
  en: string
}

/** Résout un champ traduisible selon la langue. */
export const L = (o: Localized | undefined, lang: Lang): string =>
  o ? o[lang] : ''

/** Chaînes d'interface. */
export const ui = {
  nav: {
    publications: { fr: 'Publications', en: 'Publications' },
    events: { fr: 'Événements', en: 'Events' },
    about: { fr: 'À propos', en: 'About' },
    home: { fr: 'Accueil', en: 'Home' },
  },
  home: {
    title: { fr: "Arts d'Afrique et d'Océanie", en: 'African & Oceanic Art' },
  },
  publications: {
    title: { fr: 'Publications', en: 'Publications' },
    lead: {
      fr: "Parutions, catalogues et références sur les arts classiques d'Afrique et d'Océanie.",
      en: 'Publications, catalogues and references on the classical arts of Africa and Oceania.',
    },
    action: { fr: 'Consulter', en: 'View' },
  },
  events: {
    title: { fr: 'Événements', en: 'Events' },
    lead: {
      fr: 'Foires, salons et rendez-vous où retrouver SABRAN.',
      en: 'Fairs, shows and events where to find SABRAN.',
    },
    action: { fr: 'Découvrir', en: 'Discover' },
  },
  footer: {
    appointment: { fr: 'Sur rendez-vous', en: 'By appointment' },
  },
  a11y: {
    zoom: { fr: "Agrandir l'œuvre", en: 'Enlarge artwork' },
    close: { fr: 'Fermer', en: 'Close' },
    prev: { fr: 'Précédent', en: 'Previous' },
    next: { fr: 'Suivant', en: 'Next' },
  },
} as const
