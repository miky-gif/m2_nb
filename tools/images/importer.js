/* ===========================================================================
   Reprend les images générées à la main dans « img/image generer/ » et les
   dépose dans img/brut/ sous le nom attendu par le cahier des charges.

     node tools/images/importer.js            importe les 16 images reconnues
     node tools/images/importer.js --liste    affiche la table, sans rien écrire

   Pourquoi une table figée plutôt qu'une détection automatique : les fichiers
   sortent du générateur avec un horodatage pour seul nom. Seul l'œil peut
   dire laquelle des trois vues de salle d'audience va sur la carte du
   contentieux. La table ci-dessous est ce jugement, écrit une fois pour
   toutes ; si vous regénérez une image, remplacez la ligne correspondante.

   Deux réglages s'ajoutent au nom de destination :

     · `cadre` déplace la fenêtre de recadrage quand le sujet n'est pas au
       centre. 0 = bord gauche ou haut, 1 = bord droit ou bas, 0,5 = centré.
       Indispensable pour les deux médaillons en arche, taillés dans des
       images horizontales où l'avocate est décalée vers la droite.

     · `fondBlanc` déclenche la réparation de la bordure blanche : le
       générateur a livré la statue de la Justice dans une arche dessinée,
       entourée de blanc. Le conteneur du site découpe sa propre arche, les
       deux ne coïncident pas et des coins blancs apparaîtraient. On étire
       donc le fond brun jusqu'aux bords avant de recadrer.

   Après cette étape : node tools/images/optimiser.js
   =========================================================================== */
const fs = require('fs');
const path = require('path');
const { ouvre, ecris, RACINE } = require('./navigateur.js');

const SOURCE = path.join(RACINE, 'img', 'image generer');
const BRUT = 'img/brut/';

/* horodatage du fichier d'origine → destination. */
const TABLE = [
  { de: '01_26_25', vers: 'hero-colonnes',       quoi: 'Palais de justice au crépuscule, moitié gauche sombre' },
  { de: '01_26_29', vers: 'immeuble-affaires',   quoi: 'Immeuble de bureaux contemporain, fin de journée' },
  { de: '01_26_32', vers: 'cabinet-bibliotheque', quoi: 'Bibliothèque juridique, ouvrage ouvert au premier plan' },
  { de: '01_26_35', vers: 'cabinet-justice',     quoi: 'Statue de la Justice en bronze', fondBlanc: true },
  { de: '01_26_44', vers: 'bureau-avocat',       quoi: 'Balance et registres sur un bureau, sans personne' },
  { de: '01_26_56', vers: 'salle-conseil',       quoi: 'Avocate au travail, lampe de bureau, vue sur la ville' },
  { de: '01_27_03', vers: 'art-relecture',       quoi: 'Avocate relisant un dossier, bureau clair' },
  { de: '01_27_06', vers: 'hero-colonnes1',      quoi: 'Parvis d’un palais de justice, trois silhouettes de dos' },
  { de: '01_27_09', vers: 'art-clauses',         quoi: 'Avocate à son bureau, lumière rasante du soir' },
  { de: '01_27_11', vers: 'art-mediation',       quoi: 'Réunion à trois autour d’une table basse' },
  { de: '01_27_13', vers: 'art-dirigeant',       quoi: 'Entretien debout autour d’une table de travail' },
  { de: '01_27_17', vers: 'art-contrat',         quoi: 'Avocate à son bureau, vue sur la ville' },
  { de: '01_27_19', vers: 'art-litige',          quoi: 'Plaidoirie en salle d’audience' },
  { de: '01_27_21', vers: 'signature-contrat',   quoi: 'Signature d’un document, cadrage vertical', cadre: { x: 0.74 } },
  { de: '01_27_24', vers: 'art-penal',           quoi: 'Salle d’audience, plan plus large' }
];

/* Reprise de l'entretien debout : le même cliché sert la carte « Droit du
   travail » en 3:2 et le médaillon en arche de la page « Notre équipe » en
   4:5. Les deux cadrages ne montrent pas la même chose — le second resserre
   sur l'échange entre les deux personnes — et n'apparaissent jamais côte à
   côte. L'image non reprise (01_27_26, troisième vue d'audience) reste
   disponible dans img/image generer/ si un emplacement s'y prête. */
TABLE.push({ de: '01_27_13', vers: 'cabinet-poignee', quoi: 'Entretien debout, resserré en vertical', cadre: { x: 0.62 } });

/* Deuxième série, produite après coup pour combler les emplacements laissés
   vides et remplacer deux images de fortune. Celles-là portent un nom parlant
   plutôt qu'un horodatage : la correspondance se lit d'elle-même. */
TABLE.push(
  { de: 'arpentage',    vers: 'art-foncier',   quoi: 'Plan cadastral déplié, terrain visible par la fenêtre' },
  { de: 'exécutif',     vers: 'art-famille',   quoi: 'Deux fauteuils vides face à un bureau' },
  { de: 'Panorama',     vers: 'hero-contact',  quoi: 'Yaoundé au coucher du soleil, vue en hauteur' },
  { de: 'Salle de conseil', vers: 'salle-conseil', quoi: 'Salle de conseil vide, table ovale et boiseries' }
);

