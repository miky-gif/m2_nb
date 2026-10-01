/* ===========================================================================
   Prépare les portraits de l'équipe à partir des fichiers d'origine fournis
   par le Cabinet. La dernière série est dans img/images a jour de l'equipe/ ;
   deux membres n'y figurent pas et gardent leur fichier précédent, resté
   dans img/.

     node tools/images/portraits.js            → tous les portraits
     node tools/images/portraits.js clovis     → seulement ceux dont le nom
                                                 de sortie contient « clovis »

   Trois opérations par portrait :
     1. effacement facultatif du logo incrusté en haut à gauche — le fond est
        un dégradé lisse, on le reconstitue par interpolation entre les deux
        colonnes propres qui encadrent le sigle ;
     2. recadrage au format 4 / 5, celui qu'attendent les cartes et l'arche ;
     3. export en JPEG (repli) et en WebP (servi en priorité).
   =========================================================================== */
const { ouvre, ecris } = require('./navigateur.js');

const LARGEUR = 900;          /* 900 × 1125 : net sur écran Retina en 450 px */
const QUALITE_JPEG = 0.86;
const QUALITE_WEBP = 0.82;

/* Fichier d'origine → nom court utilisé par tools/equipe.js.
   `sansLogo: true` déclenche l'effacement du sigle incrusté. */
const PORTRAITS = [
  { source: "img/images a jour de l'equipe/Clovis METANG NJIKE.png",
    sortie: 'clovis-metang-njike' },
  { source: "img/images a jour de l'equipe/Clovis METANG NJIKE.png",
    sortie: 'clovis-metang-njike-sans-logo', sansLogo: true },
  { source: "img/images a jour de l'equipe/Carine Laure NGASSA BAMY.png", sortie: 'carine-laure-ngassa-bamy' },
  { source: 'img/Me Aurélien Jaurès TCHAPDA Nkogue (Avocat Associé).png', sortie: 'aurelien-jaures-tchapda-nkogue' },
  { source: "img/images a jour de l'equipe/Bernadette KOUENJOU NOUGOUE epse SAMEN.png", sortie: 'bernadette-kouenjou-nougoue-samen' },
  { source: 'img/Me Jean Fédol MAMBOU KOAGNE (Avocat Stagiaire).png', sortie: 'jean-fedol-mambou-koagne' },
  { source: "img/images a jour de l'equipe/NKAMA Gomes Rosine Rufine.png", sortie: 'gomes-rosine-rufine-nkama' },
  { source: "img/images a jour de l'equipe/Marius Décroly TCHANGAM.png", sortie: 'marius-decroly-tchangam' },
  { source: "img/images a jour de l'equipe/Yoann Maël METANG NJIKE.png", sortie: 'yoann-mael-metang-njike' },
  { source: "img/images a jour de l'equipe/Symphorien NGONO MBASSI .png", sortie: 'symphorien-ngono-mbassi' },
  { source: "img/images a jour de l'equipe/Sorelle Brithney Sandjong.png", sortie: 'sorelle-brithney-sandjong-nana' },
  { source: "img/images a jour de l'equipe/Aurélia July NOUBOUSSI MBATANG.png", sortie: 'aurelia-july-nouboussi-mbatang' }
];

