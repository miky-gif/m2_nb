/* Contenus du site, repris de la maquette « M2NB Accueil.dc.html ».
   Le design est entièrement porté par tools/build.js et assets/css/site.css. */

const P = 'img/photos/';

const DOMAINES = [
  {
    cle: 'affaires', fichier: 'droit-des-affaires.html', titre: 'Droit des affaires', court: 'Affaires',
    image: P + 'immeuble-affaires.jpg', alt: "Façade vitrée d'un immeuble d'affaires",
    accroche: "Accompagner l'entreprise dans ses décisions",
    resume: "Nous accompagnons les entreprises, dirigeants et entrepreneurs dans leurs problématiques juridiques et leurs opérations d'affaires.",
    textes: [
      "Les entreprises évoluent dans un environnement où chaque décision peut comporter des implications juridiques.",
      "Nous accompagnons les entreprises, dirigeants et entrepreneurs dans leurs problématiques juridiques liées à leur activité."
    ],
    exergue: "Notre objectif : permettre à nos clients de prendre leurs décisions avec une meilleure compréhension des enjeux juridiques.",
    interventions: ['Conseil juridique aux entreprises', 'Opérations commerciales', "Relations d'affaires",
      'Analyse des risques juridiques', 'Négociation', 'Accompagnement juridique des dirigeants', 'Prévention des différends']
  },
  {
    cle: 'societes', fichier: 'droit-des-societes.html', titre: 'Droit des sociétés', court: 'Sociétés',
    image: P + 'salle-conseil.jpg', alt: 'Salle de conseil',
    accroche: "Sécuriser la vie juridique de l'entreprise",
    resume: 'De la constitution à la gouvernance, nous accompagnons les sociétés dans les différentes étapes de leur vie juridique.',
    textes: [
      "La bonne organisation juridique d'une société constitue un élément essentiel de sa stabilité et de son développement.",
      'Nous accompagnons les sociétés et leurs dirigeants dans les différentes étapes de leur vie juridique.'
    ],
    exergue: 'Une entreprise solide repose également sur une organisation juridique claire et sécurisée.',
    interventions: ['Constitution et organisation des sociétés', 'Fonctionnement des organes sociaux', 'Gouvernance',
      'Relations entre associés', 'Opérations sur le capital', 'Restructuration', 'Difficultés entre associés', 'Conseil aux dirigeants']
  },
  {
    cle: 'contrats', fichier: 'droit-commercial-contrats.html', titre: 'Droit commercial & contrats', court: 'Contrats',
    image: P + 'signature-contrat.jpg', alt: "Signature d'un contrat",
    accroche: "Sécuriser vos relations d'affaires",
    resume: "Nous intervenons dans la rédaction, l'analyse, la négociation et la sécurisation des contrats et relations commerciales.",
    textes: [
      'Le contrat est au cœur de nombreuses relations commerciales.',
      "Un contrat bien conçu permet de clarifier les obligations de chacun, d'anticiper les risques et de réduire les possibilités de conflit."
    ],
    exergue: "Un contrat ne doit pas seulement formaliser une relation. Il doit aussi contribuer à protéger les intérêts de ceux qui s'engagent.",
    interventions: ['Rédaction de contrats', 'Analyse et revue contractuelle', 'Négociation', 'Sécurisation des engagements',
      'Identification des risques', "Accompagnement en cas d'inexécution", 'Gestion des différends contractuels']
  },
  {
    cle: 'contentieux', fichier: 'contentieux.html', titre: 'Contentieux & règlement des différends', court: 'Contentieux',
    image: P + 'hero-colonnes1.jpg', alt: "Colonnade d'un palais de justice",
    accroche: 'Défendre vos intérêts lorsque le différend survient',
    resume: 'Lorsque le conflit survient, nous analysons la situation et développons une stratégie adaptée à la défense des intérêts du client.',
    textes: [
      "Lorsqu'un différend apparaît, la première étape consiste à comprendre précisément les enjeux.",
      'Nous analysons la situation, évaluons les risques et définissons avec le client une stratégie adaptée.'
    ],
    exergue: 'Chaque contentieux mérite une stratégie construite autour des faits, du droit, des preuves et des objectifs du client.',
    interventions: ['Analyse du litige', 'Évaluation des risques', 'Définition de la stratégie', 'Préparation du dossier',
      'Représentation devant les juridictions compétentes', 'Suivi de la procédure', "Accompagnement dans l'exécution des décisions"]
  },
  {
    cle: 'arbitrage', fichier: 'arbitrage-mediation.html', titre: 'Arbitrage & médiation', court: 'Arbitrage',
    image: P + 'art-mediation.jpg', alt: 'Séance de médiation entre deux parties',
    accroche: 'Rechercher la solution la plus adaptée',
    resume: 'Nous accompagnons nos clients dans la recherche de solutions alternatives et adaptées au règlement de leurs différends.',
    textes: [
      "Le contentieux judiciaire n'est pas toujours la seule voie possible.",
      "Selon la nature du différend et les intérêts en présence, la négociation, la médiation ou l'arbitrage peuvent constituer des solutions pertinentes."
    ],
    exergue: 'Lorsque cela est possible, rechercher une solution efficace peut être aussi important que préparer une défense contentieuse.',
    interventions: ['Analyse des possibilités de règlement amiable', 'Négociation', 'Médiation', 'Arbitrage',
      'Stratégie de règlement des différends']
  },
  {
    cle: 'travail', fichier: 'droit-du-travail.html', titre: 'Droit du travail & droit social', court: 'Droit social',
    image: P + 'art-dirigeant.jpg', alt: 'Professionnel en costume',
    accroche: 'Sécuriser les relations professionnelles',
    resume: 'Nous conseillons les employeurs et salariés sur leurs droits, obligations et problématiques liées aux relations professionnelles.',
    textes: [
      'Les relations de travail sont encadrées par des droits et obligations qui doivent être compris et respectés par chacune des parties.'
    ],
    exergue: 'Nous accompagnons les acteurs de la relation professionnelle dans leurs problématiques juridiques.',
    interventions: ['Contrats de travail', 'Relations employeur-salarié', 'Obligations des parties', 'Différends individuels',
      'Différends collectifs', 'Procédures disciplinaires', 'Contentieux sociaux']
  },
  {
    cle: 'conseil', fichier: 'conseil-juridique.html', titre: 'Conseil juridique', court: 'Conseil',
    image: P + 'art-relecture.jpg', alt: "Relecture attentive d'un document",
    accroche: 'Anticiper plutôt que subir',
    resume: "Nous intervenons en amont afin d'identifier les risques, sécuriser les décisions et permettre à nos clients d'agir avec davantage de visibilité.",
    textes: [
      "Le meilleur moment pour identifier un risque juridique est souvent avant qu'il ne devienne un problème.",
      "Nous accompagnons nos clients dans l'analyse de leurs situations et documents afin de leur permettre de prendre des décisions mieux informées."
    ],
    exergue: "Anticiper les risques, c'est déjà protéger ses intérêts.",
    interventions: ['Consultations juridiques', 'Avis juridiques', 'Analyse des risques', 'Revue de documents',
      'Due diligence juridique', 'Accompagnement des dirigeants', 'Problématiques réglementaires']
  }
];

