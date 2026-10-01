/* ===========================================================================
   Prépare les déclinaisons du logo à partir du fichier fourni par le Cabinet.

     node tools/images/logo.js [fichier source]

   Le fichier d'origine est un aplat : encre sombre et bordeaux imprimés sur un
   fond crème. On en extrait la couche d'encre (détourage par différence avec
   le fond), on recadre au plus juste, puis on décline :

     img/logo.png         — logo détouré, fond transparent   (fonds clairs)
     img/logo-clair.png   — même logo en ivoire et laiton    (fonds sombres)
     img/logo-mono.png    — le monogramme seul, sans la signature
     img/favicon.png      — le monogramme en 256 × 256, pour l'onglet

   Le détourage repose sur la formule classique de démultiplication : si un
   pixel p est le mélange d'une encre c et du fond f avec une opacité a, alors
   p = a·c + (1−a)·f. On déduit a canal par canal, puis on retrouve c.
   =========================================================================== */
const { ouvre, ecris } = require('./navigateur.js');

/* Palette du site (assets/css/site.css) reprise pour la version claire. */
const IVOIRE = [0xF7, 0xF2, 0xEB];
const LAITON = [0xD9, 0xBF, 0x8C];

const recettes = {
  /* ------------------------------------------------- détourage + recadrage */
  detoure: (images, args) => {
    const im = images[0];
    const c = document.createElement('canvas');
    c.width = im.naturalWidth; c.height = im.naturalHeight;
    const x = c.getContext('2d', { willReadFrequently: true });
    x.drawImage(im, 0, 0);
    const img = x.getImageData(0, 0, c.width, c.height);
    const d = img.data;

    /* Le fond : moyenne des quatre coins, insensible à un léger dégradé. */
    const coin = (i, j) => { const k = (j * c.width + i) * 4; return [d[k], d[k + 1], d[k + 2]]; };
    const coins = [coin(2, 2), coin(c.width - 3, 2), coin(2, c.height - 3), coin(c.width - 3, c.height - 3)];
    const fond = [0, 1, 2].map(n => coins.reduce((t, p) => t + p[n], 0) / coins.length);

    /* Couche alpha + couleur d'encre démultipliée. */
    for (let k = 0; k < d.length; k += 4) {
      let a = 0;
      for (let n = 0; n < 3; n++) a = Math.max(a, (fond[n] - d[k + n]) / fond[n]);
      a = Math.min(1, Math.max(0, (a - args.seuil) / (1 - args.seuil)));
      if (a <= 0.004) { d[k + 3] = 0; continue; }
      for (let n = 0; n < 3; n++) {
        d[k + n] = Math.min(255, Math.max(0, Math.round((d[k + n] - fond[n] * (1 - a)) / a)));
      }
      d[k + 3] = Math.round(a * 255);
    }
    x.putImageData(img, 0, 0);

    /* Recadrage sur l'enveloppe de l'encre, avec une marge de respiration. */
    let x0 = c.width, y0 = c.height, x1 = 0, y1 = 0;
    for (let j = 0; j < c.height; j++) for (let i = 0; i < c.width; i++) {
      if (d[(j * c.width + i) * 4 + 3] > 12) {
        if (i < x0) x0 = i; if (i > x1) x1 = i;
        if (j < y0) y0 = j; if (j > y1) y1 = j;
      }
    }
    const marge = Math.round((x1 - x0) * args.marge);
    x0 = Math.max(0, x0 - marge); y0 = Math.max(0, y0 - marge);
    x1 = Math.min(c.width - 1, x1 + marge); y1 = Math.min(c.height - 1, y1 + marge);

    const largeur = args.largeur;
    const hauteur = Math.round(largeur * (y1 - y0 + 1) / (x1 - x0 + 1));
    const out = document.createElement('canvas');
    out.width = largeur; out.height = hauteur;
    const o = out.getContext('2d');
    o.imageSmoothingQuality = 'high';
    o.drawImage(c, x0, y0, x1 - x0 + 1, y1 - y0 + 1, 0, 0, largeur, hauteur);
    return out;
  },

  /* ------------------------------------------- recoloration pour fond sombre */
  eclaircit: (images, args) => {
    const im = images[0];
    const c = document.createElement('canvas');
    c.width = im.naturalWidth; c.height = im.naturalHeight;
    const x = c.getContext('2d', { willReadFrequently: true });
    x.drawImage(im, 0, 0);
    const img = x.getImageData(0, 0, c.width, c.height);
    const d = img.data;
    for (let k = 0; k < d.length; k += 4) {
      if (!d[k + 3]) continue;
      /* « Rougeur » de l'encre : sépare le bordeaux du gris anthracite. */
      const rouge = d[k] - (d[k + 1] + d[k + 2]) / 2;
      const cible = rouge > args.seuilRouge ? args.accent : args.encre;
      d[k] = cible[0]; d[k + 1] = cible[1]; d[k + 2] = cible[2];
    }
    x.putImageData(img, 0, 0);
    return c;
  },

  /* ------------------------------------- isole le monogramme de la signature */
  monogramme: (images, args) => {
    const im = images[0];
    const c = document.createElement('canvas');
    c.width = im.naturalWidth; c.height = im.naturalHeight;
    const x = c.getContext('2d', { willReadFrequently: true });
    x.drawImage(im, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height).data;

    /* Profil ligne par ligne : on cherche la plus large bande vide, celle qui
       sépare le sigle du texte « M2NB & PARTNERS ». */
    const plein = [];
    for (let j = 0; j < c.height; j++) {
      let n = 0;
      for (let i = 0; i < c.width; i++) if (d[(j * c.width + i) * 4 + 3] > 24) n++;
      plein.push(n > c.width * 0.004);
    }
    const trous = [];
    let debut = -1;
    for (let j = 0; j < c.height; j++) {
      if (!plein[j]) { if (debut < 0) debut = j; }
      else if (debut >= 0) { trous.push([debut, j]); debut = -1; }
    }
    /* La signature comporte elle-même deux lignes : on retient donc le PREMIER
       blanc situé sous le sigle, pas le plus large. */
    const seuil = c.height * args.apres;
    const trou = trous.find(([a, b]) => a > seuil && b - a > c.height * 0.012);
    const coupe = trou ? trou[0] : Math.round(c.height * 0.62);

    /* Enveloppe horizontale du seul monogramme. */
    let x0 = c.width, x1 = 0;
    for (let j = 0; j < coupe; j++) for (let i = 0; i < c.width; i++) {
      if (d[(j * c.width + i) * 4 + 3] > 12) { if (i < x0) x0 = i; if (i > x1) x1 = i; }
    }
    let y0 = 0;
    boucle: for (let j = 0; j < coupe; j++) {
      for (let i = 0; i < c.width; i++) if (d[(j * c.width + i) * 4 + 3] > 12) { y0 = j; break boucle; }
    }

    const l = x1 - x0 + 1, h = coupe - y0;
    if (args.carre) {
      const cote = args.cote;
      const out = document.createElement('canvas');
      out.width = cote; out.height = cote;
      const o = out.getContext('2d');
      o.imageSmoothingQuality = 'high';
      /* Centré dans un carré, avec 12 % de marge intérieure. */
      const utile = cote * 0.76;
      const e = Math.min(utile / l, utile / h);
      o.drawImage(c, x0, y0, l, h, (cote - l * e) / 2, (cote - h * e) / 2, l * e, h * e);
      return out;
    }
    const largeur = args.largeur;
    const out = document.createElement('canvas');
    out.width = largeur; out.height = Math.round(largeur * h / l);
    const o = out.getContext('2d');
    o.imageSmoothingQuality = 'high';
    o.drawImage(c, x0, y0, l, h, 0, 0, out.width, out.height);
    return out;
  }
};

