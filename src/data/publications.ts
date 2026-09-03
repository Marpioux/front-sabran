import type { Localized } from '../i18n'
import tribal121 from '../assets/publications/tribal-121.webp'
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
    id: 'tribal-121',
    title: 'Tribal Art Magazine',
    issue: { fr: 'N° 121', en: 'No. 121' },
    date: { fr: 'Automne 2026', en: 'Autumn 2026' },
    excerpt: {
      fr: "Le numéro d'automne 2026 : neuf articles de fond, parmi lesquels un dossier consacré à un nkishi monumental, les vingt-cinq ans du Parcours des mondes et la donation Pierre et Denise Lévy à Troyes.",
      en: 'The autumn 2026 issue: nine in-depth articles, among them a feature on a monumental nkishi, twenty-five years of Parcours des mondes and the Pierre and Denise Lévy donation to Troyes.',
    },
    cover: tribal121,
    href: 'https://www.tribalartmagazine.com/fr/magazines/332-tribal-121-automne-2026.html',
  },
  {
    id: 'tribal-119',
    title: 'Tribal Art Magazine',
    issue: { fr: 'N° 119', en: 'No. 119' },
    date: { fr: 'Printemps 2026', en: 'Spring 2026' },
    excerpt: {
      fr: "Le numéro de printemps 2026 : neuf articles de fond consacrés à l'histoire et aux collections d'art tribal, références indispensables pour les passionnés.",
      en: 'The spring 2026 issue: nine in-depth articles on the history and collections of tribal art, essential references for enthusiasts.',
    },
    cover: tribal119,
    href: 'https://www.tribalartmagazine.com/fr/magazines/324-tribal-119-printemps-2026.html',
  },
]
