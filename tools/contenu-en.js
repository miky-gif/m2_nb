/* English content — translation supplied by the Firm.
   Same structure as contenu.js: the build pairs both files entry by entry. */

const P = 'img/photos/';

const DOMAINES = [
  {
    cle: 'affaires', fichier: 'droit-des-affaires.html', titre: 'Business Law', court: 'Business',
    image: P + 'immeuble-affaires.jpg', alt: 'Glass façade of an office building',
    accroche: 'Supporting businesses in their decisions',
    resume: 'We assist companies, executives and entrepreneurs with their legal matters and business operations.',
    textes: [
      'Companies operate in an environment where every decision may have legal implications.',
      'We assist companies, executives and entrepreneurs with legal matters relating to their activities.'
    ],
    exergue: 'Our objective: to enable our clients to make decisions with a better understanding of the legal implications involved.',
    interventions: ['Legal advice to companies', 'Commercial transactions', 'Business relationships',
      'Legal risk analysis', 'Negotiation', 'Legal support for executives', 'Dispute prevention']
  },
  {
    cle: 'societes', fichier: 'droit-des-societes.html', titre: 'Corporate Law', court: 'Corporate',
    image: P + 'salle-conseil.jpg', alt: 'Boardroom',
    accroche: 'Securing the legal life of your company',
    resume: 'From incorporation to governance, we assist companies throughout the various stages of their legal life.',
    textes: [
      "Proper legal organization is an essential element of a company's stability and development.",
      'We assist companies and their executives throughout the various stages of their legal life.'
    ],
    exergue: 'A strong company also relies on a clear and secure legal structure.',
    interventions: ['Company incorporation and organization', 'Operation of corporate bodies', 'Corporate governance',
      'Shareholder relations', 'Capital transactions', 'Restructuring', 'Shareholder disputes', 'Advice to executives']
  },
  {
    cle: 'contrats', fichier: 'droit-commercial-contrats.html', titre: 'Commercial Law &amp; Contracts', court: 'Contracts',
    image: P + 'signature-contrat.jpg', alt: 'Signing a contract',
    accroche: 'Securing your business relationships',
    resume: 'We assist clients with the drafting, review, negotiation and securing of contracts and commercial relationships.',
    textes: [
      'Contracts are at the heart of many commercial relationships.',
      "A well-designed contract helps clarify each party's obligations, anticipate risks and reduce the potential for disputes."
    ],
    exergue: 'A contract should not merely formalize a relationship. It should also help protect the interests of those entering into it.',
    interventions: ['Contract drafting', 'Contract review and analysis', 'Negotiation', 'Securing contractual commitments',
      'Risk identification', 'Assistance in cases of non-performance', 'Management of contractual disputes']
  },
  {
    cle: 'contentieux', fichier: 'contentieux.html', titre: 'Litigation &amp; Dispute Resolution', court: 'Litigation',
    image: P + 'hero-colonnes1.jpg', alt: 'Colonnade of a courthouse',
    accroche: 'Defending your interests when disputes arise',
    resume: "When a dispute arises, we analyze the situation and develop a strategy tailored to the defense of the client's interests.",
    textes: [
      'When a dispute arises, the first step is to gain a precise understanding of the issues involved.',
      'We analyze the situation, assess the risks and develop an appropriate strategy together with the client.'
    ],
    exergue: "Every dispute deserves a strategy built around the facts, the law, the evidence and the client's objectives.",
    interventions: ['Dispute analysis', 'Risk assessment', 'Strategy development', 'Case preparation',
      'Representation before the competent courts', 'Procedural follow-up', 'Assistance with the enforcement of decisions']
  },
  {
    cle: 'arbitrage', fichier: 'arbitrage-mediation.html', titre: 'Arbitration &amp; Mediation', court: 'Arbitration',
    image: P + 'art-mediation.jpg', alt: 'Mediation session between two parties',
    accroche: 'Seeking the most appropriate solution',
    resume: 'We assist our clients in seeking appropriate alternative solutions for the resolution of their disputes.',
    textes: [
      'Judicial litigation is not always the only possible avenue.',
      'Depending on the nature of the dispute and the interests involved, negotiation, mediation or arbitration may provide appropriate solutions.'
    ],
    exergue: 'Where possible, seeking an effective solution can be just as important as preparing a litigation defense.',
    interventions: ['Assessment of amicable settlement options', 'Negotiation', 'Mediation', 'Arbitration',
      'Dispute resolution strategy']
  },
  {
    cle: 'travail', fichier: 'droit-du-travail.html', titre: 'Employment &amp; Labor Law', court: 'Employment',
    image: P + 'art-dirigeant.jpg', alt: 'Professional in a suit',
    accroche: 'Securing employment relationships',
    resume: 'We advise employers and employees on their rights, obligations and issues relating to employment relationships.',
    textes: [
      'Employment relationships are governed by rights and obligations that must be understood and respected by all parties.'
    ],
    exergue: 'We assist the various parties involved in employment relationships with their legal matters.',
    interventions: ['Employment contracts', 'Employer-employee relationships', 'Obligations of the parties', 'Individual disputes',
      'Collective disputes', 'Disciplinary procedures', 'Employment litigation']
  },
  {
    cle: 'conseil', fichier: 'conseil-juridique.html', titre: 'Legal Advisory', court: 'Advisory',
    image: P + 'art-relecture.jpg', alt: 'Careful review of a document',
    accroche: 'Anticipate rather than react',
    resume: 'We intervene upstream to identify risks, secure decisions and enable our clients to act with greater clarity and confidence.',
    textes: [
      'The best time to identify a legal risk is often before it becomes a problem.',
      'We assist our clients in analyzing their situations and documents so that they can make better-informed decisions.'
    ],
    exergue: 'Anticipating risks is already a way of protecting your interests.',
    interventions: ['Legal consultations', 'Legal opinions', 'Risk analysis', 'Document review',
      'Legal due diligence', 'Support for executives', 'Regulatory matters']
  }
];

