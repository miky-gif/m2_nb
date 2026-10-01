/* ===========================================================================
   Pilote un navigateur Chromium (Edge ou Chrome) en mode « headless » pour
   servir d'atelier graphique : le <canvas> du navigateur sait décoder le PNG
   et le JPEG, redimensionner proprement et ré-encoder en WebP. Cela évite
   d'installer la moindre dépendance npm sur le poste du Cabinet.

   Utilisation :
     const { ouvre } = require('./navigateur.js');
     const nav = await ouvre();
     const png = await nav.traite(['img/a.png'], (images) => { ... });
     nav.ferme();
   =========================================================================== */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const RACINE = path.resolve(__dirname, '..', '..');
const pause = ms => new Promise(r => setTimeout(r, ms));

/* Emplacements habituels d'un Chromium sous Windows, macOS et Linux. */
const CANDIDATS = [
  process.env.NAVIGATEUR,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/microsoft-edge', '/usr/bin/google-chrome', '/usr/bin/chromium'
].filter(Boolean);

function executable() {
  const trouve = CANDIDATS.find(c => { try { return fs.existsSync(c); } catch (e) { return false; } });
  if (!trouve) {
    throw new Error('Aucun navigateur Chromium trouvé. Indiquez son chemin :\n' +
      '  set NAVIGATEUR=C:\\chemin\\vers\\msedge.exe   (Windows)\n' +
      '  export NAVIGATEUR=/chemin/vers/chrome         (macOS, Linux)');
  }
  return trouve;
}

/* Le navigateur ne peut pas lire le disque depuis une page « about:blank » :
   on lui passe donc chaque fichier sous forme de data-URI. */
const TYPES = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif' };
function dataUri(fichier) {
  const abs = path.isAbsolute(fichier) ? fichier : path.join(RACINE, fichier);
  const type = TYPES[path.extname(abs).toLowerCase()];
  if (!type) throw new Error('Format non pris en charge : ' + fichier);
  return `data:${type};base64,${fs.readFileSync(abs).toString('base64')}`;
}

async function ouvre({ port = 9422 } = {}) {
  const profil = path.join(require('os').tmpdir(), 'm2nb-images-' + Date.now());
  const proc = spawn(executable(), ['--headless=new', '--disable-gpu', '--mute-audio',
    `--remote-debugging-port=${port}`, `--user-data-dir=${profil}`, 'about:blank'], { stdio: 'ignore' });

  let cibles;
  for (let i = 0; i < 60; i++) {
    try {
      cibles = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
      if (cibles.find(c => c.type === 'page')) break;
    } catch (e) { /* le navigateur démarre encore */ }
    await pause(250);
  }
  const cible = cibles && cibles.find(c => c.type === 'page');
  if (!cible) { proc.kill(); throw new Error('Le navigateur n’a pas répondu sur le port ' + port); }

  const ws = new WebSocket(cible.webSocketDebuggerUrl);
  await new Promise((ok, ko) => { ws.addEventListener('open', ok); ws.addEventListener('error', ko); });
  let id = 0;
  const attente = new Map();
  ws.addEventListener('message', ev => {
    const m = JSON.parse(ev.data);
    if (m.id && attente.has(m.id)) { attente.get(m.id)(m); attente.delete(m.id); }
  });
  const envoie = (method, params = {}) => new Promise(r => {
    const i = ++id; attente.set(i, r); ws.send(JSON.stringify({ id: i, method, params }));
  });
  await envoie('Runtime.enable');

  const evalue = async (expression) => {
    const r = await envoie('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    const err = r.result?.exceptionDetails;
    if (err) throw new Error(err.exception?.description || err.text);
    return r.result?.result?.value;
  };

  /* `recette` est une fonction exécutée DANS la page. Elle reçoit le tableau
     des <img> déjà décodées et doit renvoyer un canvas (ou une data-URI). */
  const traite = async (fichiers, recette, options = {}) => {
    const { type = 'image/png', qualite = 0.92, arguments: args = {} } = options;
    const uris = (Array.isArray(fichiers) ? fichiers : [fichiers]).map(dataUri);
    const code = `(async () => {
      const uris = ${JSON.stringify(uris)};
      const args = ${JSON.stringify(args)};
      const images = await Promise.all(uris.map(u => new Promise((ok, ko) => {
        const im = new Image(); im.onload = () => ok(im); im.onerror = ko; im.src = u;
      })));
      const sortie = await (${recette.toString()})(images, args);
      const canvas = sortie instanceof HTMLCanvasElement ? sortie : sortie;
      return typeof canvas === 'string' ? canvas : canvas.toDataURL(${JSON.stringify(type)}, ${qualite});
    })()`;
    const uri = await evalue(code);
    return Buffer.from(uri.slice(uri.indexOf(',') + 1), 'base64');
  };

  /* Comme `traite`, mais la recette renvoie une valeur JSON (mesures, couleurs…). */
  const mesure = async (fichiers, recette, args = {}) => {
    const uris = (Array.isArray(fichiers) ? fichiers : [fichiers]).map(dataUri);
    return evalue(`(async () => {
      const uris = ${JSON.stringify(uris)};
      const args = ${JSON.stringify(args)};
      const images = await Promise.all(uris.map(u => new Promise((ok, ko) => {
        const im = new Image(); im.onload = () => ok(im); im.onerror = ko; im.src = u;
      })));
      return JSON.stringify(await (${recette.toString()})(images, args));
    })()`).then(JSON.parse);
  };

  return { evalue, traite, mesure, ferme() { try { ws.close(); } catch (e) {} proc.kill(); } };
}

/* Écrit un fichier en créant son dossier au besoin, et annonce le poids. */
function ecris(relatif, buffer) {
  const abs = path.isAbsolute(relatif) ? relatif : path.join(RACINE, relatif);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, buffer);
  console.log('  ✓ ' + relatif.padEnd(46) + (buffer.length / 1024).toFixed(0).padStart(6) + ' Ko');
}

module.exports = { ouvre, ecris, dataUri, RACINE };
