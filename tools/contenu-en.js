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
    image: P + 'salle-conseil.jpg', alt: 'Attorney at work in her office',
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
    image: P + 'hero-colonnes1.jpg', alt: 'Forecourt of a courthouse',
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
    image: P + 'art-dirigeant.jpg', alt: 'Professional discussion around a working table',
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
  },
  {
    cle: 'penal', fichier: 'droit-penal.html', titre: 'General Criminal Law and Business Criminal Law', court: 'Criminal Law',
    image: P + 'art-penal.jpg', alt: 'Advocacy in a courtroom',
    accroche: 'Assisting and defending you in criminal matters',
    resume: 'We assist individuals and businesses in analyzing and addressing proceedings involving general criminal law and business criminal law.',
    textes: [
      'Criminal proceedings can involve significant personal, professional and financial stakes.',
      'We help our clients understand their situation and assist them in preparing their defense, in both general criminal law and business criminal law.'
    ],
    exergue: 'Every criminal matter calls for a thorough analysis of the facts, the procedure and the interests at stake.',
    interventions: ['Criminal law consultations', 'Assistance during criminal proceedings', 'Defense of persons under investigation or prosecution',
      'Business criminal law', 'Criminal risk analysis', 'Preparation of case files and appeals']
  },
  {
    cle: 'administratif', fichier: 'contentieux-administratif.html', titre: 'Administrative Litigation', court: 'Administrative',
    image: P + 'cabinet-justice.jpg', alt: "Statue of Justice",
    accroche: 'Defending your rights in disputes with public authorities',
    resume: 'We advise and assist individuals and organizations facing an administrative decision or dispute.',
    textes: [
      'Interactions with public authorities can raise complex questions and have significant consequences.',
      'We review challenged decisions, the steps already taken and potential avenues of appeal to define an appropriate strategy.'
    ],
    exergue: 'A sound administrative litigation strategy requires careful review of decisions, deadlines and applicable rules.',
    interventions: ['Review of administrative decisions', 'Advice on available remedies', 'Preparation of administrative appeals',
      'Litigation before administrative courts', 'Representation and procedural follow-up', 'Enforcement of decisions']
  },
  {
    cle: 'foncier', fichier: 'droit-foncier.html', titre: 'Land Law', court: 'Land Law',
    image: P + 'art-foncier.jpg', alt: 'Land survey plan unfolded on a table',
    accroche: 'Securing your land rights and transactions',
    resume: 'We assist individuals and organizations with matters and disputes relating to land and property.',
    textes: [
      'Land transactions call for careful review of documents and the legal status of the property.',
      'We advise clients on land-related matters and assist them when their rights or projects are the subject of a dispute.'
    ],
    exergue: 'Careful review of titles, deeds and the status of a property helps anticipate land-related difficulties.',
    interventions: ['Review of land titles and documents', 'Advice on land transactions', 'Securing legal instruments',
      'Prevention and resolution of land disputes', 'Assistance in property-related proceedings']
  },
  {
    cle: 'civil-famille', fichier: 'droit-civil-famille.html', titre: 'Civil and Family Law', court: 'Civil and Family',
    image: P + 'art-famille.jpg', alt: 'Two empty armchairs facing a desk',
    accroche: 'Supporting you with civil and family matters',
    resume: 'We advise and assist our clients in matters involving civil law and family law.',
    textes: [
      'Civil and family matters affect each person’s rights, obligations and personal relationships.',
      'We listen to our clients’ situations, clarify the applicable rules and assist them in finding an appropriate response.'
    ],
    exergue: 'Every matter deserves an attentive approach that respects the people involved and addresses the issues at hand.',
    interventions: ['Civil law advice', 'Family and personal status law', 'Matrimonial matters',
      'Succession matters', 'Drafting and review of legal instruments', 'Assistance with civil and family disputes']
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
const { EQUIPE } = require('./equipe-en.js');

module.exports = { DOMAINES, ENGAGEMENTS, VALEURS, EQUIPE, P };
