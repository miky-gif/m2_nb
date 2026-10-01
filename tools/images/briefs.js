/* ===========================================================================
   Cahier des charges visuel du site.

   Chaque entrée décrit UNE image : où elle apparaît, le cadrage attendu, et
   le brief qui doit permettre de l'obtenir — que ce soit auprès d'un
   photographe, d'un directeur artistique ou d'un service de génération
   d'images. Les visuels en place sont aujourd'hui des images de synthèse,
   importées depuis img/image generer/ par importer.js. L'un d'eux reste un
   pis-aller, signalé par `aRevoir` : le générateur a livré plusieurs
   variations d'une même scène de bureau, et une carte de la grille des
   domaines s'en contente encore.

   Le champ `prompt` est rédigé en anglais : c'est la langue dans laquelle les
   moteurs de génération rendent les résultats les plus fidèles. Le champ
   `brief` est la même intention en français, à transmettre telle quelle à un
   photographe.

   Direction artistique commune à toutes les images — reprise dans DA :
     · lumière naturelle chaude, heure dorée ou lumière de fenêtre ;
     · palette bordeaux profond, laiton, ivoire, bois sombre ;
     · cadrage large et calme, beaucoup d'air, peu d'objets ;
     · aucun texte, aucun logo, aucune marque lisible dans l'image ;
     · personnes africaines, tenue professionnelle sobre, Yaoundé, Cameroun ;
     · pas de regard caméra, pas de pose figée : des gestes de travail réels.
   =========================================================================== */

const DA = [
  'editorial photography for a high-end law firm',
  'warm natural light, soft window light or golden hour',
  'restrained palette of deep burgundy, brass, ivory, dark wood',
  'calm wide composition with generous negative space',
  'shallow depth of field, 35mm or 50mm look, subtle film grain',
  'no text, no logos, no readable branding anywhere in the frame',
  'photorealistic, not illustration, not 3D render'
].join(', ');

/* Ajouté aux seules images où figurent des personnes : sans cette réserve,
   les moteurs peuplent volontiers les salles que l'on voulait vides. */
const DA_PERSONNES = 'Black African professionals in Yaoundé, Cameroon, sober business attire, ' +
  'candid working gestures, never looking at the camera, no stock-photo smiles';
const DA_SANS_PERSONNE = 'no people in the frame';

/* Les formats correspondent aux emplacements réels dans les gabarits. */
const FORMATS = {
  heroLarge:  { l: 2400, h: 1350, ratio: '16:9' },   /* fond de bannière plein écran */
  heroPage:   { l: 1800, h: 1200, ratio: '3:2' },    /* bannière des pages intérieures */
  arche:      { l: 1000, h: 1250, ratio: '4:5' },    /* médaillon en plein cintre */
  carte:      { l: 1400, h: 933,  ratio: '3:2' },    /* cartes de domaines (bento) */
  bandeau:    { l: 1600, h: 900,  ratio: '16:9' },   /* visuels d'appui dans le texte */
  portraitLieu: { l: 1400, h: 1120, ratio: '5:4' }   /* vues du cabinet */
};

