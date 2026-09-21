/* Contrôle de la version anglaise : signale toute chaîne restée en français.
   Usage : node tools/verifie-traduction.js */
const fs = require('fs');
const path = require('path');
const { dictionnaire } = require('./traduction.js');

const RACINE = path.join(__dirname, '..');
const DOSSIER = path.join(RACINE, 'en');
/* Seules les chaînes dont la traduction diffère réellement sont contrôlées :
   « Contact » ou « Menu » s'écrivent de la même façon dans les deux langues. */
const CLES = new Set(dictionnaire().filter(([fr, en]) => fr !== en).map(([fr]) => fr.replace(/\s+/g, ' ').trim()));

/* Mots outils français : leur présence isolée trahit une phrase non traduite. */
const MOTS = ['le', 'la', 'les', 'des', 'du', 'une', 'un', 'nous', 'vous', 'pour', 'avec', 'dans',
  'sur', 'est', 'sont', 'qui', 'que', 'aux', 'ses', 'leurs', 'notre', 'nos', 'votre', 'vos',
  'cabinet', 'avocat', 'juridique', 'et', 'ou', 'au', 'aux', 'ce', 'cette', 'plus'];
const REGEX_MOTS = new RegExp('(^|[\\s(’\'"])(' + MOTS.join('|') + ')([\\s,.;:!?)’\'"]|$)', 'i');

/* Noms propres et termes qui restent identiques dans les deux langues. */
const TOLERE = [/^M2NB/, /METANG|TCHAPDA|NGASSA|KOUENJOU|MAMBOU|NKAMA|TCHANGAM|NGONO|SANDJONG|NOUBOUSSI|Clovis|Aurélien|Carine|Bernadette|Fédol|Rosine|Marius|Yoann|Symphorien|Sorelle|Aurélia/,
  /^Yaound/, /^Cameroon/, /^Me /, /^\[/, /^©/, /^FR$|^EN$/, /^Français$/, /^Instrument Serif$/];

const fichiers = fs.readdirSync(DOSSIER).filter(f => f.endsWith('.html'));
const soucis = [];

for (const f of fichiers) {
  let html = fs.readFileSync(path.join(DOSSIER, f), 'utf8');
  html = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<svg[\s\S]*?<\/svg>/g, '');

  const chaines = [];
  for (const m of html.matchAll(/\b(alt|aria-label|title|placeholder|aria-roledescription|data-accroche)="([^"]*)"/g)) chaines.push(['attribut ' + m[1], m[2]]);
  const t = html.match(/<title>([^<]*)<\/title>/);
  if (t) chaines.push(['titre', t[1]]);
  for (const m of html.matchAll(/<meta name="description" content="([^"]*)"|<meta property="og:(?:title|description)" content="([^"]*)"/g)) chaines.push(['meta', m[1] || m[2]]);
  for (const ligne of html.replace(/<[^>]+>/g, '\n').split('\n')) chaines.push(['texte', ligne]);

  for (const [type, brut] of chaines) {
    const s = (brut || '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    if (!s || s.length < 3 || TOLERE.some(r => r.test(s))) continue;
    if (CLES.has(s)) soucis.push(`${f} · ${type} · NON TRADUIT : « ${s} »`);
    else if (REGEX_MOTS.test(s)) soucis.push(`${f} · ${type} · français probable : « ${s.slice(0, 110)} »`);
  }
}

if (soucis.length) {
  console.log(soucis.length + ' anomalie(s) :');
  console.log([...new Set(soucis)].join('\n'));
  process.exitCode = 1;
} else {
  console.log('Version anglaise : aucune chaîne française détectée (' + fichiers.length + ' pages).');
}
