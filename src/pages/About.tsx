import portrait from '../assets/artworks/portrait.webp'
import { useSettings } from '../settings'
import { usePageMeta } from '../seo'
import { L, ui } from '../i18n'
import styles from './About.module.css'

const bio = {
  fr: `En 2018, Marguerite de Sabran a lancé sa propre structure de conseil, après 15 années passées chez Sotheby's — dont 11 en tant que directrice du Département des arts d'Afrique et d'Océanie. Elle collabore avec des institutions, françaises et internationales, accompagne des collectionneurs privés, et s'occupe pour leur compte de la vente d'œuvres majeures. En parallèle, Marguerite de Sabran est engagée dans les réseaux de la recherche et entreprend de nombreuses actions en vue de développer les connaissances sur les arts classiques d'Afrique : enseignement, interventions et publications spécialisées, collaborations universitaires et scientifiques.`,
  en: `Marguerite de Sabran launched her own consulting firm, SABRAN, in 2018, after 15 years at Sotheby's — 11 as Director of the African and Oceania Arts Department. She works with institutions, French and international, advises private collectors, and manages major private art sales. At the same time, Marguerite de Sabran is involved in research networks and undertakes numerous actions to develop knowledge of African classical arts: teaching in university, dedicated interventions and publications, academic and scientific collaborations.`,
}

export default function About() {
  const { lang } = useSettings()
  usePageMeta(`${L(ui.nav.about, lang)} — SABRAN`, L(ui.seo.tagline, lang))
  return (
    <article className={`${styles.about} reveal`}>
      <p className={styles.text}>{bio[lang]}</p>

      <figure className={styles.figure}>
        <img
          src={portrait}
          alt="Marguerite de Sabran"
          className={styles.portrait}
          width={452}
          height={306}
          loading="lazy"
          decoding="async"
        />
      </figure>
    </article>
  )
}