const BRIEFS = [
  /* --------------------------------------------------- bannières d'accueil */
  {
    fichier: 'hero-colonnes.jpg', format: 'heroLarge',
    ou: 'Accueil — fond de la 1re diapositive (assombri à 70 %, le texte passe par-dessus)',
    brief: "Façade d'un palais de justice ou d'un bâtiment institutionnel camerounais en fin de journée, " +
      "vue en contre-plongée légère, colonnes et ombres longues. Cadre volontairement sombre et " +
      "peu contrasté dans la moitié gauche, où viendra le titre.",
    prompt: 'Low-angle exterior of a modern West African courthouse facade at dusk, tall concrete columns, ' +
      'long shadows, moody underexposed left half for text overlay, deep shadows, warm amber highlights'
  },
  {
    fichier: 'immeuble-affaires.jpg', format: 'heroLarge',
    ou: 'Accueil — fond de la 2e diapositive ; carte « Droit des affaires »',
    brief: "Immeuble de bureaux contemporain à Yaoundé vu depuis la rue, verre et béton, ciel de fin " +
      "d'après-midi. Aucune enseigne lisible.",
    prompt: 'Contemporary glass-and-concrete office tower in Yaoundé seen from street level, late afternoon sky, ' +
      'reflections of warm light on the facade, no signage'
  },
  {
    fichier: 'cabinet-bibliotheque.jpg', format: 'heroLarge',
    ou: 'Accueil — fond de la 3e diapositive ; page « Le cabinet » ; page « Nos références »',
    brief: "Bibliothèque juridique du cabinet : rayonnages de codes et de recueils en bois sombre, " +
      "lumière rasante venue d'une fenêtre à droite, un ouvrage ouvert sur une table au premier plan flou.",
    prompt: 'Law firm library, dark wood shelves filled with legal codes and bound volumes, raking window light ' +
      'from the right, one open book on a table in soft foreground blur'
  },

  /* ------------------------------------------------ médaillons en arche 4/5 */
  {
    fichier: 'cabinet-justice.jpg', format: 'arche',
    ou: 'Accueil — médaillon de la 1re diapositive ; carte « Contentieux administratif »',
    brief: "Statue de la Justice en bronze, balance et glaive, détourée sur un fond sombre uni. " +
      "Cadrage vertical, la statue occupe le tiers droit.",
    prompt: 'Bronze Lady Justice statue with scales and sword, vertical framing, subject on the right third, ' +
      'plain dark background, single warm key light, brass reflections'
  },
  {
    fichier: 'signature-contrat.jpg', format: 'arche', personnes: true,
    ou: 'Accueil — médaillon de la 2e diapositive ; carte « Droit commercial & contrats »',
    brief: "Mains d'un avocat et d'un client signant un contrat sur une table en bois sombre, " +
      "stylo à plume, deux exemplaires du document. Cadrage serré sur les mains, visages hors champ.",
    prompt: 'Close-up of two pairs of Black hands signing a contract on a dark wooden table, fountain pen, ' +
      'two paper copies, vertical framing, faces out of frame, warm directional light'
  },
  {
    fichier: 'cabinet-poignee.jpg', format: 'arche', personnes: true,
    ou: 'Accueil — médaillon de la 3e diapositive ; page « Notre équipe » ; carte « Droit foncier »',
    brief: "Poignée de main entre un avocat et un client, debout dans un couloir clair du cabinet, " +
      "cadrage taille, visages coupés au niveau du menton.",
    prompt: 'Handshake between a Black attorney and a client standing in a bright office corridor, ' +
      'waist-up vertical framing, faces cropped above the chin, soft daylight'
  },

  /* ----------------------------------------------------- lieux du cabinet */
  {
    fichier: 'salle-conseil.jpg', format: 'portraitLieu',
    ou: 'Page « Le cabinet » — bannière et composition ; carte « Droit des sociétés »',
    brief: "Salle de réunion du cabinet, table ovale, huit fauteuils, mur en bois sombre, " +
      "grande fenêtre à gauche. Salle vide, prête pour un rendez-vous.",
    prompt: 'Empty law firm boardroom, oval table, eight leather chairs, dark wood panelling, ' +
      'tall window on the left, warm morning light, no people'
  },
  {
    fichier: 'bureau-avocat.jpg', format: 'heroPage',
    ou: 'Fiches individuelles des membres de l’équipe — bannière',
    brief: "Bureau d'avocat vu de trois quarts : sous-main en cuir, dossiers reliés, lampe en laiton " +
      "allumée, fauteuil vide. Ambiance de fin de journée.",
    prompt: 'Attorney desk seen at a three-quarter angle, leather desk pad, bound case files, lit brass lamp, ' +
      'empty chair, late-day ambience, no people'
  },
  {
    fichier: 'hero-colonnes1.jpg', format: 'heroPage',
    ou: 'Pages « Nos services » et pages légales — bannière',
    brief: "Colonnade extérieure d'un bâtiment institutionnel, prise en enfilade, perspective fuyante, " +
      "lumière du matin. Moitié basse dans l'ombre.",
    prompt: 'Receding colonnade of an institutional building photographed down its length, vanishing perspective, ' +
      'morning light, lower half in shadow'
  },
  {
    fichier: 'hero-contact.jpg', format: 'heroPage', nouveau: true,
    ou: 'Page « Contact » — bannière (remplace hero-colonnes.jpg, aujourd’hui partagé)',
    brief: "Vue de Yaoundé en fin de journée depuis une hauteur : collines, toits, lumière chaude. " +
      "Un repère de la ville reconnaissable sans être touristique.",
    prompt: 'Elevated view over Yaoundé at golden hour, hills and rooftops, warm light, understated and calm, ' +
      'no tourist landmark framing'
  },
  {
    fichier: 'immeuble-acces.jpg', format: 'bandeau', nouveau: true,
    ou: 'Page « Contact » — visuel d’accès (remplace immeuble-affaires.jpg)',
    brief: "Entrée de l'immeuble Tsambou vue depuis le trottoir, de jour. Une photographie réelle est " +
      "ici préférable à toute image générée : elle aide le client à trouver le cabinet.",
    prompt: '',                                     /* à photographier sur place */
    photographie: true
  },

  /* ------------------------------------------- cartes des domaines (bento) */
  {
    fichier: 'art-mediation.jpg', format: 'carte', personnes: true,
    ou: 'Carte « Arbitrage & médiation »',
    brief: "Deux parties assises de part et d'autre d'une table, un tiers médiateur au centre, " +
      "vus de dos ou de profil. Gestes ouverts, documents posés au milieu.",
    prompt: 'Three people around a table in a mediation session, two parties and a mediator, seen from behind ' +
      'or in profile, open gestures, documents in the middle of the table'
  },
  {
    fichier: 'art-dirigeant.jpg', format: 'carte', personnes: true,
    ou: 'Carte « Droit du travail & droit social »',
    brief: "Scène d'entretien dans une entreprise : un dirigeant et un salarié face à face dans un " +
      "bureau clair, attitude posée. Aucun signe de conflit.",
    prompt: 'A manager and an employee facing each other across a desk in a bright office, composed and ' +
      'respectful body language, documents between them'
  },
  {
    fichier: 'art-relecture.jpg', format: 'carte', personnes: true,
    aRevoir: 'Une vue de bureau tient la place. Le cadrage en plongée sur les mains du ' +
      'brief romprait la série de plans larges qui se répètent dans la grille.',
    ou: 'Carte « Conseil juridique »',
    brief: "Mains annotant un contrat au stylo, lunettes posées à côté, café. Cadrage en plongée.",
    prompt: 'Top-down view of Black hands annotating a contract with a pen, reading glasses and a coffee cup ' +
      'beside the papers, warm desk light'
  },
  {
    fichier: 'art-litige.jpg', format: 'carte',
    ou: 'Cartes « Contentieux » et « Droit pénal » ; vignette d’article',
    brief: "Marteau de juge posé sur un socle, à côté d'un dossier fermé. Fond sombre, lumière rasante. " +
      "Deux images distinctes sont souhaitables : une pour le contentieux civil, une pour le pénal.",
    prompt: 'Judge gavel resting on its block beside a closed case file, dark background, raking warm light'
  },
  {
    fichier: 'art-penal.jpg', format: 'carte', nouveau: true,
    ou: 'Carte « Droit pénal général et droit pénal des affaires » (aujourd’hui partagée avec le contentieux)',
    brief: "Couloir de tribunal vide, bancs en bois, portes closes au fond. Atmosphère grave et sobre.",
    prompt: 'Empty courthouse corridor, wooden benches along the wall, closed doors at the far end, ' +
      'grave and restrained atmosphere, cool shadows with a warm pool of light'
  },
  {
    fichier: 'art-foncier.jpg', format: 'carte', nouveau: true,
    ou: 'Carte « Droit foncier » (aujourd’hui partagée avec la poignée de main)',
    brief: "Plan cadastral déplié sur une table, règle et crayon, terrain visible par la fenêtre en arrière-plan flou.",
    prompt: 'Unfolded land survey plan on a table, ruler and pencil, a plot of land visible through a window ' +
      'in soft background blur'
  },
  {
    fichier: 'art-famille.jpg', format: 'carte', nouveau: true,
    ou: 'Carte « Droit civil et droit de la famille » (aujourd’hui partagée avec la bibliothèque)',
    brief: "Deux chaises vides face à un bureau, lumière douce. Suggérer la médiation familiale sans " +
      "montrer de visage ni de situation de conflit — la retenue est ici une exigence déontologique.",
    prompt: 'Two empty chairs facing a desk in a quiet office, soft daylight, restrained and dignified, ' +
      'no people, no distress'
  },
  {
    fichier: 'art-clauses.jpg', format: 'carte',
    ou: 'Page « Actualités » — bannière et vignette d’article',
    brief: "Loupe posée sur un code annoté, marque-pages de couleur. Cadrage serré.",
    prompt: 'Magnifying glass resting on an annotated legal code, coloured page markers, tight framing, ' +
      'warm desk light'
  },
  {
    fichier: 'art-contrat.jpg', format: 'bandeau',
    ou: 'Page « Actualités » — visuel de l’article à la une',
    brief: "Pile de contrats reliés, agrafés, sur un bureau. Vue rasante, faible profondeur de champ.",
    prompt: 'Stack of bound and clipped contracts on a desk, grazing camera angle, shallow depth of field'
  }
];

/* Pour chaque brief, le texte complet envoyé au moteur de génération. */
function promptComplet(b) {
  const f = FORMATS[b.format];
  return [b.prompt, DA, b.personnes ? DA_PERSONNES : DA_SANS_PERSONNE, `aspect ratio ${f.ratio}`]
    .filter(Boolean).join(', ');
}

module.exports = { BRIEFS, FORMATS, DA, DA_PERSONNES, promptComplet };