const ENGAGEMENTS = [
  ['Listen', 'Understand before acting.'],
  ['Analyze', 'Examine each situation with rigor.'],
  ['Advise', 'Provide clear and appropriate solutions.'],
  ['Act', 'Implement a coherent strategy.'],
  ['Defend', "Protect our clients' interests."]
];

const VALEURS = [
  ['Integrity', 'Act with honesty and responsibility.'],
  ['Excellence', 'Constantly pursue quality in our practice.'],
  ['Confidentiality', 'Protect the information entrusted to us.'],
  ['Independence', 'Practice our profession with freedom of judgment.'],
  ['Commitment', "Be fully committed to protecting our clients' interests."]
];

/* Les noms restent identiques ; seules les fonctions sont traduites. */
const E = 'img/equipe/';
const EQUIPE = [
  { nom: 'Me Clovis METANG NJIKE', role: 'Founding Partner', groupe: 'Partners',
    photo: E + 'clovis-metang-njike.jpg', lien: 'me-clovis-metang-njike.html' },
  { nom: 'Me Carine Laure NGASSA BAMY', role: 'Partner', groupe: 'Partners',
    photo: E + 'carine-laure-ngassa-bamy.jpg' },
  { nom: 'Me Aurélien Jaurès TCHAPDA Nkogue', role: 'Partner', groupe: 'Partners',
    photo: E + 'aurelien-jaures-tchapda-nkogue.jpg' },
  { nom: 'Me Bernadette KOUENJOU NOUGOUE épse SAMEN', role: 'Attorney-at-Law', groupe: 'Attorneys',
    photo: E + 'bernadette-kouenjou-nougoue-samen.jpg' },
  { nom: 'Me Jean Fédol MAMBOU KOAGNE', role: 'Trainee Attorney', groupe: 'Trainee Attorneys',
    photo: E + 'jean-fedol-mambou-koagne.jpg' },
  { nom: 'Me NKAMA Gomes Rosine Rufine', role: 'Trainee Attorney', groupe: 'Trainee Attorneys',
    photo: E + 'gomes-rosine-rufine-nkama.jpg' },
  { nom: 'Me Marius Décroly TCHANGAM', role: 'Trainee Attorney', groupe: 'Trainee Attorneys',
    photo: E + 'marius-decroly-tchangam.jpg' },
  { nom: 'Me Yoann Maël METANG NJIKE', role: 'Trainee Attorney', groupe: 'Trainee Attorneys',
    photo: E + 'yoann-mael-metang-njike.jpg' },
  { nom: 'Symphorien NGONO MBASSI', role: 'Legal Counsel', groupe: 'Legal Counsel',
    photo: E + 'symphorien-ngono-mbassi.jpg' },
  { nom: 'Sorelle Brithney SANDJONG NANA', role: 'Legal Counsel', groupe: 'Legal Counsel',
    photo: E + 'sorelle-brithney-sandjong-nana.jpg' },
  { nom: 'Aurélia July NOUBOUSSI MBATANG', role: 'Legal Counsel', groupe: 'Legal Counsel',
    photo: E + 'aurelia-july-nouboussi-mbatang.jpg' }
];

module.exports = { DOMAINES, ENGAGEMENTS, VALEURS, EQUIPE, P };
