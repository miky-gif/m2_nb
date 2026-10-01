/* ===========================================================================
   Compose des visuels abstraits dessinés au code, dans la charte du Cabinet.

     node tools/images/composer.js --apercu      quelques exemples, dans img/apercu/
     node tools/images/composer.js               tous les visuels prévus
     node tools/images/composer.js droit-penal   un seul

   Ce ne sont pas des photographies : ce sont des compositions géométriques —
   colonnades, arches, balance, trames, sceaux — tracées dans le bordeaux, le
   laiton et l'ivoire du site, avec le monogramme en filigrane. Aucun visage,
   aucun lieu, donc aucun risque de montrer un bureau qui n'est pas le vôtre.

   Leur intérêt : ils forment une série cohérente, ils sont à vous, ils ne
   coûtent rien et ne posent aucune question de droits. Leur limite : ils ne
   remplacent pas une photographie des locaux et de l'équipe, qui reste ce qui
   distingue vraiment un site de cabinet.
   =========================================================================== */
const { ouvre, ecris } = require('./navigateur.js');
const { BRIEFS, FORMATS } = require('./briefs.js');

const PALETTE = {
  noir: '#0B0807', nuit: '#140E0D', sombre: '#1D1614',
  bordeaux: '#6B1C2A', bordeauxProfond: '#3F0F18', bordeauxClair: '#8E3445',
  laiton: '#B08D57', laitonClair: '#D9BF8C',
  ivoire: '#F7F2EB', lin: '#EEE5D8', papier: '#FCF9F4'
};

/* Chaque motif est tracé dans un carré normalisé 0→1 puis étiré au format
   demandé : une même famille graphique tient ainsi en bannière comme en carte. */
const MOTIFS = ['colonnade', 'arche', 'balance', 'trame', 'sceau', 'voute'];

