/* Module de traduction français → anglais.
   ---------------------------------------------------------------------------
   Les pages anglaises sont produites à partir des pages françaises :
   - les contenus métier sont appariés automatiquement entre contenu.js et
     contenu-en.js (domaines, engagements, valeurs, fonctions de l'équipe) ;
   - les textes d'interface sont listés dans INTERFACE ci-dessous.
   La génération échoue si une chaîne française subsiste dans une page anglaise
   (contrôle dans build.js), ce qui rend toute omission impossible à ignorer. */

const FR = require('./contenu.js');
const EN = require('./contenu-en.js');

/* ------------------------------------------- contenus appariés (auto) ----- */
function pairesContenu() {
  const p = [];
  /* Le « & » des titres s'écrit « &amp; » dans le HTML : on enregistre les deux formes. */
  const brut = s => s.replace(/&amp;/g, '&');
  const html = s => brut(s).replace(/&/g, '&amp;');
  const aj = (a, b) => {
    if (!a || !b) return;
    if (brut(a) !== brut(b)) p.push([brut(a), brut(b)]);
    if (html(a) !== html(b)) p.push([html(a), html(b)]);
  };

  FR.DOMAINES.forEach((d, i) => {
    const e = EN.DOMAINES[i];
    aj(d.titre, e.titre);
    aj(d.accroche, e.accroche);
    aj(d.resume, e.resume);
    aj(d.exergue, e.exergue);
    aj(d.alt, e.alt);
    d.textes.forEach((x, j) => aj(x, e.textes[j]));
    d.interventions.forEach((x, j) => aj(x, e.interventions[j]));
    aj(d.titre.toLowerCase(), e.titre.toLowerCase());
  });
  FR.ENGAGEMENTS.forEach(([v, ph], i) => { aj(v, EN.ENGAGEMENTS[i][0]); aj(ph, EN.ENGAGEMENTS[i][1]); });
  FR.VALEURS.forEach(([v, ph], i) => { aj(v, EN.VALEURS[i][0]); aj(ph, EN.VALEURS[i][1]); });
  FR.EQUIPE.forEach((m, i) => {
    const e = EN.EQUIPE[i];
    aj(m.role, e.role);
    aj(m.groupe, e.groupe);
    aj(m.accroche, e.accroche);
    aj(m.titreHtml, e.titreHtml);
    m.bio.forEach((x, j) => aj(x, e.bio[j]));
    m.domaines.forEach((x, j) => aj(x, e.domaines[j]));
    m.faits.forEach(([cle, valeur], j) => { aj(cle, e.faits[j][0]); aj(valeur, e.faits[j][1]); });
    /* description de la page, construite à partir de la biographie */
    aj(`${m.role} — ${m.accroche}. ${m.bio[0].slice(0, 120)}…`, `${e.role} — ${e.accroche}. ${e.bio[0].slice(0, 120)}…`);
    aj(`${m.nom} — M2NB & Partners Law Firm`, `${e.nom} — M2NB & Partners Law Firm`);
    aj('Notre équipe · ' + m.role, 'Our Team · ' + e.role);
  });

  /* Phrase d'introduction des interventions, construite à partir du titre du domaine */
  FR.DOMAINES.forEach((d, i) => {
    const e = EN.DOMAINES[i];
    const n = d.interventions.length;
    aj(`${n} axes d’intervention en ${d.titre.toLowerCase()}, mobilisés selon la nature de votre situation.`,
       `${n} areas of work in ${e.titre.toLowerCase()}, applied according to the nature of your situation.`);
  });
  return p;
}