/* La bordure blanche est remplacée par le prolongement horizontal du fond :
   pour chaque ligne, on reprend la couleur du premier pixel non blanc et on
   la tire jusqu'au bord. Le fond étant un dégradé doux, la jointure ne se
   voit pas. Un léger flou sur la zone réparée achève de la fondre. */
const repareFond = (images) => {
  const im = images[0];
  const c = document.createElement('canvas');
  c.width = im.naturalWidth; c.height = im.naturalHeight;
  const x = c.getContext('2d');
  x.drawImage(im, 0, 0);
  const img = x.getImageData(0, 0, c.width, c.height);
  const d = img.data;
  const blanc = i => d[i] > 240 && d[i + 1] > 240 && d[i + 2] > 240;

  /* Le masque retient les pixels remplacés : seuls ceux-là seront adoucis. */
  const masque = document.createElement('canvas');
  masque.width = c.width; masque.height = c.height;
  const mctx = masque.getContext('2d');
  const mimg = mctx.createImageData(c.width, c.height);

  let repares = 0;
  for (let y = 0; y < c.height; y++) {
    const ligne = y * c.width * 4;
    let g = 0;
    while (g < c.width && blanc(ligne + g * 4)) g++;
    let dr = c.width - 1;
    while (dr > g && blanc(ligne + dr * 4)) dr--;
    if (g >= dr) continue;                       /* ligne entièrement blanche */
    for (let k = 0; k < g; k++) {
      for (let v = 0; v < 4; v++) d[ligne + k * 4 + v] = d[ligne + g * 4 + v];
      mimg.data[ligne + k * 4 + 3] = 255; repares++;
    }
    for (let k = dr + 1; k < c.width; k++) {
      for (let v = 0; v < 4; v++) d[ligne + k * 4 + v] = d[ligne + dr * 4 + v];
      mimg.data[ligne + k * 4 + 3] = 255; repares++;
    }
  }
  x.putImageData(img, 0, 0);
  if (!repares) return c;

  /* Un flou limité au masque : la zone étirée se fond, le sujet reste net. */
  mctx.putImageData(mimg, 0, 0);
  const flou = document.createElement('canvas');
  flou.width = c.width; flou.height = c.height;
  const f = flou.getContext('2d');
  f.filter = 'blur(10px)';
  f.drawImage(c, 0, 0);
  f.filter = 'none';
  f.globalCompositeOperation = 'destination-in';
  f.drawImage(masque, 0, 0);
  x.drawImage(flou, 0, 0);
  return c;
};

async function principal() {
  if (!fs.existsSync(SOURCE)) {
    console.log('Dossier introuvable : img/image generer/');
    return;
  }
  const presents = fs.readdirSync(SOURCE).filter(f => /\.(png|jpe?g|webp)$/i.test(f));

  if (process.argv.includes('--liste')) {
    console.log('Correspondance des images générées\n');
    TABLE.forEach(t => {
      const f = presents.find(p => p.includes(t.de));
      console.log((f ? '✓ ' : '✗ ') + t.vers.padEnd(22) + t.quoi);
    });
    const orphelins = presents.filter(p => !TABLE.some(t => p.includes(t.de)));
    if (orphelins.length) console.log('\nNon reprises :\n  ' + orphelins.join('\n  '));
    return;
  }

  fs.mkdirSync(path.join(RACINE, BRUT), { recursive: true });
  let nav = null;
  let faits = 0;
  try {
    for (const t of TABLE) {
      const f = presents.find(p => p.includes(t.de));
      if (!f) {
        /* Les séries déjà reprises quittent le dossier source une fois la
           suivante arrivée. Tant que l'image est publiée dans img/photos/,
           il n'y a rien à refaire : on le dit sans alarmer. */
        const dejaLa = fs.existsSync(path.join(RACINE, 'img', 'photos', t.vers + '.jpg'));
        console.log((dejaLa ? '·  ' : '⏭  ') + t.vers +
          (dejaLa ? ' — déjà publiée' : ' — fichier source absent (' + t.de + ')'));
        continue;
      }
      const abs = path.join(SOURCE, f);
      const ext = t.fondBlanc ? '.png' : path.extname(f).toLowerCase();
      if (t.fondBlanc) {
        nav = nav || await ouvre({ port: 9429 });
        ecris(BRUT + t.vers + ext, await nav.traite([abs], repareFond));
      } else {
        const buffer = fs.readFileSync(abs);
        ecris(BRUT + t.vers + ext, buffer);
      }
      faits++;
    }
  } finally {
    if (nav) nav.ferme();
  }

  /* Les recadrages décentrés sont notés à côté des images, pour que
     l'optimiseur les retrouve sans que l'on ait à les ressaisir. */
  const cadres = Object.fromEntries(TABLE.filter(t => t.cadre).map(t => [t.vers, t.cadre]));
  fs.writeFileSync(path.join(RACINE, BRUT, 'cadrages.json'), JSON.stringify(cadres, null, 2) + '\n');

  console.log('\n' + faits + ' image(s) dans img/brut/.');
  console.log('Suite : node tools/images/optimiser.js');
}

if (require.main === module) principal().catch(e => { console.error(e); process.exit(1); });
module.exports = { TABLE, repareFond };
