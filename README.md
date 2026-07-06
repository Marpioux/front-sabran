# SABRAN — Arts d'Afrique et d'Océanie

Site de la galerie **SABRAN** (Marguerite de Sabran) — refonte React de la V1 Webflow.
Direction : très sobre, blanc / encre, l'œuvre au centre, navigation minimale.

## Stack

- **Vite** + **React 19** + **TypeScript**
- **CSS Modules** (aucun framework de style — contrôle total, zéro look générique)
- **React Router** (pages `/` et `/a-propos`)
- Typographie : **Poppins** (Google Fonts)

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de production (dist/)
npm run preview  # prévisualiser le build
```

## Pages

- **/** — Accueil : slider « peek » des œuvres (voisines en aperçu sur les côtés)
- **/publications** — Parutions (Tribal Art Magazine…)
- **/evenements** — Foires & salons (Parcours des Mondes…)
- **/a-propos** — Bio de Marguerite de Sabran (FR + EN)

## Structure

```
src/
  components/    Header · Footer · Logo · ArtworkSlider
  pages/         Home · Publications · Events · About
  data/          artworks.ts · publications.ts · events.ts
  assets/        artworks/ · publications/ · logo.png
```

## À compléter

- **Visuels HD des œuvres** : images actuelles détourées des captures V1 (basse
  déf). À remplacer dans `src/assets/artworks/` + `src/data/artworks.ts`.
- **Logo** : extrait d'une capture (`src/assets/logo.png`) — remplaçable par
  l'asset vectoriel officiel si disponible.
- **5ᵉ œuvre** du slider (la V1 en comptait 5, 4 reprises ici).
- **Instagram** (à venir), vrai lien **LinkedIn** dans le footer.
- Compléter les entrées **Publications** / **Événements** au fil de l'actualité.

## Note WSL

Le projet est sur `/mnt/c` : `vite.config.ts` active `watch.usePolling` pour que
le HMR détecte les changements (l'inotify natif ne fonctionne pas sur ce montage).
