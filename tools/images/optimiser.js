/* ===========================================================================
   Met les images à la taille et au poids du site.

     node tools/images/optimiser.js              tout ce qui est dans img/brut/
     node tools/images/optimiser.js hero         seulement les noms contenant « hero »
     node tools/images/optimiser.js --verifie    contrôle le poids de img/photos/
     node tools/images/optimiser.js --reprend    réencode img/photos/ sur place

   Pour chaque fichier déposé dans img/brut/ (généré ou fourni par un
   photographe), on retrouve le format attendu dans briefs.js, on recadre au
   centre au bon rapport, on redimensionne, puis on écrit dans img/photos/ :

     · un JPEG, pour les navigateurs anciens ;
     · un WebP, servi en priorité par la balise <picture> du site.

   Le nom du fichier d'entrée détermine sa destination : hero-colonnes.png
   dans img/brut/ donne img/photos/hero-colonnes.jpg et .webp. Les extensions
   .png, .jpg, .jpeg et .webp sont acceptées en entrée.
   =========================================================================== */
const fs = require('fs');
const path = require('path');
const { ouvre, ecris } = require('./navigateur.js');
const { BRIEFS, FORMATS } = require('./briefs.js');

const RACINE = path.resolve(__dirname, '..', '..');
const BRUT = path.join(RACINE, 'img', 'brut');
const DESTINATION = 'img/photos/';

const QUALITE_JPEG = 0.84;
const QUALITE_WEBP = 0.80;
const POIDS_MAX_KO = 260;     /* au-delà, la page devient lente sur réseau mobile */

/* Recadrage centré au rapport demandé, puis mise à l'échelle. */
const recadre = (images, args) => {
  const im = images[0];
  const ratio = args.l / args.h;
  /* On ne remonte jamais une image : agrandir n'ajoute aucun détail et ne fait
     que gonfler le fichier. Le format du cahier des charges est un plafond. */
  const large = Math.min(args.l, Math.round(Math.min(im.naturalWidth, im.naturalHeight * ratio)));
  args = { ...args, l: large, h: Math.round(large / ratio) };
  let sw = im.naturalWidth, sh = Math.round(im.naturalWidth / ratio);
  if (sh > im.naturalHeight) { sh = im.naturalHeight; sw = Math.round(im.naturalHeight * ratio); }
  const sx = Math.round((im.naturalWidth - sw) * args.ancrageX);
  const sy = Math.round((im.naturalHeight - sh) * args.ancrage);

  /* Réduction en deux temps au-delà d'un facteur 2 : le rééchantillonnage du
     navigateur est bien plus propre par paliers successifs. */
  let source = im, cl = sw, ch = sh, cx = sx, cy = sy;
  while (cl > args.l * 2) {
    const inter = document.createElement('canvas');
    inter.width = Math.round(cl / 2); inter.height = Math.round(ch / 2);
    const c = inter.getContext('2d');
    c.imageSmoothingQuality = 'high';
    c.drawImage(source, cx, cy, cl, ch, 0, 0, inter.width, inter.height);
    source = inter; cl = inter.width; ch = inter.height; cx = 0; cy = 0;
  }
  const out = document.createElement('canvas');
  out.width = args.l; out.height = args.h;
  const o = out.getContext('2d');
  o.imageSmoothingQuality = 'high';
  o.drawImage(source, cx, cy, cl, ch, 0, 0, args.l, args.h);
  return out;
};

/* Une image très détaillée — un panorama de ville, par exemple — dépasse le
   budget de poids même bien dimensionnée. On redescend alors la qualité par
   paliers jusqu'à passer sous le plafond, sans jamais tomber si bas que les
   aplats se mettent à marbrer. */
async function sousBudget(nav, source, args, type, qualite) {
  let buffer = null;
  for (let q = qualite; q >= 0.60; q -= 0.06) {
    buffer = await nav.traite([source], recadre, { type, qualite: q, arguments: args });
    if (buffer.length / 1024 <= POIDS_MAX_KO) return buffer;
  }
  return buffer;
}

