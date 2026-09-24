/* Équipe du Cabinet — noms, fonctions, portraits et biographies.
   Biographies fournies par le Cabinet (document « Bio des membres »).
   L'ordre de cette liste est celui affiché sur le site. */

const E = 'img/equipe/';

const EQUIPE = [
  {
    nom: 'Me Clovis METANG NJIKE', titreHtml: 'Me Clovis <em>METANG NJIKE</em>',
    role: 'Fondateur et Avocat Associé', groupe: 'Associés',
    photo: E + 'clovis-metang-njike.jpg', lien: 'me-clovis-metang-njike.html',
    accroche: 'Avocat au Barreau du Cameroun depuis 2001',
    faits: [['Barreau', 'Cameroun'], ['Serment', '16 novembre 2001'], ['Exercice', 'Yaoundé'], ['Fonction', 'Fondateur et Avocat Associé']],
    bio: [
      'Me Clovis METANG NJIKE est avocat au Barreau depuis 2001. Son parcours s’est construit autour d’une conviction simple : le droit n’a de valeur que lorsqu’il éclaire et protège concrètement ceux qui le sollicitent.',
      'Sa pratique couvre un large spectre de procédures, tant devant les juridictions qu’en qualité d’avocat conseil, lui permettant d’accompagner ses clients à chaque étape — de la prévention du contentieux jusqu’à sa résolution, lorsqu’elle s’impose. Cette double maîtrise, du prétoire et du conseil, en fait un interlocuteur privilégié pour des acteurs exigeants : plusieurs ambassades, banques et institutions de micro-finance lui confient la sécurisation de leurs opérations et la défense de leurs intérêts.',
      'Rigoureux, disponible et attentif aux enjeux spécifiques de chaque secteur, il conjugue exigence technique et sens du dialogue pour offrir à ses clients des solutions juridiques à la fois solides et adaptées à la réalité de leur activité.'
    ],
    domaines: ['Contentieux', 'Conseil juridique', 'Droit des affaires', 'Droit commercial', 'Arbitrage & médiation', 'Droit social']
  },
  {
    nom: 'Me Carine Laure NGASSA BAMY', titreHtml: 'Me Carine Laure <em>NGASSA BAMY</em>',
    role: 'Avocat Associé', groupe: 'Associés',
    photo: E + 'carine-laure-ngassa-bamy.jpg', lien: 'me-carine-laure-ngassa-bamy.html',
    accroche: 'Avocate — Barreaux du Cameroun et du Nigéria',
    faits: [['Barreaux', 'Cameroun et Nigéria'], ['Expérience', 'Plus de 18 ans'], ['Fonction', 'Avocat Associé']],
    bio: [
      'Il y a des parcours qui se racontent en années, et d’autres qui se racontent en expérience accumulée. Celui de Maître Carine Ngassa Bamy relève de la seconde catégorie. Inscrite aux Barreaux du Cameroun et du Nigéria, elle totalise plus de dix-huit années d’exercice, au cours desquelles elle a accompagné des clients aux profils et aux besoins les plus divers, avec une constance qui force le respect.',
      'Sa pratique s’est particulièrement forgée autour du droit de l’immigration et des enjeux de mobilité et d’expatriation — un domaine exigeant, où chaque dossier engage bien plus qu’une simple procédure : un projet de vie, une carrière, parfois un avenir familial tout entier. C’est avec cette conscience qu’elle intervient, avec aisance dans la recherche d’une issue conciliée comme dans la défense ferme des dossiers devant les juridictions, selon ce que la situation du client exige réellement.',
      'Figure centrale du cabinet, elle incarne cette maturité professionnelle qui ne s’acquiert qu’avec le temps : une expertise juridique éprouvée, mise au service d’une écoute attentive et d’un engagement sans faille envers les clients qui confient leurs dossiers les plus sensibles.'
    ],
    domaines: ['Droit de l’immigration', 'Mobilité & expatriation', 'Médiation', 'Contentieux', 'Droit des affaires']
  },
  {
    nom: 'Me Aurélien Jaurès TCHAPDA Nkogue', titreHtml: 'Me Aurélien Jaurès <em>TCHAPDA Nkogue</em>',
    role: 'Avocat Associé', groupe: 'Associés',
    photo: E + 'aurelien-jaures-tchapda-nkogue.jpg', lien: 'me-aurelien-jaures-tchapda-nkogue.html',
    accroche: 'Avocat — Barreaux du Rwanda et du Cameroun',
    faits: [['Barreaux', 'Rwanda et Cameroun'], ['Formation', 'Master en droit des affaires'], ['Fonction', 'Avocat Associé']],
    bio: [
      'Il y a des avocats que l’on retient pour la précision avec laquelle ils conduisent un dossier, du premier échange jusqu’à son dénouement. Maître Aurélien Jaurès Tchapda Nkogue est de ceux-là. Inscrit aux Barreaux du Rwanda et du Cameroun, il conjugue une pratique juridique exigeante à une véritable finesse d’analyse, qui fait de lui l’un des piliers du cabinet.',
      'Titulaire d’un Master en droit des affaires, il a développé une expertise reconnue dans la résolution des différends, où l’écoute et la stratégie comptent souvent autant que la maîtrise du droit. Son intérêt se porte vers les nouveaux domaines du droit, notamment le droit du numérique, la propriété intellectuelle, le droit de la santé et le droit des assurances. Chaque dossier qu’il suit bénéficie d’une attention constante, faite d’anticipation et de sens tactique, qui lui permet de désamorcer les difficultés avant qu’elles ne deviennent des obstacles.',
      'C’est cette combinaison rare — une expertise technique affirmée et une finesse dans le traitement de chaque affaire — qui lui a valu sa réputation au sein du cabinet, où il compte aujourd’hui parmi les avocats les plus respectés.'
    ],
    domaines: ['Résolution des différends', 'Droit des affaires', 'Droit du numérique', 'Propriété intellectuelle', 'Droit de la santé', 'Droit des assurances']
  },
  {
    nom: 'Me Bernadette KOUENJOU NOUGOUE épse SAMEN', titreHtml: 'Me Bernadette <em>KOUENJOU NOUGOUE</em> épse SAMEN',
    role: 'Avocat', groupe: 'Avocats',
    photo: E + 'bernadette-kouenjou-nougoue-samen.jpg', lien: 'me-bernadette-kouenjou-nougoue-samen.html',
    accroche: 'Avocate — Barreaux du Rwanda et du Cameroun',
    faits: [['Barreaux', 'Rwanda et Cameroun'], ['Formation', 'Master en droit des affaires, Université de Dschang'], ['Langues', 'Français et anglais']],
    bio: [
      'Le droit des affaires ne s’arrête pas aux frontières — c’est cette conviction qui guide Me KOUENJOU NOUGOUE épouse SAMEN, inscrite aux Barreaux du Rwanda et du Cameroun. Elle y accompagne ses clients avec la même rigueur et la même proximité, où que se trouve le dossier.',
      'Diplômée d’un Master en droit des affaires de l’Université de Dschang, elle exerce aujourd’hui au sein du cabinet M2NB & Partners Law Firm. Sa pratique s’étend du conseil et de la rédaction contractuelle à la médiation et à l’arbitrage, avec une attention particulière portée au droit pénal des affaires, au droit de la famille et des personnes, ainsi qu’à une veille constante de l’évolution du droit OHADA.',
      'Parfaitement bilingue en français et en anglais, elle met cette double culture juridique et linguistique au service de clients qui, comme elle, pensent leurs projets au-delà des frontières — toujours disponible pour les accompagner dans leurs démarches.'
    ],
    domaines: ['Conseil & rédaction contractuelle', 'Médiation', 'Arbitrage', 'Droit pénal des affaires', 'Droit de la famille et des personnes', 'Droit OHADA']
  },
  {
    nom: 'Me Jean Fédol MAMBOU KOAGNE', titreHtml: 'Me Jean Fédol <em>MAMBOU KOAGNE</em>',
    role: 'Avocat stagiaire', groupe: 'Avocats stagiaires',
    photo: E + 'jean-fedol-mambou-koagne.jpg', lien: 'me-jean-fedol-mambou-koagne.html',
    accroche: 'Au cabinet depuis 2016, avocat stagiaire depuis 2024',
    faits: [['Au cabinet', 'Depuis 2016'], ['Avocat stagiaire', 'Depuis 2024'], ['Recherche', 'Doctorat en droit']],
    bio: [
      'En cabinet depuis 2016 et avocat stagiaire depuis 2024, Maître Jean Fédol Koagne Mambou a bâti, au fil des années, une pratique aussi large que solide, à la croisée du droit des affaires et du droit public.',
      'Sa pratique s’étend du droit privé au droit des affaires, en passant par le droit civil, le droit administratif et le droit foncier, avec une expertise particulière en contentieux administratif — autant de domaines qu’il approfondit aujourd’hui au travers de son doctorat en droit, au carrefour de la recherche et de la pratique. Cette expertise généraliste s’accompagne de certifications spécialisées en droit des assurances, en droit des marchés financiers et en droit de la propriété intellectuelle, qui lui permettent d’accompagner les clients sur des questions à forts enjeux techniques et financiers.',
      'Exigeant et méthodique, il met cette rare polyvalence, entre droit public et droit des affaires, au service d’une même ambition : offrir à chaque client une réponse juridique précise, quel que soit le terrain sur lequel se joue son dossier.'
    ],
    domaines: ['Droit des affaires', 'Droit public', 'Contentieux administratif', 'Droit civil', 'Droit foncier', 'Droit des assurances', 'Droit des marchés financiers', 'Propriété intellectuelle']
  },
  {
    nom: 'Me NKAMA Gomes Rosine Rufine', titreHtml: 'Me <em>NKAMA Gomes</em> Rosine Rufine',
    role: 'Avocat stagiaire', groupe: 'Avocats stagiaires',
    photo: E + 'gomes-rosine-rufine-nkama.jpg', lien: 'me-nkama-gomes-rosine-rufine.html',
    accroche: 'Au cabinet depuis 2019, avocate stagiaire depuis 2024',
    faits: [['Au cabinet', 'Depuis 2019'], ['Avocate stagiaire', 'Depuis 2024'], ['Recherche', 'Thèse en droit de la médecine']],
    bio: [
      'Au cabinet depuis 2019 et avocate stagiaire depuis 2024, Nkama Gomes Rosine Rufine a fait du droit de la santé et du droit médical sa véritable spécialité — un choix qu’elle approfondit aujourd’hui en préparant une thèse de doctorat en droit de la médecine, à la croisée de la recherche et de la pratique.',
      'Sa pratique s’articule autour d’une double sensibilité : celle des affaires, avec le droit des affaires, des successions et des assurances, et celle des personnes, avec le droit matrimonial et le droit des personnes. Une polyvalence qui lui permet d’aborder chaque dossier avec la même exigence, qu’il s’agisse de sécuriser une transaction ou d’accompagner un client dans un moment de vie déterminant.',
      'Rigoureuse et animée par une curiosité intellectuelle qui nourrit autant sa recherche que sa pratique, elle incarne cette nouvelle génération d’avocats pour qui l’expertise juridique se construit aussi par la réflexion — au service, toujours, de ceux qui lui font confiance.'
    ],
    domaines: ['Droit de la santé', 'Droit médical', 'Droit des affaires', 'Successions', 'Assurances', 'Droit matrimonial', 'Droit des personnes']
  },
  {
    nom: 'Me Marius Décroly TCHANGAM', titreHtml: 'Me Marius Décroly <em>TCHANGAM</em>',
    role: 'Avocat stagiaire', groupe: 'Avocats stagiaires',
    photo: E + 'marius-decroly-tchangam.jpg', lien: 'me-marius-decroly-tchangam.html',
    accroche: 'Avocat stagiaire — droit des affaires et numérique',
    faits: [['Formation', 'Master en droit des affaires et de l’entreprise'], ['Fonction', 'Avocat stagiaire'], ['Spécificité', 'Expertise digitale']],
    bio: [
      'Jeune avocat récemment admis au Barreau, Maître Decroly Marius TCHANGAM incarne une nouvelle génération de juristes qui pensent le droit au-delà du seul prétoire. Titulaire d’un Master en droit des affaires et de l’entreprise, il associe une solide formation juridique à une expertise digitale rare dans la profession.',
      'Cette double compétence trouve un terrain d’expression naturel dans l’accompagnement des acteurs du numérique : concepteurs et développeurs sur internet, acteurs de l’expression digitale, auxquels il apporte un conseil juridique sur mesure — conditions générales de vente, protection des données, conformité au droit numérique dans l’espace OHADA. Une approche à 360° qui permet aux clients de construire une activité digitale à la fois performante et juridiquement sécurisée.',
      'Curieux, rigoureux et tourné vers l’innovation, il met cette polyvalence au service d’une conviction : le meilleur conseil juridique est celui qui comprend aussi les outils et les enjeux du monde des affaires dans lequel évoluent aujourd’hui les personnes et les entreprises.'
    ],
    domaines: ['Droit des affaires', 'Droit du numérique', 'Protection des données', 'Conformité OHADA', 'Conditions générales de vente']
  },
  {
    nom: 'Me Yoann Maël METANG NJIKE', titreHtml: 'Me Yoann Maël <em>METANG NJIKE</em>',
    role: 'Avocat stagiaire', groupe: 'Avocats stagiaires',
    photo: E + 'yoann-mael-metang-njike.jpg', lien: 'me-yoann-mael-metang-njike.html',
    accroche: 'Avocat stagiaire au Barreau du Cameroun',
    faits: [['Barreau', 'Cameroun (stagiaire)'], ['Formation', 'Master en droit des affaires — contentieux et arbitrage'], ['Centre d’intérêt', 'Propriété intellectuelle et intelligence artificielle']],
    bio: [
      'Il y a des parcours qui se construisent tôt, par choix autant que par conviction. Celui de Me Metang Yoann Maël Njike en est l’illustration : présent en cabinet d’avocats dès sa première année de Licence en droit privé, il a fait de la pratique juridique une école parallèle à ses études, aujourd’hui poursuivies en Master en droit des affaires, option contentieux et arbitrage des affaires. Avocat stagiaire au Barreau du Cameroun, il conjugue cette double formation — académique et pratique — avec une aisance qui témoigne d’un engagement réfléchi envers la profession.',
      'Cette expérience de terrain s’est traduite par une réelle polyvalence : rédaction juridique et procédurale, analyse de dossiers, rédaction contractuelle, consultations juridiques et secrétariat juridique n’ont plus de secret pour lui. Une compétence particulière l’anime cependant, celle du droit de la propriété intellectuelle, qu’il explore notamment dans ses rapports avec l’intelligence artificielle — un domaine d’avenir qu’il a approfondi à travers plusieurs certifications spécialisées.',
      'Rigoureux, curieux et animé par une exigence constante d’excellence, il incarne cette nouvelle génération de juristes qui pensent le droit à la fois comme une pratique et comme un objet de recherche.'
    ],
    domaines: ['Propriété intellectuelle', 'Intelligence artificielle & droit', 'Contentieux & arbitrage des affaires', 'Rédaction contractuelle', 'Consultations juridiques']
  },
  {
    nom: 'Symphorien NGONO MBASSI', titreHtml: 'Symphorien <em>NGONO MBASSI</em>',
    role: 'Juriste', groupe: 'Juristes',
    photo: E + 'symphorien-ngono-mbassi.jpg', lien: 'symphorien-ngono-mbassi.html',
    accroche: 'Juriste — droit privé et droit public',
    faits: [['Formation', 'Master 2 en droit privé, Université de Yaoundé II-SOA'], ['Spécialité', 'Théorie et pluralisme juridique'], ['Fonction', 'Juriste']],
    bio: [
      'Titulaire d’un Master 2 en droit privé, option Théorie et pluralisme juridique, obtenu à l’Université de Yaoundé II-SOA, Symphorien NGONO MBASSI conjugue une solide formation académique à une expérience de terrain qui fait toute la différence lorsqu’il s’agit d’accompagner un client dans un moment décisif.',
      'Sa pratique couvre un large éventail du droit privé et public — droit pénal et procédure pénale, droit civil, droit social, droit foncier, droit administratif — qu’il met au service de clients qu’il assiste jusque dans les unités de gendarmerie et de police, préparant avec précision les actes de procédure nécessaires à leur défense. Au sein du cabinet, il est également en charge, pour le compte des clients, de la vérification de l’authenticité des actes d’état civil et autres documents académiques — une mission qui requiert autant de rigueur que de sens de la responsabilité.',
      'Diligent, disponible et animé d’une grande capacité d’écoute, il place l’intégrité et l’attention portée à chaque client au cœur de sa pratique du droit.'
    ],
    domaines: ['Droit pénal & procédure pénale', 'Droit civil', 'Droit social', 'Droit foncier', 'Droit administratif', 'Vérification d’actes']
  },
  {
    nom: 'Sorelle Brithney SANDJONG NANA', titreHtml: 'Sorelle Brithney <em>SANDJONG NANA</em>',
    role: 'Juriste', groupe: 'Juristes',
    photo: E + 'sorelle-brithney-sandjong-nana.jpg', lien: 'sorelle-brithney-sandjong-nana.html',
    accroche: 'Juriste — double culture civiliste et common law',
    faits: [['Formation', 'Master II en international law, Université de Yaoundé II-SOA'], ['Systèmes', 'Droit civiliste et common law'], ['Fonction', 'Juriste']],
    bio: [
      'Le Cameroun a ceci de particulier qu’il conjugue deux traditions juridiques — une richesse que Sorelle Brithney Sandjong Nana a su transformer en véritable atout pour le cabinet. Titulaire d’un Master II en international law de l’Université de Yaoundé II-SOA, elle maîtrise avec aisance ce double système, civiliste et common law, une agilité rare qui enrichit chacune de ses analyses.',
      'Spécialisée en droit du contrat, droit des personnes et droit de la famille, ainsi que dans plusieurs autres branches du droit civil, elle aborde chaque dossier avec un sens du détail qui fait la différence : celui qui permet d’anticiper une difficulté avant qu’elle ne se pose, et de sécuriser un acte avant qu’il ne soit contesté.',
      'C’est cette exigence, alliée à sa double culture juridique, qui fait d’elle une collaboratrice précieuse pour la défense des droits et des intérêts de chaque client qui nous fait confiance.'
    ],
    domaines: ['Droit du contrat', 'Droit des personnes', 'Droit de la famille', 'Droit civil', 'Droit international']
  },
  {
    nom: 'Aurélia July NOUBOUSSI MBATANG', titreHtml: 'Aurélia July <em>NOUBOUSSI MBATANG</em>',
    role: 'Juriste', groupe: 'Juristes',
    photo: E + 'aurelia-july-nouboussi-mbatang.jpg', lien: 'aurelia-july-nouboussi-mbatang.html',
    accroche: 'Consultante juridique — perspective transnationale',
    faits: [['Formation', 'Master en International Law, Université de Yaoundé II'], ['Certification', 'Propriété intellectuelle en Afrique'], ['Langues', 'Anglais et français']],
    bio: [
      'Aurélia July Nouboussi Mbatang est consultante juridique, titulaire d’un Master en International Law de l’Université de Yaoundé II. Son parcours s’est construit autour d’une conviction simple : la rigueur juridique ne prend tout son sens que lorsqu’elle sait dialoguer avec la diversité des systèmes et des cultures.',
      'Sa pratique s’étend du droit des contrats au droit de la famille, jusqu’au droit du commerce international, une polyvalence renforcée par une certification spécialisée en propriété intellectuelle en Afrique. Parfaitement bilingue en anglais et en français, elle évolue avec aisance dans les domaines civils, pénaux et internationaux, apportant à chaque dossier une lecture juridique précise et une perspective résolument transnationale.',
      'Rigoureuse, curieuse et tournée vers l’international, elle met cette double culture juridique au service de ses clients, avec la conviction que le meilleur accompagnement est celui qui sait conjuguer exigence technique et compréhension fine des enjeux transfrontaliers.'
    ],
    domaines: ['Droit des contrats', 'Droit de la famille', 'Commerce international', 'Propriété intellectuelle', 'Droit pénal']
  }
];

module.exports = { EQUIPE };