/* --------------------------------------------- textes d'interface --------- */
const INTERFACE = [
  /* --- Titres composés (texte + italiques) : traduits en un seul bloc ------ */
  ['Votre partenaire juridique pour <em>décider,</em> <em>sécuriser</em> et <em>défendre.</em>',
    'Your legal partner to <em>decide,</em> <em>secure</em> and <em>defend.</em>'],
  ['Conseil, assistance et <em>représentation</em> juridique.', 'Legal advice, assistance and <em>representation</em>.'],
  ['Des professionnels <em>engagés</em> à vos côtés.', 'Professionals <em>committed</em> to serving your interests.'],
  ['Des professionnels <em>engagés</em> à vos côtés', 'Professionals <em>committed</em> to serving your interests'],
  ['Une expertise juridique <em>au service</em> de vos intérêts', 'Legal expertise <em>serving</em> your interests'],
  ['Sept domaines, <em>une même exigence</em>', 'Seven practice areas, <em>one standard</em>'],
  ["L'expérience <em>au service</em> de la confiance", 'Experience <em>built</em> on trust'],
  ['Cinq exigences, <em>une méthode</em>', 'Five commitments, <em>one method</em>'],
  ['Une relation fondée sur <em>la confiance</em>', 'A relationship built on <em>trust</em>'],
  ['Votre situation mérite une <em>analyse juridique.</em>', 'Your situation deserves a <em>legal analysis.</em>'],
  ['Une pratique fondée sur <em>l’expérience</em> et la confiance', 'A legal practice built on <em>experience</em> and trust'],
  ['Le droit doit permettre à nos clients de <em>mieux comprendre</em> leur situation, de <em>maîtriser</em> leurs risques et de prendre de <em>meilleures décisions.</em>',
    'The law should enable our clients to <em>better understand</em> their situation, <em>manage</em> their risks and make <em>better decisions.</em>'],
  ['Cinq principes qui <em>guident</em> notre pratique', 'Five principles that <em>guide</em> our practice'],
  ['De l’écoute <em>à la défense</em>', 'From listening <em>to defense</em>'],
  ['Des solutions juridiques <em>adaptées</em> à vos enjeux', 'Legal solutions <em>tailored</em> to your needs'],
  ['Sept expertises, <em>une même exigence</em>', 'Seven areas of practice, <em>one standard</em>'],
  ['Ce que nous faisons <em>pour vous</em>', 'What we do <em>for you</em>'],
  ['Poursuivre <em>l’exploration</em>', 'Continue <em>exploring</em>'],
  ['Une équipe, <em>un même cap</em>', 'One team, <em>one direction</em>'],
  ['Me Clovis <em>METANG NJIKE</em>', 'Me Clovis <em>METANG NJIKE</em>'],
  ['Plus de <em>deux décennies</em> de conseil, d’assistance et de défense.',
    'More than <em>two decades</em> of legal advice, assistance and defense.'],
  ['Une expérience construite <em>dans la pratique</em>', 'Experience built <em>through practice</em>'],
  ['Depuis 2001, <em>au Cameroun</em>', 'Since 2001, <em>in Cameroon</em>'],
  ['La confiance <em>se protège</em>', 'Trust <em>must be protected</em>'],
  ['Analyses et <em>actualités</em> juridiques', 'Legal <em>news</em> and insights'],
  ['Recevez nos analyses <em>et actualités</em> juridiques.', 'Receive our legal analyses <em>and updates</em>.'],
  ['Parlons de <em>votre situation</em>', "Let's discuss <em>your situation</em>"],
  ['Une relation <em>durable</em>', 'A <em>lasting</em> relationship'],
  ['Un accompagnement <em>orienté solutions</em>', 'Solution-oriented <em>legal support</em>'],
  ['<span class="associe__nom">Me Clovis METANG NJIKE</span>, avocat au Barreau du Cameroun, exerce à Yaoundé depuis plus de deux décennies.',
    '<span class="associe__nom">Me Clovis METANG NJIKE</span>, Attorney-at-Law at the Cameroon Bar, has been practicing in Yaoundé for more than two decades.'],
  ['11 professionnels<br>engagés à vos côtés', '11 professionals<br>committed to your interests'],

  /* --- En-tête, navigation, pied de page ---------------------------------- */
  ['Aller au contenu', 'Skip to content'],
  ['Navigation principale', 'Main navigation'],
  ['Accueil', 'Home'],
  ['Le cabinet', 'The Firm'],
  ['Nos services', 'Our Services'],
  ['Notre équipe', 'Our Team'],
  ['Nos références', 'Our References'],
  ['Actualités', 'News &amp; Insights'],
  ['Contact', 'Contact'],
  ['Rendez-vous', 'Appointment'],
  ['Prendre rendez-vous', 'Book an appointment'],
  ['Nous contacter', 'Contact us'],
  ['M2NB &amp; Partners Law Firm — accueil', 'M2NB &amp; Partners Law Firm — home'],
  ['Yaoundé, Cameroun', 'Yaoundé, Cameroon'],
  ['Avocat au Barreau du Cameroun', 'Attorney-at-Law at the Cameroon Bar'],
  ['Conseil · Assistance · Représentation', 'Advisory · Assistance · Representation'],
  ['Ouvrir le menu', 'Open the menu'],
  ['Fermer le menu', 'Close the menu'],
  ['Menu', 'Menu'],
  ['M2NB &amp; Partners Law Firm — Yaoundé, Cameroun', 'M2NB &amp; Partners Law Firm — Yaoundé, Cameroon'],
  ['Domaines d’intervention', 'Practice areas'],
  ["Domaines d'intervention", 'Practice areas'],
  ['Domaines', 'Practice areas'],
  ["Cabinet d'avocats établi à Yaoundé, au Cameroun. Conseil, assistance et représentation juridique.",
    'Legal Expertise. Strategic Advice. Defense of Your Interests.'],
  ['M2NB &amp; Partners Law Firm. Tous droits réservés.', 'M2NB &amp; Partners Law Firm. All rights reserved.'],
  ['Informations légales', 'Legal information'],
  ['Mentions légales', 'Legal notice'],
  ['Confidentialité', 'Confidentiality'],
  ['Haut de page', 'Back to top'],
  ['Choisir la langue — langue actuelle : français', 'Choose a language — current language: English'],
  ['Fil d’Ariane', 'Breadcrumb'],
  ["Fil d'Ariane", 'Breadcrumb'],

  /* --- Accueil ------------------------------------------------------------ */
  ["Cabinet d'avocats · Yaoundé, Cameroun", 'Law firm · Yaoundé, Cameroon'],
  ['M2NB &amp; Partners Law Firm accompagne les entreprises, dirigeants, entrepreneurs, institutions et particuliers dans leurs enjeux juridiques, commerciaux et contentieux.',
    'M2NB &amp; Partners Law Firm assists companies, executives, entrepreneurs, institutions and individuals with their legal, commercial and litigation matters.'],
  ['Découvrir le cabinet', 'Discover the firm'],
  ['Découvrir notre équipe', 'Discover our team'],
  ['Voir tous nos services', 'See all our services'],
  ['Sept domaines, une même exigence : transformer la complexité juridique en solutions compréhensibles, structurées et adaptées à vos objectifs.',
    'Seven practice areas, one standard: transforming legal complexity into clear, structured solutions tailored to your objectives.'],
  ['Me Clovis METANG NJIKE, avocat au Barreau du Cameroun, exerce à Yaoundé depuis plus de deux décennies.',
    'Me Clovis METANG NJIKE, Attorney-at-Law at the Cameroon Bar, has been practicing in Yaoundé for more than two decades.'],
  ['Présentation du cabinet', 'Firm presentation'],
  ['carrousel', 'carousel'],
  ['diapositive', 'slide'],
  ['1 sur 3 : Le cabinet', '1 of 3: The Firm'],
  ['2 sur 3 : Nos domaines', '2 of 3: Our practice areas'],
  ['3 sur 3 : Notre équipe', '3 of 3: Our Team'],
  ['Afficher la diapositive 1 : Le cabinet', 'Show slide 1: The Firm'],
  ['Afficher la diapositive 2 : Nos domaines', 'Show slide 2: Our practice areas'],
  ['Afficher la diapositive 3 : Notre équipe', 'Show slide 3: Our Team'],
  ['Diapositive précédente', 'Previous slide'],
  ['Diapositive suivante', 'Next slide'],
  ['Nos domaines', 'Our practice areas'],
  ['Le cabinet en chiffres', 'The firm in figures'],
  ['Années de pratique professionnelle', 'Years of professional practice'],
  ['années de pratique professionnelle', 'years of professional practice'],
  ["Domaines d'intervention", 'Practice areas'],
  ['Prestation de serment', 'Admitted to the Bar'],
  ['Cabinet établi au Cameroun', 'Law firm based in Cameroon'],
  ['Années', 'Years'],
  ['M2NB &amp; Partners Law Firm est un cabinet d\'avocats établi à Yaoundé, au Cameroun. Le Cabinet accompagne ses clients dans leurs besoins de conseil, d\'assistance et de représentation juridique.',
    'M2NB &amp; Partners Law Firm is a law firm based in Yaoundé, Cameroon. The Firm assists its clients with their legal advisory, assistance and representation needs.'],
  ['Notre clientèle comprend notamment des entreprises, dirigeants, entrepreneurs, institutions et particuliers confrontés à des problématiques juridiques nécessitant une analyse rigoureuse et une réponse adaptée.',
    'Our clients include companies, executives, entrepreneurs, institutions and individuals facing legal matters requiring rigorous analysis and an appropriate response.'],
  ['Comprendre', 'Understand'],
  ['Conseiller', 'Advise'],
  ['Défendre', 'Defend'],
  ['Nous commençons par comprendre votre situation, vos objectifs et vos contraintes.',
    'We begin by understanding your situation, objectives and constraints.'],
  ['Nous transformons la complexité juridique en recommandations claires et adaptées.',
    'We transform legal complexity into clear and appropriate recommendations.'],
  ['Lorsque vos intérêts sont en jeu, nous mettons notre expertise au service de votre défense.',
    'When your interests are at stake, we put our expertise at the service of your defense.'],
  ["Du conseil en amont à la défense contentieuse, chaque domaine est traité avec la même rigueur d'analyse et le même souci de la décision éclairée.",
    'From upstream advice to litigation defense, every practice area is handled with the same rigorous analysis and the same concern for informed decisions.'],
  ['Notre conviction', 'Our conviction'],
  ['Un bon conseil juridique ne consiste pas uniquement à expliquer la règle de droit.',
    'Good legal advice is not merely about explaining the law.'],
  ['Il doit permettre au client de comprendre sa situation, identifier ses risques, évaluer ses options et prendre une décision éclairée.',
    'It should enable the client to understand their situation, identify their risks, assess their options and make informed decisions.'],
  ["Ayant prêté serment en 2001, il a développé une pratique professionnelle dans le conseil, l'assistance et la défense des intérêts de ses clients. Son parcours comprend notamment des interventions dans différents dossiers devant les juridictions camerounaises.",
    "Having been admitted to the Bar in 2001, he has developed professional experience in legal advisory, assistance and the defense of his clients' interests. His professional practice includes involvement in various matters before the Cameroonian courts."],
  ['Cette expérience nourrit une approche fondée sur la rigueur, la stratégie et la compréhension concrète des enjeux auxquels sont confrontés les clients du Cabinet.',
    "This experience supports an approach based on rigor, strategy and a practical understanding of the challenges faced by the Firm's clients."],
  ['Nos engagements', 'Our commitments'],
  ['Notre relation client', 'Our client relationship'],
  ['Écoute', 'Listening'],
  ['Rigueur', 'Rigor'],
  ['Indépendance', 'Independence'],
  ['Engagement', 'Commitment'],
  ['La relation entre un avocat et son client repose avant tout sur la confiance.',
    'The relationship between a lawyer and their client is first and foremost built on trust.'],
  ['Ces principes guident notre manière de travailler et constituent le socle de notre relation avec chaque client.',
    'These principles guide the way we work and form the foundation of our relationship with every client.'],
  ['Une question juridique, un contrat, un différend ou une décision importante ? Parlons de votre situation.',
    "A legal question, a contract, a dispute or an important decision? Let's discuss your situation."],
  ['Statue de la Justice tenant la balance et le glaive', 'Statue of Justice holding the scales and sword'],
  ['Salle de réunion du cabinet', 'Meeting room of the firm'],
  ['Poignée de main entre un avocat et un client', 'Handshake between a lawyer and a client'],
  ["Signature d'un contrat", 'Signing a contract'],

  /* --- Le cabinet --------------------------------------------------------- */
  ['M2NB &amp; Partners Law Firm est un cabinet d’avocats établi à Yaoundé, au Cameroun. Le Cabinet accompagne ses clients dans leurs besoins de conseil, d’assistance et de représentation juridique.',
    'M2NB &amp; Partners Law Firm is a law firm based in Yaoundé, Cameroon. The Firm assists its clients with their legal advisory, assistance and representation needs.'],
  ['Nous intervenons auprès de particuliers, d’entreprises, d’entrepreneurs et, selon la nature des missions, d’organisations et d’institutions.',
    'We advise individuals, companies, entrepreneurs and, depending on the nature of the assignment, organizations and institutions.'],
  ['Notre approche', 'Our approach'],
  ['Notre approche repose sur une conviction simple :', 'Our approach is based on a simple conviction:'],
  ['Notre mission', 'Our mission'],
  ['Notre vision', 'Our vision'],
  ['Nos valeurs', 'Our values'],
  ['Notre méthode', 'Our method'],
  ['Apporter à nos clients un accompagnement juridique rigoureux, professionnel et orienté vers les solutions.',
    'Our mission is to provide our clients with rigorous, professional and solution-oriented legal support.'],
  ['Nous intervenons aussi bien dans une logique de prévention et de conseil que dans la gestion et la résolution des différends.',
    'We assist our clients both in prevention and advisory matters and in the management and resolution of disputes.'],
  ['Notre ambition est de construire avec chaque client une relation fondée sur la confiance, la disponibilité et la qualité du conseil.',
    'Our ambition is to build with each client a relationship based on trust, availability and quality legal advice.'],
  ['Construire une relation durable fondée sur la confiance.', 'Building a lasting relationship based on trust.'],
  ['M2NB &amp; Partners Law Firm ambitionne de développer une pratique juridique reconnue pour la qualité de son conseil, son intégrité professionnelle et son engagement auprès de ses clients.',
    'M2NB &amp; Partners Law Firm aims to develop a legal practice recognized for the quality of its advice, professional integrity and commitment to its clients.'],
  ['Nous souhaitons être présents non seulement lorsque le problème survient, mais également lorsque le client souhaite anticiper, structurer et sécuriser ses décisions.',
    'We seek to be present not only when a problem arises, but also when a client wishes to anticipate, structure and secure their decisions.'],
  ['Chaque dossier suit un chemin exigeant, du premier échange à la protection effective de vos intérêts.',
    'Every matter follows a demanding path, from the first conversation to the effective protection of your interests.'],
  ['Bibliothèque juridique du cabinet', 'Legal library of the firm'],

  /* --- Services et pages de domaines -------------------------------------- */
  ['Le droit accompagne chaque étape de la vie d’une entreprise, d’une organisation ou d’un particulier.',
    'The law plays a role at every stage of the life of a company, organization or individual.'],
  ['Notre rôle est de transformer la complexité juridique en solutions compréhensibles, structurées et adaptées à vos objectifs.',
    'Our role is to transform legal complexity into clear, structured solutions tailored to your objectives.'],
  ['Survolez un domaine pour en découvrir l’essentiel, puis ouvrez sa fiche pour le détail de nos interventions.',
    'Hover over a practice area for the essentials, then open its page for the detail of our services.'],
  ['Nos interventions', 'Our services include'],
  ['Autres domaines', 'Other practice areas'],
  ['Domaines précédents', 'Previous practice areas'],
  ['Domaines suivants', 'Next practice areas'],
  ['En savoir plus', 'Learn more'],
  ['Nos services · 01 / 07', 'Our Services · 01 / 07'],
  ['Nos services · 02 / 07', 'Our Services · 02 / 07'],
  ['Nos services · 03 / 07', 'Our Services · 03 / 07'],
  ['Nos services · 04 / 07', 'Our Services · 04 / 07'],
  ['Nos services · 05 / 07', 'Our Services · 05 / 07'],
  ['Nos services · 06 / 07', 'Our Services · 06 / 07'],
  ['Nos services · 07 / 07', 'Our Services · 07 / 07'],
  ['Quartier d’affaires', 'Business district'],
  ['Salle de conseil', 'Boardroom'],
  ['Colonnade d’un palais de justice', 'Colonnade of a courthouse'],
  ['Séance de médiation', 'Mediation session'],
  ['Relations professionnelles en entreprise', 'Workplace relationships'],
  ['Relecture d’un document juridique', 'Review of a legal document'],

  /* --- Équipe ------------------------------------------------------------- */
  ['La qualité d’un cabinet repose avant tout sur les professionnels qui le composent.',
    'The quality of a law firm rests first and foremost on the professionals who make it up.'],
  ['M2NB &amp; Partners Law Firm réunit des professionnels partageant une même exigence : rigueur, engagement, confidentialité et qualité du conseil.',
    'M2NB &amp; Partners Law Firm brings together professionals who share the same standards of rigor, commitment, confidentiality and quality legal advice.'],
  ['Les membres', 'The members'],
  ['Les portraits défilent automatiquement&nbsp;; le défilement se met en pause au survol. Vous pouvez aussi naviguer avec les flèches ou en faisant glisser.',
    'The portraits scroll automatically and pause on hover. You can also use the arrows or drag them.'],
  ['Une même exigence : rigueur, engagement, confidentialité et qualité du conseil.',
    'One standard: rigor, commitment, confidentiality and quality legal advice.'],
  ['Voir le profil', 'View profile'],
  ['Profil à venir', 'Profile coming soon'],
  ['Membres précédents', 'Previous members'],
  ['Membres suivants', 'Next members'],
  ['Portrait de ', 'Portrait of '],

  ['Autres membres', 'Other members'],
  ['Poursuivre <em>la découverte</em>', 'Continue <em>exploring</em> the team'],
  ['Toute l’équipe', 'The whole team'],

  /* --- Fiche du fondateur -------------------------------------------------- */
  ['Notre équipe · Fondateur', 'Our Team · Founding Partner'],
  ['Avocat au Barreau du Cameroun, il exerce à Yaoundé. Il a prêté serment le 16 novembre 2001.',
    'Attorney-at-Law at the Cameroon Bar, he practices in Yaoundé. He was admitted to the Bar on November 16, 2001.'],
  ['Parcours', 'Background'],
  ['Me Clovis METANG NJIKE est avocat au Barreau du Cameroun et exerce à Yaoundé. Il a prêté serment le 16 novembre 2001.',
    'Me Clovis METANG NJIKE is an Attorney-at-Law at the Cameroon Bar and practices in Yaoundé. He was admitted to the Bar on November 16, 2001.'],
  ['Au cours de sa pratique professionnelle, il a développé une expérience dans le conseil juridique, l’assistance, la représentation et la défense des intérêts de ses clients.',
    "Throughout his professional practice, he has developed experience in legal advisory, assistance, representation and the defense of his clients' interests."],
  ['Son nom apparaît notamment dans plusieurs publications officielles de la Cour suprême du Cameroun en qualité de conseil dans différents dossiers.',
    'His name also appears in several official publications of the Supreme Court of Cameroon in his capacity as counsel in various matters.'],
  ['Barreau', 'Bar'],
  ['Cameroun', 'Cameroon'],
  ['Exercice', 'Practice'],
  ['16 novembre 2001', 'November 16, 2001'],
  ['Fonction', 'Position'],
  ['Droit commercial', 'Commercial Law'],
  ['Droit social', 'Employment &amp; Labor Law'],
  ['Contentieux', 'Litigation'],
  ['À compléter avant mise en ligne', 'To be completed before publication'],
  ['Formation', 'Education'],
  ['Diplômes', 'Degrees'],
  ['Affiliations professionnelles', 'Professional affiliations'],
  ['Langues', 'Languages'],
  ['Autres membres de l’équipe', 'Other members of the team'],
  ['Photographies professionnelles', 'Professional photographs'],
  ["Bureau d'avocat", "Lawyer's office"],

  /* --- Références ---------------------------------------------------------- */
  ['L’expérience d’un cabinet ne se mesure pas uniquement au nombre de dossiers traités.',
    'The experience of a law firm is not measured solely by the number of cases handled.'],
  ['Elle se construit au fil des années, des situations rencontrées, des stratégies développées et de la confiance accordée par les clients.',
    'It is built over the years through the situations encountered, strategies developed and trust placed in the firm by its clients.'],
  ['Expérience', 'Experience'],
  ['Me Clovis METANG NJIKE a prêté serment en 2001 et exerce depuis lors la profession d’avocat au Cameroun.',
    'Me Clovis METANG NJIKE was admitted to the Bar in 2001 and has practiced law in Cameroon ever since.'],
  ['Au cours de sa pratique, il est intervenu dans différents dossiers devant les juridictions camerounaises. Cette section pourra présenter certaines expériences publiques sous une forme permettant de mettre en évidence :',
    'Throughout his practice, he has been involved in various matters before the Cameroonian courts. This section may present selected public experiences in a format highlighting:'],
  ['Le contexte', 'The context'],
  ['L’enjeu juridique', 'The legal issue'],
  ['Notre intervention', 'Our intervention'],
  ['L’approche', 'The approach'],
  ['Le résultat', 'The outcome'],
  ['Modèle de case study', 'Case study template'],
  ['Cas 01 — [Titre du dossier]', 'Case 01 — [Case title]'],
  ['Secteur : [À compléter]', 'Sector: [To be completed]'],
  ['Problématique', 'Issue'],
  ['[Description synthétique de la situation.]', '[Brief description of the situation.]'],
  ['[Description de l’intervention du Cabinet.]', "[Description of the Firm's intervention.]"],
  ['Approche adoptée', 'Approach adopted'],
  ['[Description de la stratégie.]', '[Description of the strategy.]'],
  ['Résultat / situation', 'Outcome / status'],
  ['[À publier uniquement si autorisé.]', '[To be published only where authorized.]'],
  ['La relation entre l’avocat et son client repose sur la confiance et la confidentialité.',
    'The relationship between a lawyer and their client is based on trust and confidentiality.'],
  ['M2NB &amp; Partners Law Firm ne publie pas systématiquement l’identité de ses clients, le contenu des dossiers ou les stratégies développées dans le cadre des missions qui lui sont confiées.',
    'M2NB &amp; Partners Law Firm does not systematically publish the identity of its clients, the content of cases or the strategies developed in the course of the assignments entrusted to it.'],
  ['Les références éventuellement présentées sur ce site sont publiées uniquement lorsqu’elles peuvent l’être de manière appropriée et après validation du Cabinet.',
    'Any references presented on this website will only be published where this can be done appropriately and following approval by the Firm.'],
  ['Bibliothèque juridique', 'Legal library'],

  /* --- Actualités ---------------------------------------------------------- */
  ['Cette section accueillera les analyses, notes juridiques et actualités publiées par le Cabinet.',
    'The law evolves alongside the economy, businesses and society.'],
  ['Contenu à fournir : titres, dates et textes des publications.',
    'Through its publications, M2NB &amp; Partners Law Firm shares analyses and information intended to help executives, entrepreneurs, professionals and individuals better understand certain legal issues.'],
  ['À la une', 'Featured'],
  ['[Catégorie]', '[Category]'],
  ['[Date]', '[Date]'],
  ['[Titre de la publication 1]', '[Title of publication 1]'],
  ['[Titre de la publication 2]', '[Title of publication 2]'],
  ['[Titre de la publication 3]', '[Title of publication 3]'],
  ['[Chapeau de l’article — deux à trois lignes présentant l’analyse.]',
    '[Article standfirst — two or three lines introducing the analysis.]'],
  ['Lire l’article', 'Read the article'],
  ['Lettre d’information', 'Newsletter'],
  ['Votre adresse e-mail', 'Your email address'],
  ['S’inscrire', 'Subscribe'],
  ['Documents contractuels', 'Contract documents'],
  ['Loupe posée sur un ouvrage juridique', 'Magnifying glass resting on a legal book'],
  ['Marteau de juge', "Judge's gavel"],

  /* --- Contact ------------------------------------------------------------- */
  ['Vous êtes confronté à une question juridique, un différend, une opération commerciale ou une décision nécessitant un accompagnement professionnel ?',
    'Are you facing a legal question, a dispute, a commercial transaction or a decision requiring professional legal assistance?'],
  ['Notre équipe est à votre écoute.', 'Our team is here to listen.'],
  ['Coordonnées', 'Contact details'],
  ['Ville', 'City'],
  ['Adresse', 'Address'],
  ['Téléphone', 'Phone'],
  ['E-mail', 'Email'],
  ['[À confirmer]', '[To be confirmed]'],
  ['Formulaire de contact', 'Contact form'],
  ['Écrivez-nous', 'Write to us'],
  ['Nom et prénom *', 'Full name *'],
  ['Entreprise / Organisation', 'Company / Organization'],
  ['E-mail *', 'Email *'],
  ['Objet *', 'Subject *'],
  ['Votre message *', 'Your message *'],
  ['Envoyer ma demande', 'Send your request'],
  ['Les champs marqués d’un astérisque sont obligatoires. Ce premier contact ne crée pas de relation avocat-client et n’interrompt aucun délai.',
    'Fields marked with an asterisk are required. This initial contact does not create a lawyer-client relationship and does not interrupt any time limit.'],
  ['Immeuble de bureaux — accès au cabinet', 'Office building — access to the firm'],

  /* --- Pages légales -------------------------------------------------------- */
  ['Informations', 'Information'],
  ['Les informations ci-dessous concernent l’éditeur du présent site et les conditions de son utilisation.',
    'The information below concerns the publisher of this website and the conditions governing its use.'],
  ['Sommaire', 'Contents'],
  ['Éditeur du site', 'Website publisher'],
  ['— cabinet d’avocats établi à Yaoundé, au Cameroun.', '— a law firm based in Yaoundé, Cameroon.'],
  ['Forme juridique&nbsp;:', 'Legal form:'],
  ['Adresse du siège&nbsp;:', 'Registered office:'],
  ['Téléphone&nbsp;:', 'Phone:'],
  ['Adresse électronique&nbsp;:', 'Email address:'],
  ['Numéro d’identifiant unique / registre&nbsp;:', 'Unique identification / registration number:'],
  ['[À COMPLÉTER]', '[TO BE COMPLETED]'],
  ['Directeur de la publication', 'Publication director'],
  ['Me Clovis METANG NJIKE, avocat au Barreau du Cameroun, fondateur et avocat associé.',
    'Me Clovis METANG NJIKE, Attorney-at-Law at the Cameroon Bar, founding partner.'],
  ['Profession réglementée', 'Regulated profession'],
  ['Les avocats du Cabinet sont inscrits au Barreau du Cameroun et exercent dans le respect des règles professionnelles applicables à la profession d’avocat, notamment en matière de déontologie, de secret professionnel et de conflits d’intérêts.',
    'The lawyers of the Firm are admitted to the Cameroon Bar and practice in compliance with the professional rules applicable to the legal profession, in particular regarding ethics, professional secrecy and conflicts of interest.'],
  ['Hébergement', 'Hosting'],
  ['Le site est hébergé par&nbsp;:', 'The website is hosted by:'],
  ['[À COMPLÉTER — nom, adresse et contact de l’hébergeur]', '[TO BE COMPLETED — name, address and contact details of the host]'],
  ['Propriété intellectuelle', 'Intellectual property'],
  ['L’ensemble des contenus du site (textes, identité visuelle, photographies, mise en page) est protégé. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable du Cabinet est interdite.',
    'All content on this website (texts, visual identity, photographs, layout) is protected. Any reproduction or representation, in whole or in part, without the prior written authorization of the Firm is prohibited.'],
  ['Les photographies d’illustration proviennent d’Unsplash et sont utilisées conformément à la licence de cette plateforme&nbsp;; le détail des crédits figure dans le fichier',
    'The illustrative photographs come from Unsplash and are used in accordance with that platform’s licence; the detailed credits are listed in the file'],
  ['Portée des informations publiées', 'Scope of the information published'],
  ['Les informations diffusées sur ce site ont une vocation générale d’information. Elles ne constituent ni une consultation juridique, ni un avis adapté à une situation particulière, et ne sauraient s’y substituer.',
    'The information published on this website is of a general nature. It constitutes neither legal advice nor an opinion tailored to a particular situation, and cannot replace either.'],
  ['La consultation du site ou l’envoi d’un message via le formulaire de contact ne crée aucune relation avocat-client et n’interrompt aucun délai de procédure ou de prescription.',
    'Browsing this website or sending a message through the contact form creates no lawyer-client relationship and interrupts no procedural or limitation period.'],
  ['Liens hypertextes', 'Hyperlinks'],
  ['Le Cabinet n’exerce aucun contrôle sur les sites tiers accessibles depuis ce site et décline toute responsabilité quant à leur contenu.',
    'The Firm exercises no control over third-party websites accessible from this site and accepts no responsibility for their content.'],
  ['Pour toute question relative au site&nbsp;:', 'For any question regarding this website:'],
  ['formulaire de contact', 'contact form'],
  ['Dernière mise à jour :', 'Last updated:'],
  ['Données personnelles', 'Personal data'],
  ['Politique de confidentialité', 'Privacy policy'],
  ['Le Cabinet accorde une importance particulière à la protection des informations qui lui sont confiées.',
    'The Firm attaches particular importance to protecting the information entrusted to it.'],
  ['Responsable du traitement', 'Data controller'],
  ['M2NB &amp; Partners Law Firm, Yaoundé, Cameroun — contact&nbsp;:', 'M2NB &amp; Partners Law Firm, Yaoundé, Cameroon — contact:'],
  ['Données collectées', 'Data collected'],
  ['Seules les données que vous transmettez volontairement via le formulaire de contact sont collectées&nbsp;: nom et prénom, entreprise ou organisation, numéro de téléphone, adresse électronique, objet et contenu de votre message.',
    'Only the data you voluntarily provide through the contact form is collected: full name, company or organization, telephone number, email address, subject and content of your message.'],
  ['Aucun profilage, aucune revente et aucune prospection commerciale ne sont réalisés à partir de ces données.',
    'No profiling, resale or commercial prospecting is carried out on the basis of this data.'],
  ['Finalités', 'Purposes'],
  ['Répondre à votre demande et, le cas échéant, organiser un rendez-vous&nbsp;;', 'Respond to your request and, where appropriate, arrange an appointment;'],
  ['vérifier l’absence de conflit d’intérêts avant toute prise en charge&nbsp;;', 'check for the absence of conflicts of interest before accepting a matter;'],
  ['assurer le suivi administratif de la relation avec le Cabinet.', 'handle the administrative follow-up of the relationship with the Firm.'],
  ['Destinataires', 'Recipients'],
  ['Les données sont destinées aux seuls membres du Cabinet ayant à en connaître. Elles ne sont communiquées à des tiers que lorsque la loi l’impose ou lorsque l’exécution de la mission le nécessite, et dans le respect du secret professionnel.',
    'The data is intended solely for the members of the Firm who need to know it. It is disclosed to third parties only where required by law or necessary for carrying out the assignment, and in compliance with professional secrecy.'],
  ['Durée de conservation', 'Retention period'],
  ['Les demandes n’ayant pas donné lieu à l’ouverture d’un dossier sont conservées pendant une durée limitée&nbsp;:',
    'Requests that do not lead to the opening of a matter are kept for a limited period:'],
  ['[À COMPLÉTER — ex. 12 mois]', '[TO BE COMPLETED — e.g. 12 months]'],
  ['. Les dossiers clients sont conservés conformément aux obligations professionnelles applicables.',
    '. Client files are retained in accordance with the applicable professional obligations.'],
  ['Secret professionnel', 'Professional secrecy'],
  ['Les échanges couverts par le secret professionnel de l’avocat bénéficient de la protection attachée à ce secret. Pour toute information sensible, privilégiez un échange direct plutôt que le formulaire du site.',
    'Exchanges covered by the lawyer’s professional secrecy benefit from the protection attached to it. For any sensitive information, please favour direct contact over the website form.'],
  ['Vos droits', 'Your rights'],
  ['Vous pouvez demander l’accès à vos données, leur rectification, leur effacement ou vous opposer à leur traitement en écrivant au Cabinet&nbsp;:',
    'You may request access to your data, its rectification or erasure, or object to its processing, by writing to the Firm:'],
  ['[À COMPLÉTER — adresse électronique dédiée]', '[TO BE COMPLETED — dedicated email address]'],
  ['Cookies et mesure d’audience', 'Cookies and audience measurement'],
  ['Ce site ne dépose aucun cookie de suivi publicitaire. Les polices de caractères sont chargées depuis Google Fonts, ce qui implique une connexion à ce service lors de l’affichage des pages.',
    'This website places no advertising tracking cookies. Fonts are loaded from Google Fonts, which involves a connection to that service when pages are displayed.'],
  ['[À COMPLÉTER si un outil de mesure d’audience est ajouté.]', '[TO BE COMPLETED if an audience measurement tool is added.]'],
  ['Sécurité', 'Security'],
  ['Le Cabinet met en œuvre des mesures raisonnables afin de protéger les données contre la perte, l’accès non autorisé et la divulgation.',
    'The Firm implements reasonable measures to protect data against loss, unauthorized access and disclosure.'],

  /* --- Titres de pages et descriptions -------------------------------------- */
  ["M2NB &amp; Partners Law Firm — Cabinet d'avocats à Yaoundé, Cameroun", 'M2NB &amp; Partners Law Firm — Law firm in Yaoundé, Cameroon'],
  ["Cabinet d'avocats établi à Yaoundé. Conseil, assistance et représentation juridique des entreprises, dirigeants, institutions et particuliers.",
    'Law firm based in Yaoundé. Legal advice, assistance and representation for companies, executives, institutions and individuals.'],
  ['Le cabinet — M2NB &amp; Partners Law Firm', 'The Firm — M2NB &amp; Partners Law Firm'],
  ["Une pratique juridique fondée sur l'expérience et la confiance : approche, mission, vision, valeurs et méthode.",
    'A legal practice built on experience and trust: approach, mission, vision, values and method.'],
  ['Nos services — M2NB &amp; Partners Law Firm', 'Our Services — M2NB &amp; Partners Law Firm'],
  ["Sept domaines d'intervention : affaires, sociétés, contrats, contentieux, arbitrage, droit social et conseil juridique.",
    'Seven practice areas: business, corporate, contracts, litigation, arbitration, employment and legal advisory.'],
  ['Notre équipe — M2NB &amp; Partners Law Firm', 'Our Team — M2NB &amp; Partners Law Firm'],
  ['Des professionnels engagés à vos côtés : rigueur, engagement, confidentialité et qualité du conseil.',
    'Professionals committed to serving your interests: rigor, commitment, confidentiality and quality legal advice.'],
  ['Me Clovis METANG NJIKE — M2NB &amp; Partners Law Firm', 'Me Clovis METANG NJIKE — M2NB &amp; Partners Law Firm'],
  ['Avocat au Barreau du Cameroun, fondateur et avocat associé de M2NB &amp; Partners. Serment prêté le 16 novembre 2001.',
    'Attorney-at-Law at the Cameroon Bar, founding partner of M2NB &amp; Partners. Admitted to the Bar on November 16, 2001.'],
  ['Nos références — M2NB &amp; Partners Law Firm', 'Our References — M2NB &amp; Partners Law Firm'],
  ['Une expérience construite dans la pratique, dans le respect de la confidentialité due à chaque client.',
    'Experience built through practice, with the confidentiality owed to every client.'],
  ['Actualités — M2NB &amp; Partners Law Firm', 'News &amp; Insights — M2NB &amp; Partners Law Firm'],
  ['Analyses, notes juridiques et actualités publiées par le Cabinet.', 'Analyses, legal notes and updates published by the Firm.'],
  ['Contact — M2NB &amp; Partners Law Firm', 'Contact — M2NB &amp; Partners Law Firm'],
  ['Parlons de votre situation. Cabinet M2NB &amp; Partners Law Firm, Yaoundé, Cameroun.',
    "Let's discuss your situation. M2NB &amp; Partners Law Firm, Yaoundé, Cameroon."],
  ['Mentions légales — M2NB &amp; Partners Law Firm', 'Legal notice — M2NB &amp; Partners Law Firm'],
  ['Mentions légales du site du cabinet M2NB &amp; Partners Law Firm, Yaoundé, Cameroun.',
    'Legal notice for the website of M2NB &amp; Partners Law Firm, Yaoundé, Cameroon.'],
  ['Politique de confidentialité — M2NB &amp; Partners Law Firm', 'Privacy policy — M2NB &amp; Partners Law Firm'],
  ['Traitement des données personnelles collectées via le site du cabinet M2NB &amp; Partners Law Firm.',
    'Processing of personal data collected through the website of M2NB &amp; Partners Law Firm.'],
  ['Droit des affaires — M2NB &amp; Partners Law Firm', 'Business Law — M2NB &amp; Partners Law Firm'],
  ['Droit des sociétés — M2NB &amp; Partners Law Firm', 'Corporate Law — M2NB &amp; Partners Law Firm'],
  ['Droit commercial &amp; contrats — M2NB &amp; Partners Law Firm', 'Commercial Law &amp; Contracts — M2NB &amp; Partners Law Firm'],
  ['Contentieux &amp; règlement des différends — M2NB &amp; Partners Law Firm', 'Litigation &amp; Dispute Resolution — M2NB &amp; Partners Law Firm'],
  ['Arbitrage &amp; médiation — M2NB &amp; Partners Law Firm', 'Arbitration &amp; Mediation — M2NB &amp; Partners Law Firm'],
  ['Droit du travail &amp; droit social — M2NB &amp; Partners Law Firm', 'Employment &amp; Labor Law — M2NB &amp; Partners Law Firm'],
  ['Conseil juridique — M2NB &amp; Partners Law Firm', 'Legal Advisory — M2NB &amp; Partners Law Firm'],

  /* --- Données structurées (JSON-LD) ---------------------------------------- */
  ["Cabinet d'avocats établi à Yaoundé, au Cameroun : conseil, assistance et représentation juridique.",
    'Law firm based in Yaoundé, Cameroon: legal advice, assistance and representation.'],
  ['Fondateur et Avocat Associé', 'Founding Partner']
];