function tailleJpeg(b) {
  for (let i = 2; i < b.length - 9;) {
    if (b[i] !== 0xFF) { i++; continue; }
    const m = b[i + 1], len = b.readUInt16BE(i + 2);
    if (m >= 0xC0 && m <= 0xCF && m !== 0xC4 && m !== 0xC8 && m !== 0xCC) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
    i += 2 + len;
  }
  return [0, 0];
}

function verifie() {
  const dossier = path.join(RACINE, DESTINATION);
  const lourds = [];
  for (const f of fs.readdirSync(dossier)) {
    const abs = path.join(dossier, f);
    const ko = fs.statSync(abs).size / 1024;
    const dim = f.endsWith('.jpg') ? tailleJpeg(fs.readFileSync(abs)).join('×') : '';
    if (ko > POIDS_MAX_KO) lourds.push(f.padEnd(28) + dim.padEnd(12) + ko.toFixed(0) + ' Ko');
  }
  const total = fs.readdirSync(dossier).reduce((t, f) => t + fs.statSync(path.join(dossier, f)).size, 0);
  console.log('img/photos/ : ' + (total / 1024 / 1024).toFixed(2) + ' Mo au total');
  if (!lourds.length) console.log('Aucun fichier au-dessus de ' + POIDS_MAX_KO + ' Ko.');
  else { console.log('\nAu-dessus de ' + POIDS_MAX_KO + ' Ko :'); lourds.forEach(l => console.log('  ' + l)); }
}

async function principal() {
  if (process.argv.includes('--verifie')) return verifie();
  const filtre = process.argv.slice(2).find(a => !a.startsWith('--'));

  /* --reprend : les visuels déjà en ligne repassent par la même moulinette,
     utile quand un fichier hérité est trop lourd ou mal dimensionné. */
  const reprend = process.argv.includes('--reprend');
  const dossier = reprend ? path.join(RACINE, DESTINATION) : BRUT;
  const relatif = reprend ? DESTINATION : 'img/brut/';

  if (!fs.existsSync(dossier)) {
    console.log('Le dossier img/brut/ n’existe pas encore.');
    console.log('Déposez-y les images d’origine (générées ou photographiées), puis relancez.');
    return;
  }
  let fichiers = fs.readdirSync(dossier).filter(f => /\.(png|jpe?g|webp)$/i.test(f));
  if (reprend) fichiers = fichiers.filter(f => f.endsWith('.jpg'));   /* le WebP est redérivé */
  if (filtre) fichiers = fichiers.filter(f => f.includes(filtre));
  if (!fichiers.length) { console.log('Rien à traiter dans ' + relatif + '.'); return; }

  /* Recadrages décentrés déposés par importer.js, quand le sujet n'est pas
     au milieu de l'image d'origine. */
  const fichierCadrages = path.join(BRUT, 'cadrages.json');
  const cadrages = fs.existsSync(fichierCadrages) ? JSON.parse(fs.readFileSync(fichierCadrages, 'utf8')) : {};

  const nav = await ouvre({ port: 9427 });
  try {
    for (const f of fichiers) {
      const nom = f.replace(/\.[^.]+$/, '');
      const brief = BRIEFS.find(b => b.fichier.replace(/\.jpg$/, '') === nom);
      if (!brief) {
        console.log('⏭  ' + f + ' — aucun format connu pour ce nom (voir tools/images/briefs.js)');
        continue;
      }
      const format = FORMATS[brief.format];
      const cadre = cadrages[nom] || {};
      const args = {
        l: format.l, h: format.h,
        ancrage: cadre.y ?? brief.ancrage ?? 0.5,
        ancrageX: cadre.x ?? brief.ancrageX ?? 0.5
      };
      const source = path.join(relatif, f);
      ecris(DESTINATION + nom + '.jpg', await sousBudget(nav, source, args, 'image/jpeg', QUALITE_JPEG));
      ecris(DESTINATION + nom + '.webp', await sousBudget(nav, source, args, 'image/webp', QUALITE_WEBP));
    }
  } finally {
    nav.ferme();
  }
  console.log('\nRelancez « node tools/build.js » pour republier les pages.');
}

if (require.main === module) principal().catch(e => { console.error(e); process.exit(1); });
module.exports = { recadre, verifie };