const prepare = (images, args) => {
  const im = images[0];
  const c = document.createElement('canvas');
  c.width = im.naturalWidth; c.height = im.naturalHeight;
  const x = c.getContext('2d', { willReadFrequently: true });
  x.drawImage(im, 0, 0);

  if (args.sansLogo) {
    const img = x.getImageData(0, 0, c.width, c.height);
    const d = img.data;
    const lis = (i, j) => { const k = (j * c.width + i) * 4; return [d[k], d[k + 1], d[k + 2]]; };

    /* On cherche le sigle dans le coin supérieur gauche seulement, pour ne
       pas confondre l'encre du logo avec les cheveux ou le costume. */
    const L = Math.round(c.width * args.zone[0]), H = Math.round(c.height * args.zone[1]);
    let x0 = L, y0 = H, x1 = 0, y1 = 0, n = 0;
    for (let j = 0; j < H; j++) for (let i = 0; i < L; i++) {
      const [r, g, b] = lis(i, j);
      const lum = (r + g + b) / 3;
      const sat = Math.max(r, g, b) - Math.min(r, g, b);
      if (lum < 165 || (sat > 40 && r > g + 22)) {
        n++;
        if (i < x0) x0 = i; if (i > x1) x1 = i;
        if (j < y0) y0 = j; if (j > y1) y1 = j;
      }
    }
    if (n > 200) {
      const m = args.mordant;               /* marge de sécurité autour du sigle */
      x0 = Math.max(1, x0 - m); y0 = Math.max(1, y0 - m);
      x1 = Math.min(c.width - 2, x1 + m); y1 = Math.min(c.height - 2, y1 + m);
      /* Références de fond, cherchées ligne par ligne de part et d'autre du
         rectangle : le portrait commence juste à droite du sigle, il ne faut
         surtout pas étaler les cheveux sur le fond. */
      const clair = (i, j) => {
        const [r, g, b] = lis(i, j);
        return (r + g + b) / 3 > 170 && Math.max(r, g, b) - Math.min(r, g, b) < 34;
      };
      const cherche = (j, depart, pas) => {
        for (let i = depart; i >= 0 && i < c.width; i += pas) if (clair(i, j)) return i;
        return -1;
      };
      const f = args.fondu;
      for (let j = y0; j <= y1; j++) {
        let ga = cherche(j, Math.max(0, x0 - args.recul), -1);
        let dr = cherche(j, Math.min(c.width - 1, x1 + args.recul), +1);
        if (ga < 0 && dr < 0) continue;            /* aucune référence : on laisse */
        if (ga < 0) ga = dr; if (dr < 0) dr = ga;  /* une seule : remplissage plat */
        const a = lis(ga, j), b = lis(dr, j);
        for (let i = x0; i <= x1; i++) {
          const t = dr === ga ? 0 : Math.min(1, Math.max(0, (i - ga) / (dr - ga)));
          const k = (j * c.width + i) * 4;
          /* Sur les quelques pixels du pourtour — déjà du fond propre — on
             fond la reconstitution dans l'original : aucune arête visible. */
          const bord = Math.min(i - x0, x1 - i, j - y0, y1 - j);
          const poids = Math.min(1, bord / f);
          for (let p = 0; p < 3; p++) {
            const reconstitue = a[p] + (b[p] - a[p]) * t;
            d[k + p] = Math.round(d[k + p] * (1 - poids) + reconstitue * poids);
          }
        }
      }
      x.putImageData(img, 0, 0);
    }
  }

  /* Recadrage centré au format demandé. */
  const ratio = args.ratio;
  let sw = c.width, sh = Math.round(c.width / ratio);
  if (sh > c.height) { sh = c.height; sw = Math.round(c.height * ratio); }
  const sx = Math.round((c.width - sw) / 2);
  const sy = Math.round((c.height - sh) * args.ancrage);

  const out = document.createElement('canvas');
  out.width = args.largeur; out.height = Math.round(args.largeur / ratio);
  const o = out.getContext('2d');
  o.imageSmoothingQuality = 'high';
  o.drawImage(c, sx, sy, sw, sh, 0, 0, out.width, out.height);
  return out;
};

async function principal() {
  const filtre = process.argv[2];
  const liste = filtre ? PORTRAITS.filter(p => p.sortie.includes(filtre)) : PORTRAITS;
  if (!liste.length) { console.log('Aucun portrait ne correspond à « ' + filtre + ' ».'); return; }

  const nav = await ouvre({ port: 9425 });
  try {
    for (const p of liste) {
      const args = {
        sansLogo: !!p.sansLogo, largeur: LARGEUR, ratio: 4 / 5, ancrage: p.ancrage ?? 0,
        zone: p.zone || [0.33, 0.20], mordant: 9, recul: 10, fondu: 6
      };
      ecris(`img/equipe/${p.sortie}.jpg`, await nav.traite([p.source], prepare, { type: 'image/jpeg', qualite: QUALITE_JPEG, arguments: args }));
      ecris(`img/equipe/${p.sortie}.webp`, await nav.traite([p.source], prepare, { type: 'image/webp', qualite: QUALITE_WEBP, arguments: args }));
    }
  } finally {
    nav.ferme();
  }
}

if (require.main === module) principal().catch(e => { console.error(e); process.exit(1); });
module.exports = { PORTRAITS, prepare };