const compose = (images, a) => {
  const c = document.createElement('canvas');
  c.width = a.l; c.height = a.h;
  const x = c.getContext('2d');
  const L = a.l, H = a.h, m = Math.min(L, H);
  const P = a.palette;
  const sombre = a.ton === 'sombre';

  /* ---------------------------------------------------------------- fond */
  const fond = x.createLinearGradient(0, 0, L * 0.85, H);
  if (sombre) {
    fond.addColorStop(0, P.bordeauxProfond);
    fond.addColorStop(0.55, P.nuit);
    fond.addColorStop(1, P.noir);
  } else {
    fond.addColorStop(0, P.lin);
    fond.addColorStop(0.55, '#DCCDB8');
    fond.addColorStop(1, '#C3AE93');
  }
  x.fillStyle = fond;
  x.fillRect(0, 0, L, H);

  /* Halo chaud décentré : évite l'aplat et donne une direction de lumière. */
  const halo = x.createRadialGradient(L * a.lumiere[0], H * a.lumiere[1], 0,
    L * a.lumiere[0], H * a.lumiere[1], m * 1.1);
  halo.addColorStop(0, sombre ? 'rgba(176,141,87,.30)' : 'rgba(252,249,244,.55)');
  halo.addColorStop(1, 'rgba(0,0,0,0)');
  x.fillStyle = halo;
  x.fillRect(0, 0, L, H);

  const encre = sombre ? P.laitonClair : P.bordeaux;
  const trait = m * 0.0032;

  /* -------------------------------------------------------------- motifs */
  x.save();
  x.lineCap = 'round';
  x.lineJoin = 'round';

  if (a.motif === 'colonnade') {
    /* Colonnes de largeurs irrégulières, éclairées par la gauche. */
    const n = 9;
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const larg = L * (0.035 + 0.02 * Math.abs(Math.sin(i * 1.7)));
      const px = L * (0.06 + t * 0.88) - larg / 2;
      const d = x.createLinearGradient(px, 0, px + larg, 0);
      const force = 0.05 + 0.12 * (1 - Math.abs(t - a.lumiere[0]));
      d.addColorStop(0, `rgba(${sombre ? '217,191,140' : '107,28,42'},${force})`);
      d.addColorStop(0.5, `rgba(${sombre ? '217,191,140' : '107,28,42'},${force * 0.35})`);
      d.addColorStop(1, 'rgba(0,0,0,0)');
      x.fillStyle = d;
      x.fillRect(px, H * 0.06, larg, H * 0.94);
      /* Chapiteau */
      x.fillStyle = `rgba(${sombre ? '217,191,140' : '107,28,42'},${force * 0.8})`;
      x.fillRect(px - larg * 0.12, H * 0.06, larg * 1.24, H * 0.014);
    }
  }

  if (a.motif === 'arche' || a.motif === 'voute') {
    /* Arches concentriques : le plein cintre est le motif récurrent du site.
       Le rayon extérieur est ramené à ce que le cadre peut contenir, sinon les
       grandes arches sortent par le haut sur les formats larges. */
    const cy = H * Math.max(a.centre[1], 0.52);
    const cx = L * Math.min(Math.max(a.centre[0], 0.30), 0.70);
    const n = a.motif === 'voute' ? 7 : 5;
    const dispo = Math.min(cy, cx, L - cx) * 0.94;
    const pas = dispo / n;
    for (let i = 0; i < n; i++) {
      const r = pas * (i + 1);
      x.strokeStyle = encre;
      x.globalAlpha = (sombre ? 0.30 : 0.42) - i * 0.035;
      x.lineWidth = trait * (i === 1 ? 2.4 : 1);
      x.beginPath();
      x.arc(cx, cy, r, Math.PI, 0);
      x.lineTo(cx + r, cy + H);
      x.moveTo(cx - r, cy);
      x.lineTo(cx - r, cy + H);
      x.stroke();
    }
    if (a.motif === 'voute') {
      /* Nervures rayonnantes, comme les arêtes d'une voûte. */
      x.globalAlpha = 0.16;
      x.lineWidth = trait;
      for (let i = 0; i <= 10; i++) {
        const ang = Math.PI + (i / 10) * Math.PI;
        x.beginPath();
        x.moveTo(cx, cy);
        x.lineTo(cx + Math.cos(ang) * dispo, cy + Math.sin(ang) * dispo);
        x.stroke();
      }
    }
  }

  if (a.motif === 'balance') {
    /* Balance réduite à son épure : un fléau, deux plateaux, un axe.
       La demi-portée tient compte des plateaux, qui débordent du fléau. */
    const cy = H * Math.min(Math.max(a.centre[1], 0.42), 0.58);
    const cx = L * 0.5;
    const br = Math.min(m * 0.30, L * 0.5 * 0.80 / 1.48);
    x.strokeStyle = encre;
    x.lineWidth = trait * 1.6;
    x.globalAlpha = sombre ? 0.5 : 0.62;
    x.beginPath();
    x.moveTo(cx, cy - m * 0.34); x.lineTo(cx, cy + m * 0.40);          /* axe */
    x.moveTo(cx - br, cy - m * 0.24); x.lineTo(cx + br, cy - m * 0.24); /* fléau */
    x.moveTo(cx - m * 0.16, cy + m * 0.40); x.lineTo(cx + m * 0.16, cy + m * 0.40); /* socle */
    x.stroke();
    for (const s of [-1, 1]) {
      const px = cx + s * br, py = cy - m * 0.24;
      const pr = br * 0.48, pd = br * 0.38;
      x.globalAlpha = 0.5;
      x.lineWidth = trait * 1.2;
      x.beginPath();
      x.moveTo(px - pr, py + pd); x.lineTo(px, py); x.lineTo(px + pr, py + pd);
      x.stroke();
      x.beginPath();
      x.moveTo(px - pr, py + pd);
      x.quadraticCurveTo(px, py + pd + m * 0.075, px + pr, py + pd);
      x.stroke();
      x.globalAlpha = 0.14;
      x.fillStyle = encre;
      x.fill();
    }
  }

  if (a.motif === 'trame') {
    /* Grille fine, une cellule pleine : la pièce du dossier qui compte. */
    const pas = m * 0.085;
    x.strokeStyle = encre;
    x.globalAlpha = sombre ? 0.14 : 0.20;
    x.lineWidth = trait * 0.7;
    x.beginPath();
    for (let px = pas; px < L; px += pas) { x.moveTo(px, 0); x.lineTo(px, H); }
    for (let py = pas; py < H; py += pas) { x.moveTo(0, py); x.lineTo(L, py); }
    x.stroke();
    x.globalAlpha = 0.9;
    x.fillStyle = sombre ? P.bordeaux : P.bordeaux;
    const gx = Math.floor(L * a.centre[0] / pas) * pas, gy = Math.floor(H * a.centre[1] / pas) * pas;
    x.fillRect(gx, gy, pas, pas);
    x.globalAlpha = 0.35;
    x.fillStyle = P.laiton;
    x.fillRect(gx + pas, gy - pas, pas, pas);
  }

  if (a.motif === 'sceau') {
    /* Cercles concentriques et graduations, comme un sceau de cire. */
    const cx = L * a.centre[0], cy = H * a.centre[1];
    x.strokeStyle = encre;
    for (const [r, al, w] of [[0.20, 0.42, 1.8], [0.255, 0.20, 0.8], [0.34, 0.14, 0.8], [0.44, 0.09, 0.8]]) {
      x.globalAlpha = al; x.lineWidth = trait * w;
      x.beginPath(); x.arc(cx, cy, m * r, 0, Math.PI * 2); x.stroke();
    }
    x.globalAlpha = 0.26;
    x.lineWidth = trait;
    for (let i = 0; i < 48; i++) {
      const ang = (i / 48) * Math.PI * 2;
      const r0 = m * 0.275, r1 = m * (i % 4 === 0 ? 0.325 : 0.30);
      x.beginPath();
      x.moveTo(cx + Math.cos(ang) * r0, cy + Math.sin(ang) * r0);
      x.lineTo(cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1);
      x.stroke();
    }
  }
  x.restore();

  /* ------------------------------------------------- monogramme filigrane */
  if (images[0]) {
    const mono = images[0];
    const larg = Math.min(m * a.filigrane, L * 0.78);
    const haut = larg * mono.naturalHeight / mono.naturalWidth;
    /* Le sigle doit rester entier : un monogramme coupé par le bord se lit
       comme un défaut de fabrication, pas comme un parti pris. */
    const px = Math.min(Math.max(L * a.filigranePos[0] - larg / 2, L * 0.04), L * 0.96 - larg);
    const py = Math.min(Math.max(H * a.filigranePos[1] - haut / 2, H * 0.06), H * 0.94 - haut);
    x.save();
    x.globalAlpha = sombre ? 0.10 : 0.05;
    x.drawImage(mono, px, py, larg, haut);
    x.restore();
  }

  /* ------------------------------------------- filet de cadre et vignetage */
  x.strokeStyle = sombre ? 'rgba(217,191,140,.22)' : 'rgba(107,28,42,.18)';
  x.lineWidth = trait;
  x.strokeRect(m * 0.045, m * 0.045, L - m * 0.09, H - m * 0.09);

  const vig = x.createRadialGradient(L / 2, H / 2, m * 0.25, L / 2, H / 2, Math.max(L, H) * 0.78);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, sombre ? 'rgba(0,0,0,.55)' : 'rgba(61,40,30,.20)');
  x.fillStyle = vig;
  x.fillRect(0, 0, L, H);

  /* --------------------------------------------------------------- grain */
  const bruit = x.getImageData(0, 0, L, H);
  const d = bruit.data;
  for (let i = 0; i < d.length; i += 4) {
    const g = (Math.random() - 0.5) * a.grain;
    d[i] += g; d[i + 1] += g; d[i + 2] += g;
  }
  x.putImageData(bruit, 0, 0);
  return c;
};