async function principal() {
  const source = process.argv[2] || 'img/nouveaux logo.png';
  console.log('Source : ' + source);
  const nav = await ouvre({ port: 9423 });
  try {
    /* 1. Logo détouré, pour les fonds clairs (en-tête, documents). */
    const detoure = await nav.traite([source], recettes.detoure,
      { arguments: { seuil: 0.06, marge: 0.012, largeur: 1000 } });
    ecris('img/logo.png', detoure);

    /* 2. Version claire, pour le pied de page et les sections sombres. */
    const clair = await nav.traite(['img/logo.png'], recettes.eclaircit,
      { arguments: { seuilRouge: 26, accent: LAITON, encre: IVOIRE } });
    ecris('img/logo-clair.png', clair);

    /* 3. Monogramme seul — utilisé comme filigrane et comme pastille. */
    const mono = await nav.traite(['img/logo.png'], recettes.monogramme,
      { arguments: { largeur: 512, carre: false, apres: 0.45 } });
    ecris('img/logo-mono.png', mono);

    const monoClair = await nav.traite(['img/logo-mono.png'], recettes.eclaircit,
      { arguments: { seuilRouge: 26, accent: LAITON, encre: IVOIRE } });
    ecris('img/logo-mono-clair.png', monoClair);

    /* 4. Icône d'onglet, carrée. */
    const icone = await nav.traite(['img/logo.png'], recettes.monogramme,
      { arguments: { carre: true, cote: 256, apres: 0.45 } });
    ecris('img/favicon.png', icone);
  } finally {
    nav.ferme();
  }
  console.log('Déclinaisons du logo à jour. Relancez « node tools/build.js ».');
}

if (require.main === module) principal().catch(e => { console.error(e); process.exit(1); });
module.exports = { recettes };
