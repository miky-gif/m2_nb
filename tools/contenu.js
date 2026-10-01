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
    image: P + 'salle-conseil.jpg', alt: 'Avocate au travail dans son bureau',
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
    image: P + 'art-commercial.jpg', alt: 'Document prêt à signer sur un bureau',
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
    image: P + 'art-contentieux.jpg', alt: 'Balance et marteau de juge',
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
    image: P + 'art-arbitrage.jpg', alt: 'Balance et figurines de médiation sur une table',
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
    image: P + 'art-travail.jpg', alt: 'Balance, casque de chantier et convention collective',
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
    image: P + 'art-conseil.jpg', alt: 'Sous-main, stylo et balance devant une baie vitrée',
    accroche: 'Anticiper plutôt que subir',
    resume: "Nous intervenons en amont afin d'identifier les risques, sécuriser les décisions et permettre à nos clients d'agir avec davantage de visibilité.",
    textes: [
      "Le meilleur moment pour identifier un risque juridique est souvent avant qu'il ne devienne un problème.",
      "Nous accompagnons nos clients dans l'analyse de leurs situations et documents afin de leur permettre de prendre des décisions mieux informées."
    ],
    exergue: "Anticiper les risques, c'est déjà protéger ses intérêts.",
    interventions: ['Consultations juridiques', 'Avis juridiques', 'Analyse des risques', 'Revue de documents',
      'Due diligence juridique', 'Accompagnement des dirigeants', 'Problématiques réglementaires']
  },
  {
    cle: 'penal', fichier: 'droit-penal.html', titre: 'Droit pénal général et droit pénal des affaires', court: 'Droit pénal',
    image: P + 'art-penal.jpg', alt: 'Marteau de juge, balance et menottes',
    accroche: 'Vous assister et vous défendre en matière pénale',
    resume: 'Nous accompagnons les personnes et les entreprises dans l’analyse et le traitement des procédures relevant du droit pénal général et des affaires.',
    textes: [
      'Une procédure pénale peut engager des enjeux personnels, professionnels et financiers importants.',
      'Nous aidons nos clients à comprendre leur situation et les accompagnons dans la préparation de leur défense, en droit pénal général comme en droit pénal des affaires.'
    ],
    exergue: 'Chaque dossier pénal demande une analyse rigoureuse des faits, de la procédure et des intérêts en jeu.',
    interventions: ['Consultations en droit pénal', 'Assistance au cours des procédures pénales', 'Défense des personnes mises en cause',
      'Droit pénal des affaires', 'Analyse des risques pénaux', 'Préparation des dossiers et des recours']
  },
  {
    cle: 'administratif', fichier: 'contentieux-administratif.html', titre: 'Contentieux administratif', court: 'Administratif',
    image: P + 'art-administratif.jpg', alt: 'Codes de droit administratif et statue de la Justice',
    accroche: 'Défendre vos droits dans vos litiges avec l’administration',
    resume: 'Nous conseillons et assistons les personnes et les organisations confrontées à une décision ou à un différend administratif.',
    textes: [
      'Les relations avec l’administration peuvent soulever des questions complexes et avoir des conséquences importantes.',
      'Nous analysons les décisions contestées, les démarches déjà entreprises et les voies de recours envisageables afin de définir une stratégie adaptée.'
    ],
    exergue: 'La défense en contentieux administratif s’appuie sur une lecture attentive des décisions, des délais et des règles applicables.',
    interventions: ['Analyse des décisions administratives', 'Conseil sur les recours possibles', 'Préparation des recours administratifs',
      'Contentieux devant les juridictions administratives', 'Représentation et suivi des procédures', 'Exécution des décisions']
  },
  {
    cle: 'foncier', fichier: 'droit-foncier.html', titre: 'Droit foncier', court: 'Foncier',
    image: P + 'art-foncier.jpg', alt: 'Plan cadastral déplié sur une table',
    accroche: 'Sécuriser vos droits et opérations foncières',
    resume: 'Nous accompagnons les particuliers et les organisations dans leurs démarches et différends liés aux biens fonciers.',
    textes: [
      'Les opérations foncières nécessitent une vérification attentive des documents et de la situation juridique du bien.',
      'Nous conseillons nos clients dans leurs démarches foncières et les assistons lorsque leurs droits ou leurs projets font l’objet d’un différend.'
    ],
    exergue: 'Une analyse rigoureuse des titres, des actes et de la situation du bien aide à anticiper les difficultés foncières.',
    interventions: ['Analyse des titres et documents fonciers', 'Conseil lors des opérations foncières', 'Sécurisation des actes',
      'Prévention et règlement des litiges fonciers', 'Assistance dans les procédures liées aux biens immobiliers']
  },
  {
    cle: 'civil-famille', fichier: 'droit-civil-famille.html', titre: 'Droit civil et droit de la famille', court: 'Civil et famille',
    image: P + 'art-famille.jpg', alt: 'Deux fauteuils vides face à un bureau',
    accroche: 'Vous accompagner dans vos démarches civiles et familiales',
    resume: 'Nous conseillons et assistons nos clients dans les situations relevant du droit civil et du droit de la famille.',
    textes: [
      'Les questions civiles et familiales touchent aux droits, aux obligations et aux relations personnelles de chacun.',
      'Nous écoutons la situation de nos clients, clarifions les règles applicables et les accompagnons dans la recherche d’une réponse adaptée.'
    ],
    exergue: 'Chaque situation mérite une approche attentive, respectueuse des personnes et adaptée aux enjeux du dossier.',
    interventions: ['Conseil en droit civil', 'Droit de la famille et des personnes', 'Questions matrimoniales',
      'Successions', 'Rédaction et analyse d’actes', 'Accompagnement dans les différends civils et familiaux']
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
const { EQUIPE } = require('./equipe.js');

module.exports = { DOMAINES, ENGAGEMENTS, VALEURS, EQUIPE, P };