/* Réglages par visuel : le motif et la tonalité suivent le sujet du domaine. */
const REGLAGES = {
  'hero-colonnes':        { motif: 'colonnade', ton: 'sombre' },
  'hero-colonnes1':       { motif: 'voute',     ton: 'sombre' },
  'hero-contact':         { motif: 'arche',     ton: 'sombre' },
  'immeuble-affaires':    { motif: 'trame',     ton: 'sombre' },
  'cabinet-bibliotheque': { motif: 'trame',     ton: 'clair'  },
  'cabinet-justice':      { motif: 'balance',   ton: 'sombre' },
  'signature-contrat':    { motif: 'trame',     ton: 'clair'  },
  'cabinet-poignee':      { motif: 'arche',     ton: 'clair'  },
  'salle-conseil':        { motif: 'voute',     ton: 'clair'  },
  'bureau-avocat':        { motif: 'sceau',     ton: 'sombre' },
  'immeuble-acces':       { motif: 'trame',     ton: 'clair'  },
  'art-mediation':        { motif: 'balance',   ton: 'clair'  },
  'art-dirigeant':        { motif: 'colonnade', ton: 'clair'  },
  'art-relecture':        { motif: 'trame',     ton: 'clair'  },
  'art-litige':           { motif: 'balance',   ton: 'sombre' },
  'art-penal':            { motif: 'voute',     ton: 'sombre' },
  'art-foncier':          { motif: 'trame',     ton: 'sombre' },
  'art-famille':          { motif: 'arche',     ton: 'clair'  },
  'art-clauses':          { motif: 'sceau',     ton: 'clair'  },
  'art-contrat':          { motif: 'colonnade', ton: 'sombre' }
};

