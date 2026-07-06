import type { Localized } from '../i18n'
import masqueFang from '../assets/artworks/masque-fang.webp'
import masqueYaoure from '../assets/artworks/masque-yaoure.webp'
import rapa from '../assets/artworks/rapa.webp'
import cimierSerpent from '../assets/artworks/cimier-serpent.webp'

export interface Artwork {
  id: string
  name: Localized
  origin?: Localized
  dimension?: Localized
  note?: Localized
  image: string
  alt: string
}

/**
 * Sélection d'œuvres — extraites de la V1 Webflow.
 * La première pièce (hero) est présentée sans légende, comme dans la V1.
 * Images provisoires détourées des captures ; à remplacer par les visuels HD.
 */
export const artworks: Artwork[] = [
  {
    id: 'masque-fang',
    name: { fr: '', en: '' },
    image: masqueFang,
    alt: "Masque d'Afrique, art classique",
  },
  {
    id: 'masque-yaoure',
    name: { fr: 'Masque Yaouré', en: 'Yaure Mask' },
    origin: { fr: "Côte d'Ivoire", en: 'Ivory Coast' },
    dimension: { fr: 'Haut. 24,1 cm', en: 'H. 24.1 cm' },
    image: masqueYaoure,
    alt: "Masque Yaouré, Côte d'Ivoire",
  },
  {
    id: 'rapa',
    name: { fr: 'Rapa', en: 'Rapa' },
    origin: { fr: 'Île de Pâques', en: 'Easter Island' },
    dimension: { fr: 'Haut. 82 cm', en: 'H. 82 cm' },
    note: { fr: 'Defining sale', en: 'Defining sale' },
    image: rapa,
    alt: 'Rapa, Île de Pâques',
  },
  {
    id: 'cimier-serpent',
    name: { fr: 'Cimier Serpent', en: 'Serpent Crest' },
    origin: {
      fr: 'Baga / Nalu, République de Guinée',
      en: 'Baga / Nalu, Republic of Guinea',
    },
    dimension: { fr: 'Haut. 192 cm', en: 'H. 192 cm' },
    note: { fr: 'Defining sale', en: 'Defining sale' },
    image: cimierSerpent,
    alt: 'Cimier Serpent, Baga/Nalu, République de Guinée',
  },
]
