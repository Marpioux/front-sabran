import masqueFang from '../assets/artworks/masque-fang.webp'
import masqueYaoure from '../assets/artworks/masque-yaoure.webp'
import rapa from '../assets/artworks/rapa.webp'
import cimierSerpent from '../assets/artworks/cimier-serpent.webp'

export interface Artwork {
  id: string
  /** Nom de l'œuvre (affiché en légende) */
  name: string
  /** Origine géographique / culturelle */
  origin?: string
  /** Dimension principale */
  dimension?: string
  /** Mention éditoriale (ex. « Defining sale ») */
  note?: string
  image: string
  /** Texte alternatif accessibilité */
  alt: string
}

/**
 * Sélection d'œuvres — extraites de la V1 Webflow.
 * NOTE : la première pièce (hero) est présentée sans légende, comme dans la V1.
 * Images provisoires détourées des captures ; à remplacer par les visuels HD.
 */
export const artworks: Artwork[] = [
  {
    id: 'masque-fang',
    name: '',
    image: masqueFang,
    alt: "Masque d'Afrique, art classique",
  },
  {
    id: 'masque-yaoure',
    name: 'Masque Yaouré',
    origin: "Côte d'Ivoire",
    dimension: 'Haut. 24,1 cm',
    image: masqueYaoure,
    alt: "Masque Yaouré, Côte d'Ivoire",
  },
  {
    id: 'rapa',
    name: 'Rapa',
    origin: 'Île de Pâques',
    dimension: 'Haut. 82 cm',
    note: 'Defining sale',
    image: rapa,
    alt: 'Rapa, Île de Pâques',
  },
  {
    id: 'cimier-serpent',
    name: 'Cimier Serpent',
    origin: 'Baga / Nalu, République de Guinée',
    dimension: 'Haut. 192 cm',
    note: 'Defining sale',
    image: cimierSerpent,
    alt: 'Cimier Serpent, Baga/Nalu, République de Guinée',
  },
]