/* Variation déterministe : deux visuels du même motif ne se superposent pas. */
function variantes(nom) {
  let h = 0;
  for (let i = 0; i < nom.length; i++) h = (h * 31 + nom.charCodeAt(i)) >>> 0;
  const r = n => ((h >>> (n * 5)) & 31) / 31;
  return {
    lumiere: [0.18 + r(0) * 0.64, 0.10 + r(1) * 0.42],
    centre: [0.30 + r(2) * 0.44, 0.38 + r(3) * 0.28],
    filigrane: 0.62 + r(4) * 0.5,
    filigranePos: [0.62 + r(5) * 0.3, 0.30 + r(1) * 0.42]
  };
}

async function principal() {
  const apercu = process.argv.includes('--apercu');
  const filtre = process.argv.slice(2).find(a => !a.startsWith('--'));

  let liste = BRIEFS.map(b => ({ b, nom: b.fichier.replace(/\.jpg$/, '') })).filter(e => REGLAGES[e.nom]);
  if (apercu) liste = liste.filter(e => ['art-penal', 'art-famille', 'cabinet-justice', 'hero-colonnes', 'art-clauses', 'salle-conseil'].includes(e.nom));
  if (filtre) liste = liste.filter(e => e.nom.includes(filtre));
  if (!liste.length) { console.log('Aucun visuel ne correspond.'); return; }

  const dossier = apercu ? 'img/apercu/' : 'img/brut/';
  const nav = await ouvre({ port: 9429 });
  try {
    for (const { b, nom } of liste) {
      const f = FORMATS[b.format];
      const args = { l: f.l, h: f.h, palette: PALETTE, grain: 9, ...REGLAGES[nom], ...variantes(nom) };
      ecris(dossier + nom + (apercu ? '.jpg' : '.png'),
        await nav.traite(['img/logo-mono.png'], compose,
          { type: apercu ? 'image/jpeg' : 'image/png', qualite: 0.88, arguments: args }));
    }
  } finally {
    nav.ferme();
  }
  console.log(apercu
    ? '\nAperçus dans img/apercu/ — à regarder avant de lancer la série complète.'
    : '\nVisuels dans img/brut/. Ensuite : node tools/images/optimiser.js');
}

if (require.main === module) principal().catch(e => { console.error(e); process.exit(1); });
module.exports = { compose, PALETTE, MOTIFS, REGLAGES };
