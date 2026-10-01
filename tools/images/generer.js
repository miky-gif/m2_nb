/* ===========================================================================
   Génère les visuels du site à partir du cahier des charges (briefs.js).

     node tools/images/generer.js --liste            inventaire, sans rien appeler
     node tools/images/generer.js --brief hero       affiche les briefs retenus
     node tools/images/generer.js --manquants        prompts de ce qui reste à faire
     node tools/images/generer.js --essai hero       génère 1 image, sans écraser
     node tools/images/generer.js                    génère tout ce qui manque
     node tools/images/generer.js --tout             régénère tout, même l'existant

   Aucune clé n'est stockée dans le dépôt. Renseignez, selon le service
   retenu, UNE de ces variables d'environnement :

     OPENAI_API_KEY    → modèle gpt-image-1        (openai.com)
     GEMINI_API_KEY    → modèle Imagen             (ai.google.dev)
     STABILITY_API_KEY → Stable Image Core         (stability.ai)

   Sous Windows :  set OPENAI_API_KEY=sk-...
   Sous macOS / Linux :  export OPENAI_API_KEY=sk-...

   Les images arrivent dans img/brut/. Elles ne sont PAS mises en ligne telles
   quelles : `node tools/images/optimiser.js` les recadre, les redimensionne
   et les décline en JPEG + WebP dans img/photos/. Ce passage en deux temps
   permet de trier ce qu'on garde avant de toucher au site.
   =========================================================================== */
const fs = require('fs');
const path = require('path');
const { BRIEFS, FORMATS, promptComplet } = require('./briefs.js');

const RACINE = path.resolve(__dirname, '..', '..');
const BRUT = path.join(RACINE, 'img', 'brut');

/* ------------------------------------------------------------- adaptateurs */
/* Chacun renvoie un Buffer PNG/JPEG. Ajouter un service = ajouter une entrée. */
const SERVICES = [
  {
    nom: 'OpenAI · gpt-image-1', cle: 'OPENAI_API_KEY',
    /* gpt-image-1 n'accepte que quelques tailles : on prend la plus proche. */
    taille: f => (f.l > f.h ? '1536x1024' : f.l < f.h ? '1024x1536' : '1024x1024'),
    async appelle(prompt, format, cle) {
      const r = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: 'Bearer ' + cle },
        body: JSON.stringify({ model: 'gpt-image-1', prompt, size: this.taille(format), n: 1 })
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error?.message || JSON.stringify(j).slice(0, 300));
      return Buffer.from(j.data[0].b64_json, 'base64');
    }
  },
  {
    nom: 'Google · Imagen', cle: 'GEMINI_API_KEY',
    async appelle(prompt, format, cle) {
      const modele = 'imagen-4.0-generate-001';
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modele}:predict?key=${cle}`, {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt }],
          parameters: { sampleCount: 1, aspectRatio: format.ratio, personGeneration: 'allow_adult' }
        })
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error?.message || JSON.stringify(j).slice(0, 300));
      return Buffer.from(j.predictions[0].bytesBase64Encoded, 'base64');
    }
  },
  {
    nom: 'Stability · Stable Image Core', cle: 'STABILITY_API_KEY',
    async appelle(prompt, format, cle) {
      const corps = new FormData();
      corps.set('prompt', prompt);
      corps.set('aspect_ratio', format.ratio);
      corps.set('output_format', 'jpeg');
      const r = await fetch('https://api.stability.ai/v2beta/stable-image/generate/core', {
        method: 'POST', headers: { authorization: 'Bearer ' + cle, accept: 'image/*' }, body: corps
      });
      if (!r.ok) throw new Error((await r.text()).slice(0, 300));
      return Buffer.from(await r.arrayBuffer());
    }
  }
];

function serviceDisponible() {
  return SERVICES.find(s => process.env[s.cle]);
}

/* ------------------------------------------------------------------- sortie */
function affiche(b, complet) {
  const f = FORMATS[b.format];
  console.log('\n── ' + b.fichier + (b.nouveau ? '   [nouveau]' : '') + (b.photographie ? '   [à photographier]' : ''));
  console.log('   emplacement : ' + b.ou);
  console.log('   format      : ' + f.l + ' × ' + f.h + '  (' + f.ratio + ')');
  console.log('   brief       : ' + b.brief.replace(/\s+/g, ' '));
  if (complet && b.prompt) console.log('   prompt      : ' + promptComplet(b));
}

/* ------------------------------------------------------- ce qui reste à faire
   Dresse la liste des visuels qui n'ont pas encore d'image en ligne, plus
   ceux qui en ont une mais provisoire (`aRevoir` dans briefs.js), et écrit
   leurs prompts dans un fichier à ouvrir et à copier dans l'outil de
   génération de son choix. C'est la sortie à utiliser quand on n'a pas de
   clé d'API : le travail se fait à la main, mais sans rien ressaisir. */
function manquants(liste) {
  const photos = path.join(RACINE, 'img', 'photos');
  const absent = b => !fs.existsSync(path.join(photos, b.fichier));

  const aFaire = liste.filter(b => absent(b) && !b.photographie);
  const aRevoir = liste.filter(b => !absent(b) && b.aRevoir);
  const aPhotographier = liste.filter(b => b.photographie && absent(b));

  const lignes = [];
  const ecrit = l => { lignes.push(l); console.log(l); };

  ecrit('# Visuels restant à produire');
  ecrit('');
  ecrit('Généré par `node tools/images/generer.js --manquants`. Chaque bloc est un');
  ecrit('prompt complet : copiez-le tel quel dans l’outil de génération d’images.');
  ecrit('Enregistrez le résultat dans `img/brut/` **sous le nom indiqué**, puis lancez');
  ecrit('`node tools/images/optimiser.js` et `node tools/build.js`.');
  ecrit('');

  const bloc = (b, rang) => {
    const f = FORMATS[b.format];
    ecrit('## ' + rang + '. `' + b.fichier + '`');
    ecrit('');
    ecrit('- **Emplacement** : ' + b.ou);
    ecrit('- **Format** : ' + f.l + ' × ' + f.h + ' (' + f.ratio + ')');
    if (b.aRevoir) ecrit('- **Pourquoi la refaire** : ' + b.aRevoir.replace(/\s+/g, ' '));
    ecrit('- **À déposer sous** : `img/brut/' + b.fichier.replace(/\.jpg$/, '') + '.png`');
    ecrit('');
    ecrit('```');
    ecrit(promptComplet(b));
    ecrit('```');
    ecrit('');
  };

  let rang = 0;
  if (aFaire.length) {
    ecrit('---');
    ecrit('');
    ecrit('# Images absentes (' + aFaire.length + ')');
    ecrit('');
    aFaire.forEach(b => bloc(b, ++rang));
  }
  if (aRevoir.length) {
    ecrit('---');
    ecrit('');
    ecrit('# Images en place mais provisoires (' + aRevoir.length + ')');
    ecrit('');
    ecrit('Le site fonctionne sans y toucher. Les refaire améliore la variété de la');
    ecrit('grille des domaines, où plusieurs cartes montrent aujourd’hui la même scène.');
    ecrit('');
    aRevoir.forEach(b => bloc(b, ++rang));
  }
  if (aPhotographier.length) {
    ecrit('---');
    ecrit('');
    ecrit('# À photographier sur place (' + aPhotographier.length + ')');
    ecrit('');
    ecrit('Aucune image de synthèse ne convient ici : le visiteur doit reconnaître le lieu.');
    ecrit('');
    aPhotographier.forEach(b => {
      const f = FORMATS[b.format];
      ecrit('## `' + b.fichier + '` — ' + f.l + ' × ' + f.h + ' (' + f.ratio + ')');
      ecrit('');
      ecrit('- **Emplacement** : ' + b.ou);
      ecrit('- **Consigne** : ' + b.brief.replace(/\s+/g, ' '));
      ecrit('');
    });
  }
  if (!aFaire.length && !aRevoir.length && !aPhotographier.length) ecrit('Rien à produire : tous les visuels sont en place.');

  const sortie = path.join(RACINE, 'img', 'A-GENERER.md');
  fs.writeFileSync(sortie, lignes.join('\n') + '\n');
  console.log('\n→ Écrit dans img/A-GENERER.md');
}

