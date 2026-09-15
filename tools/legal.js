/* Pages légales — trame à valider par le Cabinet avant mise en ligne. */

const mentions = {
  file: 'mentions-legales.html',
  nav: '',
  title: "Mentions légales — M2NB & Partners Law Firm",
  desc: "Mentions légales du site du cabinet M2NB & Partners Law Firm, Yaoundé, Cameroun.",
  surtitre: 'Informations', titre: 'Mentions légales',
  chapo: "Les informations ci-dessous concernent l’éditeur du présent site et les conditions de son utilisation.",
  sections: [
      ['Éditeur du site',
        '<p><strong>M2NB &amp; Partners Law Firm</strong> — cabinet d’avocats établi à Yaoundé, au Cameroun.</p>',
        '<ul><li>Forme juridique&nbsp;: <span class="apc">[À COMPLÉTER]</span></li>' +
        '<li>Adresse du siège&nbsp;: <span class="apc">[À COMPLÉTER]</span></li>' +
        '<li>Téléphone&nbsp;: <span class="apc">[À COMPLÉTER]</span></li>' +
        '<li>Adresse électronique&nbsp;: <span class="apc">[À COMPLÉTER]</span></li>' +
        '<li>Numéro d’identifiant unique / registre&nbsp;: <span class="apc">[À COMPLÉTER]</span></li></ul>'],
      ['Directeur de la publication',
        '<p>Me Clovis METANG NJIKE, avocat au Barreau du Cameroun, Managing Partner.</p>'],
      ['Profession réglementée',
        '<p>Les avocats du Cabinet sont inscrits au Barreau du Cameroun et exercent dans le respect des règles ' +
        'professionnelles applicables à la profession d’avocat, notamment en matière de déontologie, ' +
        'de secret professionnel et de conflits d’intérêts.</p>'],
      ['Hébergement',
        '<p>Le site est hébergé par&nbsp;: <span class="apc">[À COMPLÉTER — nom, adresse et contact de l’hébergeur]</span>.</p>'],
      ['Propriété intellectuelle',
        '<p>L’ensemble des contenus du site (textes, identité visuelle, photographies, mise en page) est protégé. ' +
        'Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable du Cabinet ' +
        'est interdite.</p>',
        '<p>Les photographies d’illustration proviennent d’Unsplash et sont utilisées conformément à la licence ' +
        'de cette plateforme&nbsp;; le détail des crédits figure dans le fichier <code>img/photos/CREDITS.json</code>.</p>'],
      ['Portée des informations publiées',
        '<p>Les informations diffusées sur ce site ont une vocation générale d’information. Elles ne constituent ' +
        'ni une consultation juridique, ni un avis adapté à une situation particulière, et ne sauraient s’y substituer.</p>',
        '<p>La consultation du site ou l’envoi d’un message via le formulaire de contact ne crée aucune relation ' +
        'avocat-client et n’interrompt aucun délai de procédure ou de prescription.</p>'],
      ['Liens hypertextes',
        '<p>Le Cabinet n’exerce aucun contrôle sur les sites tiers accessibles depuis ce site et décline toute ' +
        'responsabilité quant à leur contenu.</p>'],
      ['Contact',
        '<p>Pour toute question relative au site&nbsp;: <a href="contact.html">formulaire de contact</a>.</p>']
    ]
};

const confidentialite = {
  file: 'confidentialite.html',
  nav: '',
  title: "Politique de confidentialité — M2NB & Partners Law Firm",
  desc: "Traitement des données personnelles collectées via le site du cabinet M2NB & Partners Law Firm.",
  surtitre: 'Données personnelles', titre: 'Politique de confidentialité',
  chapo: "Le Cabinet accorde une importance particulière à la protection des informations qui lui sont confiées.",
  sections: [
      ['Responsable du traitement',
        '<p>M2NB &amp; Partners Law Firm, Yaoundé, Cameroun — contact&nbsp;: <span class="apc">[À COMPLÉTER]</span>.</p>'],
      ['Données collectées',
        '<p>Seules les données que vous transmettez volontairement via le formulaire de contact sont collectées&nbsp;: ' +
        'nom et prénom, entreprise ou organisation, numéro de téléphone, adresse électronique, objet et contenu ' +
        'de votre message.</p>',
        '<p>Aucun profilage, aucune revente et aucune prospection commerciale ne sont réalisés à partir de ces données.</p>'],
      ['Finalités',
        '<ul><li>Répondre à votre demande et, le cas échéant, organiser un rendez-vous&nbsp;;</li>' +
        '<li>vérifier l’absence de conflit d’intérêts avant toute prise en charge&nbsp;;</li>' +
        '<li>assurer le suivi administratif de la relation avec le Cabinet.</li></ul>'],
      ['Destinataires',
        '<p>Les données sont destinées aux seuls membres du Cabinet ayant à en connaître. Elles ne sont ' +
        'communiquées à des tiers que lorsque la loi l’impose ou lorsque l’exécution de la mission le nécessite, ' +
        'et dans le respect du secret professionnel.</p>'],
      ['Durée de conservation',
        '<p>Les demandes n’ayant pas donné lieu à l’ouverture d’un dossier sont conservées pendant une durée ' +
        'limitée&nbsp;: <span class="apc">[À COMPLÉTER — ex. 12 mois]</span>. Les dossiers clients sont conservés ' +
        'conformément aux obligations professionnelles applicables.</p>'],
      ['Secret professionnel',
        '<p>Les échanges couverts par le secret professionnel de l’avocat bénéficient de la protection attachée ' +
        'à ce secret. Pour toute information sensible, privilégiez un échange direct plutôt que le formulaire du site.</p>'],
      ['Vos droits',
        '<p>Vous pouvez demander l’accès à vos données, leur rectification, leur effacement ou vous opposer à leur ' +
        'traitement en écrivant au Cabinet&nbsp;: <span class="apc">[À COMPLÉTER — adresse électronique dédiée]</span>.</p>'],
      ['Cookies et mesure d’audience',
        '<p>Ce site ne dépose aucun cookie de suivi publicitaire. Les polices de caractères sont chargées depuis ' +
        'Google Fonts, ce qui implique une connexion à ce service lors de l’affichage des pages. ' +
        '<span class="apc">[À COMPLÉTER si un outil de mesure d’audience est ajouté.]</span></p>'],
      ['Sécurité',
        '<p>Le Cabinet met en œuvre des mesures raisonnables afin de protéger les données contre la perte, ' +
        'l’accès non autorisé et la divulgation.</p>']
    ]
};

module.exports = [mentions, confidentialite];