/* Les remplacements les plus longs passent d'abord : une phrase complète ne
   doit jamais être coupée par la traduction d'un de ses fragments. */
function dictionnaire() {
  const paires = [...pairesContenu(), ...INTERFACE];
  const vues = new Map();
  for (const [fr, en] of paires) if (!vues.has(fr)) vues.set(fr, en);
  return [...vues.entries()].sort((a, b) => b[0].length - a[0].length);
}

const ATTRIBUTS = ['alt', 'aria-label', 'title', 'placeholder', 'aria-roledescription', 'data-accroche', 'content'];

function traduitPage(html, paires) {
  /* 1. Blocs mêlant texte et balises (titres en italique, etc.) */
  for (const [fr, en] of paires) {
    if (fr.indexOf('<') === -1) continue;
    html = html.split(fr).join(en);
  }
  /* 3. Texte visible et attributs traduisibles */
  const morceaux = html.split(/(<[^>]+>)/);
  let dansScript = false;      /* on ne traduit jamais le code JavaScript… */
  let dansDonnees = false;     /* …sauf les données structurées JSON-LD */
  for (let i = 0; i < morceaux.length; i++) {
    const m = morceaux[i];
    if (m.startsWith('<')) {
      if (/^<script/i.test(m)) { dansScript = true; dansDonnees = /application\/ld\+json/i.test(m); }
      else if (/^<\/script/i.test(m)) { dansScript = false; dansDonnees = false; }
      else if (/^<style/i.test(m)) { dansScript = true; }
      else if (/^<\/style/i.test(m)) { dansScript = false; }
      if (/^<\/?(script|style)/i.test(m)) continue;
      morceaux[i] = m.replace(/\b([a-z-]+)="([^"]*)"/g, (tout, attr, valeur) => {
        if (!ATTRIBUTS.includes(attr) || !valeur.trim()) return tout;
        let v = valeur;
        for (const [fr, en] of paires) if (fr.indexOf('<') === -1) v = v.split(fr).join(en);
        return `${attr}="${v}"`;
      });
    } else if (m.trim() && (!dansScript || dansDonnees)) {
      let v = m;
      for (const [fr, en] of paires) if (fr.indexOf('<') === -1) v = v.split(fr).join(en);
      morceaux[i] = v;
    }
  }
  html = morceaux.join('');

  /* 4. En-tête du document : langue, locale, liens entre versions */
  html = html.replace('<html lang="fr">', '<html lang="en">')
    .replace('<meta property="og:locale" content="fr_FR">', '<meta property="og:locale" content="en_GB">');

  /* 5. Chemins des ressources (les pages anglaises vivent dans /en/) */
  html = html.replace(/(src|href|data-image)="(assets|img)\//g, '$1="../$2/')
    .replace(/srcset="(assets|img)\//g, 'srcset="../$1/')
    .replace(/<script src="assets\/js\/site.js"/g, '<script src="../assets/js/site.js"');
  return html;
}

module.exports = { dictionnaire, traduitPage, INTERFACE };