async function principal() {
  const args = process.argv.slice(2);
  const option = n => args.includes(n);
  const valeur = n => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
  const filtre = valeur('--brief') || valeur('--essai') || args.find(a => !a.startsWith('--'));

  let liste = BRIEFS;
  if (filtre) liste = BRIEFS.filter(b => b.fichier.includes(filtre) || b.ou.toLowerCase().includes(filtre.toLowerCase()));
  if (!liste.length) { console.log('Aucun visuel ne correspond à « ' + filtre + ' ».'); return; }

  if (option('--liste')) {
    console.log('Visuels du site — ' + BRIEFS.length + ' entrées\n');
    for (const b of liste) {
      const f = FORMATS[b.format];
      console.log(b.fichier.padEnd(26) + (f.l + '×' + f.h).padEnd(11) +
        (b.nouveau ? 'nouveau  ' : b.photographie ? 'photo    ' : 'à refaire') + '  ' + b.ou);
    }
    return;
  }
  if (option('--brief')) { liste.forEach(b => affiche(b, true)); return; }
  if (option('--manquants')) return manquants(liste);

  const service = serviceDisponible();
  if (!service) {
    console.log('Aucune clé de génération trouvée dans l’environnement.\n');
    console.log('Les briefs sont prêts : passez-les à un photographe, ou renseignez une clé.');
    console.log('  ' + SERVICES.map(s => s.cle).join('\n  ') + '\n');
    console.log('Pour relire les briefs : node tools/images/generer.js --brief');
    return;
  }
  console.log('Service : ' + service.nom + '\n');
  fs.mkdirSync(BRUT, { recursive: true });

  const unSeul = option('--essai');
  let faits = 0;
  for (const b of liste) {
    if (b.photographie) { console.log('⏭  ' + b.fichier + ' — à photographier sur place, pas de génération'); continue; }
    const sortie = path.join(BRUT, b.fichier.replace(/\.jpg$/, '.png'));
    if (fs.existsSync(sortie) && !option('--tout')) { console.log('⏭  ' + b.fichier + ' — déjà dans img/brut/'); continue; }
    process.stdout.write('…  ' + b.fichier + ' ');
    try {
      const image = await service.appelle(promptComplet(b), FORMATS[b.format], process.env[service.cle]);
      fs.writeFileSync(sortie, image);
      console.log('✓ ' + (image.length / 1024).toFixed(0) + ' Ko');
      faits++;
    } catch (e) {
      console.log('✗ ' + e.message);
    }
    if (unSeul) break;
  }
  if (faits) {
    console.log('\n' + faits + ' image(s) dans img/brut/.');
    console.log('Regardez-les, supprimez celles qui ne conviennent pas, relancez pour les remplacer,');
    console.log('puis : node tools/images/optimiser.js');
  }
}

if (require.main === module) principal().catch(e => { console.error(e); process.exit(1); });
module.exports = { SERVICES };