const ENGAGEMENTS = [
  ['Écouter', "Comprendre avant d'agir."],
  ['Analyser', 'Examiner chaque situation avec rigueur.'],
  ['Conseiller', 'Proposer des solutions claires et adaptées.'],
  ['Agir', 'Mettre en œuvre une stratégie cohérente.'],
  ['Défendre', 'Protéger les intérêts de nos clients.']
];

const VALEURS = [
  ['Intégrité', 'Agir avec honnêteté et responsabilité.'],
  ['Excellence', 'Rechercher constamment la qualité dans notre pratique.'],
  ['Confidentialité', 'Protéger les informations qui nous sont confiées.'],
  ['Indépendance', 'Exercer notre profession avec liberté de jugement.'],
  ['Engagement', 'Être pleinement impliqués dans la défense des intérêts de nos clients.']
];

/* Équipe du Cabinet — noms, fonctions et portraits fournis par le client
   (portraits optimisés dans img/equipe/, WebP + repli JPEG). */
const E = 'img/equipe/';
const EQUIPE = [
  { nom: 'Me Clovis METANG NJIKE', role: 'Fondateur et Avocat Associé', groupe: 'Associés',
    photo: E + 'clovis-metang-njike.jpg', lien: 'me-clovis-metang-njike.html' },
  { nom: 'Me Carine Laure NGASSA BAMY', role: 'Avocat Associé', groupe: 'Associés',
    photo: E + 'carine-laure-ngassa-bamy.jpg' },
  { nom: 'Me Aurélien Jaurès TCHAPDA Nkogue', role: 'Avocat Associé', groupe: 'Associés',
    photo: E + 'aurelien-jaures-tchapda-nkogue.jpg' },
  { nom: 'Me Bernadette KOUENJOU NOUGOUE épse SAMEN', role: 'Avocat', groupe: 'Avocats',
    photo: E + 'bernadette-kouenjou-nougoue-samen.jpg' },
  { nom: 'Me Jean Fédol MAMBOU KOAGNE', role: 'Avocat stagiaire', groupe: 'Avocats stagiaires',
    photo: E + 'jean-fedol-mambou-koagne.jpg' },
  { nom: 'Me NKAMA Gomes Rosine Rufine', role: 'Avocat stagiaire', groupe: 'Avocats stagiaires',
    photo: E + 'gomes-rosine-rufine-nkama.jpg' },
  { nom: 'Me Marius Décroly TCHANGAM', role: 'Avocat stagiaire', groupe: 'Avocats stagiaires',
    photo: E + 'marius-decroly-tchangam.jpg' },
  { nom: 'Me Yoann Maël METANG NJIKE', role: 'Avocat stagiaire', groupe: 'Avocats stagiaires',
    photo: E + 'yoann-mael-metang-njike.jpg' },
  { nom: 'Symphorien NGONO MBASSI', role: 'Juriste', groupe: 'Juristes',
    photo: E + 'symphorien-ngono-mbassi.jpg' },
  { nom: 'Sorelle Brithney SANDJONG NANA', role: 'Juriste', groupe: 'Juristes',
    photo: E + 'sorelle-brithney-sandjong-nana.jpg' },
  { nom: 'Aurélia July NOUBOUSSI MBATANG', role: 'Juriste', groupe: 'Juristes',
    photo: E + 'aurelia-july-nouboussi-mbatang.jpg' }
];

module.exports = { DOMAINES, ENGAGEMENTS, VALEURS, EQUIPE, P };
