/* Générateur du site M2NB & Partners Law Firm.
   Usage : node tools/build.js
   Contenus : tools/contenu.js et tools/legal.js — Design : assets/css/site.css — Interactions : tools/site.js */
const fs = require('fs');
const path = require('path');
const { DOMAINES, ENGAGEMENTS, VALEURS, EQUIPE, P } = require('./contenu.js');
const LEGALES = require('./legal.js');

const RACINE = path.join(__dirname, '..');
const ANNEE = new Date().getFullYear();

/* -------------------------------------------------------------- outils --- */
const t = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = s => t(s).replace(/"/g, '&quot;');
const num = i => String(i + 1).padStart(2, '0');
const enc = p => p.split('/').map(encodeURIComponent).join('/');

const FLECHE = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5"/></svg>';
const FLECHE_DIAG = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4 12 12 4M5.5 4H12v6.5"/></svg>';
const CHEVRON = '<svg class="nav__chevron" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="m2 3.5 3 3 3-3"/></svg>';
const ETOILE = '<svg class="defilant__etoile" viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 0c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10C5.4 9.4 9.4 5.4 10 0Z"/></svg>';

function photo(src, alt, { prioritaire = false, classe = '' } = {}) {
  const webp = src.replace(/\.jpe?g$/i, '.webp');
  const charge = prioritaire ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';
  const img = `<img src="${enc(src)}" alt="${attr(alt)}"${alt ? '' : ' aria-hidden="true"'} ${charge} decoding="async"${classe ? ` class="${classe}"` : ''}>`;
  return webp !== src && fs.existsSync(path.join(RACINE, webp))
    ? `<picture><source srcset="${enc(webp)}" type="image/webp">${img}</picture>`
    : img;
}

/* Renvoie la version WebP d'une image lorsqu'elle existe, sinon l'original. */
function versionWeb(src) {
  const webp = src.replace(/.jpe?g$/i, '.webp');
  return fs.existsSync(path.join(RACINE, webp)) ? webp : src;
}

const visuelAVenir = alt =>
  `<div class="visuel-a-venir" role="img" aria-label="${attr(alt)}"><img src="img/logo-cream.png" alt="" width="900" height="407" loading="lazy"><span>Photographie à venir</span></div>`;

const bouton = (libelle, href, variante = '') =>
  `<a class="bouton${variante ? ' bouton--' + variante : ''}" href="${href}"><span>${libelle}</span><span class="bouton__fleche">${FLECHE}</span></a>`;

const lienFleche = (libelle, href) => `<a class="lien-fleche" href="${href}">${libelle} ${FLECHE}</a>`;

const surtitre = (numero, libelle) =>
  `<p class="surtitre">${numero ? `<span class="surtitre__num">(${numero})</span>` : ''}<span class="surtitre__trait"></span><span>${libelle}</span></p>`;

let idSceau = 0;
function sceau(texte, valeur, libelle) {
  const id = 'sceau-' + (++idSceau);
  return `<div class="sceau" aria-hidden="true">
          <svg viewBox="0 0 150 150"><defs><path id="${id}" d="M75,75 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0"/></defs><text><textPath href="#${id}" textLength="346" lengthAdjust="spacing">${texte}</textPath></text></svg>
          <span class="sceau__centre"><strong>${valeur}</strong><small>${libelle}</small></span>
        </div>`;
}

/* --------------------------------------------------------- navigation --- */
const NAV = [
  { cle: 'accueil', libelle: 'Accueil', href: 'index.html' },
  { cle: 'cabinet', libelle: 'Le cabinet', href: 'cabinet.html' },
  { cle: 'services', libelle: 'Nos services', href: 'services.html', menu: true },
  { cle: 'equipe', libelle: 'Notre équipe', href: 'equipe.html' },
  { cle: 'references', libelle: 'Nos références', href: 'references.html' },
  { cle: 'actualites', libelle: 'Actualités', href: 'actualites.html' },
  { cle: 'contact', libelle: 'Contact', href: 'contact.html' }
];

/* Drapeaux en SVG (les émojis de drapeaux ne s'affichent pas sous Windows). */
const DRAPEAU_FR = '<span class="drapeau" aria-hidden="true"><svg viewBox="0 0 3 2" preserveAspectRatio="none"><rect width="1" height="2" fill="#002654"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#CE1126"/></svg></span>';
function drapeauGB(cle = 'nav') {
  const id = 'drapeau-gb-' + cle;
  return `<span class="drapeau" aria-hidden="true"><svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice"><clipPath id="${id}"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath><path d="M0,0 v30 h60 v-30 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#${id})" stroke="#C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></svg></span>`;
}

/* Sélecteur de langue : le site existe en français (racine) et en anglais (/en/). */
const COCHE = '<svg class="langue__coche" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7"/></svg>';
function selecteurLangue(page, variante = '', langue = 'fr') {
  const id = 'langue-' + (variante || 'nav');
  const enFrancais = langue === 'fr';
  const versFr = enFrancais ? page.fichier : '../' + page.fichier;
  const versEn = enFrancais ? 'en/' + page.fichier : page.fichier;
  const option = (href, drapeau, nom, code, actif) =>
    `<li><a class="langue__option${actif ? ' est-actuelle' : ''}" href="${href}" hreflang="${code}" lang="${code}"${actif ? ' aria-current="true"' : ''}>${drapeau}<span class="langue__nom">${nom}</span>${actif ? COCHE : ''}</a></li>`;
  return `<div class="langue${variante ? ' langue--' + variante : ''}" data-langue>
          <button class="langue__bouton" type="button" aria-expanded="false" aria-controls="${id}" aria-label="Choisir la langue — langue actuelle : français">
            ${enFrancais ? DRAPEAU_FR : drapeauGB(variante || 'nav')}<span class="langue__code">${enFrancais ? 'FR' : 'EN'}</span>${CHEVRON.replace('nav__chevron', 'nav__chevron langue__chevron')}
          </button>
          <ul class="langue__menu" id="${id}">
            ${option(versFr, DRAPEAU_FR, 'Français', 'fr', enFrancais)}
            ${option(versEn, drapeauGB((variante || 'nav') + '-menu'), 'English', 'en', !enFrancais)}
          </ul>
        </div>`;
}

/* Liens entre les deux versions, pour les moteurs de recherche */
function alternatives(page, langue = 'fr') {
  const versFr = langue === 'fr' ? page.fichier : '../' + page.fichier;
  const versEn = langue === 'fr' ? 'en/' + page.fichier : page.fichier;
  return `<link rel="alternate" hreflang="fr" href="${versFr}">
<link rel="alternate" hreflang="en" href="${versEn}">
<link rel="alternate" hreflang="x-default" href="${versFr}">`;
}

function entete(page) {
  const courant = href => (href === page.fichier ? ' aria-current="page"' : '');
  const items = NAV.map(n => {
    const classe = `nav__lien${n.cle === page.rubrique && n.href !== page.fichier ? ' est-actif' : ''}`;
    if (!n.menu) return `<li><a class="${classe}" href="${n.href}"${courant(n.href)}>${n.libelle}</a></li>`;
    return `<li class="nav__item--menu">
            <a class="${classe}" href="${n.href}"${courant(n.href)} aria-haspopup="true">${n.libelle} ${CHEVRON}</a>
            <div class="mega" data-mega>
              <ul class="mega__liste">
${DOMAINES.map((d, i) => `                <li><a class="mega__lien${i === 0 ? ' est-survole' : ''}" href="${d.fichier}"${courant(d.fichier)} data-mega-index="${i}" data-accroche="${attr(d.accroche)}"><span class="mega__num">${num(i)}</span><span class="mega__titre">${t(d.titre)}</span>${FLECHE}</a></li>`).join('\n')}
              </ul>
              <div class="mega__visuel" aria-hidden="true">
${DOMAINES.map((d, i) => `                <img src="${enc(d.image.replace(/\.jpg$/, fs.existsSync(path.join(RACINE, d.image.replace(/\.jpg$/, '.webp'))) ? '.webp' : '.jpg'))}" alt="" loading="lazy" data-mega-image="${i}"${i === 0 ? ' class="est-visible"' : ''}>`).join('\n')}
                <div class="mega__legende"><strong data-mega-titre>${t(DOMAINES[0].titre)}</strong><span data-mega-accroche>${t(DOMAINES[0].accroche)}</span></div>
              </div>
            </div>
          </li>`;
  }).join('\n          ');

  return `  <div class="bandeau-haut">
    <div class="conteneur">
      <div class="bandeau-haut__gauche"><span>Yaoundé, Cameroun</span><span class="bandeau-haut__point" aria-hidden="true"></span><span>Avocat au Barreau du Cameroun</span></div>
      <div class="bandeau-haut__droite">Conseil · Assistance · Représentation</div>
    </div>
  </div>

  <header class="entete" data-entete>
    <div class="conteneur entete__barre">
      <a class="marque" href="index.html" aria-label="M2NB &amp; Partners Law Firm — accueil">
        <img src="img/logo.jpg" alt="M2NB &amp; Partners Law Firm" width="1280" height="853">
      </a>
      <nav class="nav" aria-label="Navigation principale">
        <ul class="nav__liste">
          ${items}
        </ul>
        ${selecteurLangue(page)}
        ${bouton('Rendez-vous', 'contact.html', 'petit')}
      </nav>
      <button class="burger" type="button" aria-expanded="false" aria-controls="menu-mobile" aria-label="Ouvrir le menu">
        <span aria-hidden="true"></span><span aria-hidden="true"></span>
      </button>
    </div>
    <span class="entete__progression" aria-hidden="true"></span>
  </header>

  <div class="menu-mobile" id="menu-mobile" aria-label="Menu">
    <ul class="menu-mobile__liste">
${NAV.map((n, i) => `      <li><a class="menu-mobile__lien" href="${n.href}"${courant(n.href)}><small>${num(i)}</small>${n.libelle}</a>${n.menu ? `
        <ul class="menu-mobile__sous">
${DOMAINES.map(d => `          <li><a href="${d.fichier}"${courant(d.fichier)}>${t(d.titre)}</a></li>`).join('\n')}
        </ul>` : ''}</li>`).join('\n')}
    </ul>
    <div class="menu-mobile__pied">
      ${selecteurLangue(page, 'mobile')}
      <p>M2NB &amp; Partners Law Firm — Yaoundé, Cameroun</p>
      ${bouton('Prendre rendez-vous', 'contact.html', 'or')}
    </div>
  </div>`;
}

/* ----------------------------------------------------- appel & pied --- */
const appel = () => `  <section class="appel" aria-labelledby="appel-titre">
    <span class="appel__ligne" aria-hidden="true"></span>
    <div class="conteneur appel__grille sur-sombre">
      <div>
        <p class="surtitre"><span class="surtitre__trait"></span><span>Contact</span></p>
        <h2 class="appel__titre" id="appel-titre" data-lignes>Votre situation mérite une <em>analyse juridique.</em></h2>
        <p class="appel__texte" data-apparition>Une question juridique, un contrat, un différend ou une décision importante ? Parlons de votre situation.</p>
      </div>
      <a class="appel__rond" href="contact.html" data-magnetique aria-label="Prendre rendez-vous">
        <svg class="appel__texte-rond" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="rond-appel" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"/></defs><text><textPath href="#rond-appel" textLength="470" lengthAdjust="spacing">PRENDRE RENDEZ-VOUS • PRENDRE RENDEZ-VOUS •</textPath></text></svg>
        <svg class="appel__icone" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.1" aria-hidden="true"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5"/></svg>
      </a>
    </div>
  </section>`;

const pied = () => `  <footer class="pied">
    <div class="conteneur">
      <div class="pied__haut">
        <div>
          <a href="index.html" aria-label="Accueil"><img class="pied__logo" src="img/logo-cream.png" alt="M2NB &amp; Partners Law Firm" width="900" height="407" loading="lazy"></a>
          <p class="pied__desc">Cabinet d'avocats établi à Yaoundé, au Cameroun. Conseil, assistance et représentation juridique.</p>
        </div>
        <div>
          <p class="pied__titre">Le cabinet</p>
          <ul class="pied__liste">
            <li><a href="cabinet.html">Le cabinet</a></li>
            <li><a href="equipe.html">Notre équipe</a></li>
            <li><a href="references.html">Nos références</a></li>
            <li><a href="actualites.html">Actualités</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <p class="pied__titre">Domaines</p>
          <ul class="pied__liste">
${DOMAINES.slice(0, 4).map(d => `            <li><a href="${d.fichier}">${t(d.titre)}</a></li>`).join('\n')}
          </ul>
        </div>
        <div>
          <p class="pied__titre">&nbsp;</p>
          <ul class="pied__liste">
${DOMAINES.slice(4).map(d => `            <li><a href="${d.fichier}">${t(d.titre)}</a></li>`).join('\n')}
          </ul>
        </div>
      </div>
      <div class="pied__bas">
        <span>© <span data-annee>${ANNEE}</span> M2NB &amp; Partners Law Firm. Tous droits réservés.</span>
        <nav aria-label="Informations légales"><a href="mentions-legales.html">Mentions légales</a><a href="confidentialite.html">Confidentialité</a></nav>
        <a class="pied__haut-page" href="#contenu">Haut de page ${FLECHE}</a>
      </div>
    </div>
  </footer>`;

/* ------------------------------------------------------------ document --- */
const JSONLD = JSON.stringify({
  '@context': 'https://schema.org', '@type': 'LegalService', name: 'M2NB & Partners Law Firm',
  description: "Cabinet d'avocats établi à Yaoundé, au Cameroun : conseil, assistance et représentation juridique.",
  areaServed: 'CM', address: { '@type': 'PostalAddress', addressLocality: 'Yaoundé', addressCountry: 'CM' },
  knowsLanguage: ['fr'], founder: { '@type': 'Person', name: 'Me Clovis METANG NJIKE', jobTitle: 'Fondateur et Avocat Associé' }
});

function documentHtml(page, contenu) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t(page.titre)}</title>
<meta name="description" content="${attr(page.description)}">
<meta name="theme-color" content="#3F0F18">
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="M2NB &amp; Partners Law Firm">
<meta property="og:title" content="${attr(page.titre)}">
<meta property="og:description" content="${attr(page.description)}">
<link rel="icon" href="img/logo.jpg">
${alternatives(page)}
<script>
  document.documentElement.classList.add('js');
  try {
    var reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduit && !sessionStorage.getItem('m2nb-vu')) document.documentElement.classList.add('premiere-visite');
    if (!reduit && sessionStorage.getItem('m2nb-rideau')) { document.documentElement.classList.add('depuis-rideau'); sessionStorage.removeItem('m2nb-rideau'); }
  } catch (e) {}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&amp;family=Manrope:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/site.css">
${page.fichier === 'index.html' ? `<script type="application/ld+json">${JSONLD}</script>\n` : ''}</head>
<body>
<a class="lien-evitement" href="#contenu">Aller au contenu</a>
<div class="ouverture" aria-hidden="true"><img class="ouverture__logo" src="img/logo-cream.png" alt=""><span class="ouverture__trait"><i></i></span></div>
<div class="rideau" aria-hidden="true"></div>
<div class="page">
${entete(page)}

  <main id="contenu" tabindex="-1">
${contenu}
  </main>

${page.sansAppel ? '' : appel() + '\n'}${pied()}
</div>
<div class="apercu" aria-hidden="true"></div>
<div class="curseur" aria-hidden="true"></div>
<div class="curseur-anneau" aria-hidden="true"><span></span></div>
<script src="assets/js/site.js" defer></script>
</body>
</html>
`;
}

/* Héros des pages intérieures : photo floutée sous voile noir. */
function heroPage({ index, image, fil, surtitre: sur, titre, accroche, textes = [] }) {
  const ariane = fil.map(([libelle, href], i) => (i === fil.length - 1
    ? `<span aria-current="page">${libelle}</span>`
    : `<a href="${href}">${libelle}</a><span aria-hidden="true">/</span>`)).join('');
  return `    <section class="hero-page grain">
      <div class="hero-page__fond" data-parallaxe="0.18">${photo(image, '', { prioritaire: true })}</div>
      <div class="hero-page__voile"></div>
      ${index ? `<span class="hero-page__index" aria-hidden="true">${index}</span>` : ''}
      <div class="conteneur sur-sombre">
        <nav class="fil-ariane" aria-label="Fil d'Ariane">${ariane}</nav>
        <div class="hero-page__grille">
          <div>
            <p class="surtitre"><span class="surtitre__trait"></span><span>${sur}</span></p>
            <h1 class="titre-xxl hero-page__titre" data-lignes>${titre}</h1>
          </div>
          <div data-apparition style="--delai:.35s">
            ${accroche ? `<p class="hero-page__accroche">${accroche}</p>` : ''}
            ${textes.map(p => `<p class="texte">${p}</p>`).join('\n            ')}
          </div>
        </div>
      </div>
    </section>`;
}

const carteDomaine = (d, i, { titreBalise = 'h3' } = {}) => `<a class="carte-domaine" href="${d.fichier}" data-curseur="Voir">
          ${photo(d.image, '')}
          <span class="carte-domaine__num">${num(i)}</span>
          <span class="carte-domaine__fleche">${FLECHE_DIAG}</span>
          <${titreBalise} class="carte-domaine__titre">${t(d.titre)}</${titreBalise}>
          <p class="carte-domaine__accroche">${t(d.accroche)}</p>
          <span class="carte-domaine__resume"><span><span>${t(d.resume)}</span></span></span>
        </a>`;

/* ================================================================ PAGES === */

function accueil() {
  const lignes = DOMAINES.map((d, i) => `        <li><a class="ligne" href="${d.fichier}" data-apercu="${i}" data-image="${enc(versionWeb(d.image))}">
          <span class="ligne__num">${num(i)}</span>
          <span class="ligne__titre">${t(d.titre)}</span>
          <span class="ligne__resume">${t(d.resume)}</span>
          <span class="ligne__fleche">${FLECHE_DIAG}</span>
        </a></li>`).join('\n');

  const defilant = DOMAINES.map(d => `<span class="defilant__item">${t(d.titre)} ${ETOILE}</span>`).join('');

  /* Diaporama du héros : trois messages, défilement automatique. */
  const DIAPOS = [
    { onglet: 'Le cabinet', surtitre: "Cabinet d'avocats · Yaoundé, Cameroun", balise: 'h1',
      titre: 'Votre partenaire juridique pour <em>décider,</em> <em>sécuriser</em> et <em>défendre.</em>',
      texte: 'M2NB &amp; Partners Law Firm accompagne les entreprises, dirigeants, entrepreneurs, institutions et particuliers dans leurs enjeux juridiques, commerciaux et contentieux.',
      actions: [['Nous contacter', 'contact.html'], ['Découvrir le cabinet', 'cabinet.html']],
      fond: 'hero-colonnes.jpg', arche: 'cabinet-justice.webp', alt: 'Statue de la Justice tenant la balance et le glaive' },
    { onglet: 'Nos domaines', surtitre: "Nos domaines d'intervention", balise: 'h2',
      titre: 'Conseil, assistance et <em>représentation</em> juridique.',
      texte: 'Sept domaines, une même exigence : transformer la complexité juridique en solutions compréhensibles, structurées et adaptées à vos objectifs.',
      actions: [['Nos services', 'services.html'], ['Prendre rendez-vous', 'contact.html']],
      fond: 'immeuble-affaires.jpg', arche: 'signature-contrat.webp', alt: "Signature d'un contrat" },
    { onglet: 'Notre équipe', surtitre: 'Notre équipe', balise: 'h2',
      titre: 'Des professionnels <em>engagés</em> à vos côtés.',
      texte: 'Me Clovis METANG NJIKE, avocat au Barreau du Cameroun, exerce à Yaoundé depuis plus de deux décennies.',
      actions: [['Découvrir notre équipe', 'equipe.html'], ['Nous contacter', 'contact.html']],
      fond: 'cabinet-bibliotheque.jpg', arche: 'cabinet-poignee.webp', alt: 'Poignée de main entre un avocat et un client' }
  ];

  return `    <section class="hero grain" data-diaporama aria-roledescription="carrousel" aria-label="Présentation du cabinet">
      <div class="hero__fonds" aria-hidden="true">
${DIAPOS.map((d, i) => `        <div class="hero__fond${i === 0 ? ' est-active' : ''}" data-diapo-fond>${photo(P + d.fond, '', { prioritaire: i === 0 })}</div>`).join('\n')}
      </div>
      <div class="hero__voile"></div>
      <div class="conteneur hero__grille">
        <div class="hero__textes">
${DIAPOS.map((d, i) => `          <div class="diapo${i === 0 ? ' est-active est-joue' : ''}" data-diapo role="group" aria-roledescription="diapositive" aria-label="${i + 1} sur ${DIAPOS.length} : ${attr(d.onglet)}"${i === 0 ? '' : ' aria-hidden="true" inert'}>
            <p class="surtitre"><span class="surtitre__trait"></span><span>${d.surtitre}</span></p>
            <${d.balise} class="titre-xxl hero__titre" data-mots>${d.titre}</${d.balise}>
            <p class="hero__chapo">${d.texte}</p>
            <div class="hero__actions">
              ${bouton(d.actions[0][0], d.actions[0][1], 'or')}
              ${lienFleche(d.actions[1][0], d.actions[1][1])}
            </div>
          </div>`).join('\n')}
        </div>
        <div class="hero__visuel">
          <div class="arche arche--diapo" data-apparition="image" style="--delai:.15s">
${DIAPOS.map((d, i) => `            <img class="${i === 0 ? 'est-active' : ''}" src="${enc(P + d.arche)}" alt="${i === 0 ? attr(d.alt) : ''}"${i === 0 ? '' : ' aria-hidden="true"'} loading="${i === 0 ? 'eager' : 'lazy'}" data-diapo-image>`).join('\n')}
          </div>
          ${sceau('AVOCAT AU BARREAU DU CAMEROUN • DEPUIS 2001 •', '2001', 'Serment')}
        </div>
      </div>
      <div class="conteneur hero__pied">
        <ol class="onglets-diapo">
${DIAPOS.map((d, i) => `          <li><button class="onglet-diapo${i === 0 ? ' est-active' : ''}" type="button" data-onglet="${i}" aria-label="Afficher la diapositive ${i + 1} : ${attr(d.onglet)}"${i === 0 ? ' aria-current="true"' : ''}><span class="onglet-diapo__num">${num(i)}</span><span class="onglet-diapo__libelle">${d.onglet}</span><span class="onglet-diapo__barre"><i></i></span></button></li>`).join('\n')}
        </ol>
        <div class="carrousel-fleches">
          <button class="carrousel-fleche carrousel-fleche--clair carrousel-fleche--prec" type="button" data-diapo-prec aria-label="Diapositive précédente">${FLECHE}</button>
          <button class="carrousel-fleche carrousel-fleche--clair" type="button" data-diapo-suiv aria-label="Diapositive suivante">${FLECHE}</button>
        </div>
      </div>
    </section>

    <section class="bande-chiffres" aria-label="Le cabinet en chiffres">
      <div class="conteneur bande-chiffres__grille">
        <div class="chiffre" data-apparition><div class="chiffre__valeur"><span data-compteur="20">20</span><sup>+</sup></div><div class="chiffre__libelle">Années de pratique professionnelle</div></div>
        <div class="chiffre" data-apparition style="--delai:.1s"><div class="chiffre__valeur"><span data-compteur="7">7</span></div><div class="chiffre__libelle">Domaines d'intervention</div></div>
        <div class="chiffre" data-apparition style="--delai:.2s"><div class="chiffre__valeur"><span data-compteur="2001" data-depart="1980">2001</span></div><div class="chiffre__libelle">Prestation de serment</div></div>
        <div class="chiffre" data-apparition style="--delai:.3s"><div class="chiffre__valeur">Yaoundé</div><div class="chiffre__libelle">Cabinet établi au Cameroun</div></div>
      </div>
    </section>

    <div class="defilant" aria-hidden="true">
      <div class="defilant__piste"><div class="defilant__groupe">${defilant}</div><div class="defilant__groupe">${defilant}</div></div>
    </div>

    <section class="section" id="cabinet">
      <div class="conteneur">
        <div class="cabinet-intro">
          <div class="cabinet-intro__texte">
            ${surtitre('01', 'Le cabinet')}
            <h2 class="titre-xl" data-lignes>Une expertise juridique <em>au service</em> de vos intérêts</h2>
            <p class="chapo" data-apparition>M2NB &amp; Partners Law Firm est un cabinet d'avocats établi à Yaoundé, au Cameroun. Le Cabinet accompagne ses clients dans leurs besoins de conseil, d'assistance et de représentation juridique.</p>
            <p class="texte" data-apparition>Notre clientèle comprend notamment des entreprises, dirigeants, entrepreneurs, institutions et particuliers confrontés à des problématiques juridiques nécessitant une analyse rigoureuse et une réponse adaptée.</p>
            <div data-apparition>${lienFleche('Découvrir le cabinet', 'cabinet.html')}</div>
          </div>
          <div class="compo">
            <div class="photo compo__grande" data-apparition="image">${photo(P + 'salle-conseil.jpg', 'Salle de réunion du cabinet')}</div>
            <div class="photo compo__petite" data-apparition="image" style="--delai:.25s">${photo(P + 'cabinet-poignee.jpg', 'Poignée de main entre un avocat et un client')}</div>
            <div class="compo__cartouche" data-apparition style="--delai:.4s"><strong>20+</strong><span>années de pratique professionnelle</span></div>
          </div>
        </div>
        <div class="etapes">
          <div class="etape" data-apparition data-trait><span class="etape__num">01</span><h3 class="etape__titre">Comprendre</h3><p class="texte">Nous commençons par comprendre votre situation, vos objectifs et vos contraintes.</p></div>
          <div class="etape" data-apparition data-trait style="--delai:.12s"><span class="etape__num">02</span><h3 class="etape__titre">Conseiller</h3><p class="texte">Nous transformons la complexité juridique en recommandations claires et adaptées.</p></div>
          <div class="etape" data-apparition data-trait style="--delai:.24s"><span class="etape__num">03</span><h3 class="etape__titre">Défendre</h3><p class="texte">Lorsque vos intérêts sont en jeu, nous mettons notre expertise au service de votre défense.</p></div>
        </div>
      </div>
    </section>

    <section class="section fond-nuit grain" aria-labelledby="titre-domaines">
      <div class="conteneur sur-sombre">
        <div class="entete-section">
          <div>
            ${surtitre('02', "Nos domaines d'intervention")}
            <h2 class="titre-xl" id="titre-domaines" data-lignes>Sept domaines, <em>une même exigence</em></h2>
          </div>
          <div data-apparition>
            <p class="texte">Du conseil en amont à la défense contentieuse, chaque domaine est traité avec la même rigueur d'analyse et le même souci de la décision éclairée.</p>
            <div style="margin-top:28px">${lienFleche('Voir tous nos services', 'services.html')}</div>
          </div>
        </div>
        <ul class="liste-lignes" data-apercus>
${lignes}
        </ul>
      </div>
    </section>

    <section class="section citation">
      <div class="conteneur">
        ${surtitre('03', 'Notre conviction')}
        <p class="citation__texte" data-lumiere>Un bon conseil juridique ne consiste pas uniquement à expliquer la règle de droit.</p>
        <div class="citation__suite">
          <p class="texte" data-apparition>Il doit permettre au client de comprendre sa situation, identifier ses risques, évaluer ses options et prendre une décision éclairée.</p>
          <p class="citation__signature" data-apparition>M2NB &amp; Partners Law Firm</p>
        </div>
      </div>
    </section>

    <section class="section fond-creme-2">
      <div class="conteneur associe">
        <div class="associe__visuel">
          <div class="arche" data-apparition="image">
            <img src="${enc(versionWeb(EQUIPE[0].photo))}" alt="Portrait de ${attr(EQUIPE[0].nom)}" loading="lazy" data-parallaxe="-0.06">
          </div>
          ${sceau('PLUS DE DEUX DÉCENNIES DE PRATIQUE • YAOUNDÉ •', '20+', 'Années')}
        </div>
        <div>
          ${surtitre('04', 'Notre équipe')}
          <h2 class="titre-xl" data-lignes>L'expérience <em>au service</em> de la confiance</h2>
          <p class="chapo" data-apparition><span class="associe__nom">Me Clovis METANG NJIKE</span>, avocat au Barreau du Cameroun, exerce à Yaoundé depuis plus de deux décennies.</p>
          <p class="texte" data-apparition style="margin-top:18px">Ayant prêté serment en 2001, il a développé une pratique professionnelle dans le conseil, l'assistance et la défense des intérêts de ses clients. Son parcours comprend notamment des interventions dans différents dossiers devant les juridictions camerounaises.</p>
          <p class="texte" data-apparition>Cette expérience nourrit une approche fondée sur la rigueur, la stratégie et la compréhension concrète des enjeux auxquels sont confrontés les clients du Cabinet.</p>
          <div class="associe__pied" data-apparition>
            ${bouton('Découvrir notre équipe', 'equipe.html')}
            <div class="avatars">
              <span class="avatars__item avatars__item--logo"><img src="img/logo-cream.png" alt="" loading="lazy"></span>
${EQUIPE.slice(0, 5).map(m => `              <span class="avatars__item"><img src="${enc(versionWeb(m.photo))}" alt="" loading="lazy"></span>`).join('\n')}
              <span class="avatars__texte">${EQUIPE.length} professionnels<br>engagés à vos côtés</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section fond-bordeaux grain" aria-labelledby="titre-engagements">
      <div class="conteneur sur-sombre engagements" data-engagements>
        <div class="engagements__fixe">
          ${surtitre('05', 'Nos engagements')}
          <h2 class="titre-xl" id="titre-engagements" data-lignes>Cinq exigences, <em>une méthode</em></h2>
          <div class="engagements__compteur" aria-hidden="true"><span data-engagement-num>01</span><span class="engagements__barre"><i></i></span><span>05</span></div>
        </div>
        <ol class="engagements__liste">
${ENGAGEMENTS.map(([v, p], i) => `          <li class="engagement${i === 0 ? ' est-actif' : ''}"><span class="engagement__num">${num(i)}</span><div><h3 class="engagement__verbe">${v}</h3><p class="engagement__phrase">${p}</p></div></li>`).join('\n')}
        </ol>
      </div>
    </section>

    <section class="section principes">
      <div class="conteneur">
        ${surtitre('06', 'Notre relation client')}
        <ul class="principes__mots" data-apparition>
          <li>Écoute</li><li>Rigueur</li><li>Confidentialité</li><li>Indépendance</li><li>Engagement</li>
        </ul>
        <div class="principes__bas">
          <h2 class="titre-m" data-lignes>Une relation fondée sur <em>la confiance</em></h2>
          <div data-apparition>
            <p class="chapo">La relation entre un avocat et son client repose avant tout sur la confiance.</p>
            <p class="texte">Ces principes guident notre manière de travailler et constituent le socle de notre relation avec chaque client.</p>
          </div>
        </div>
      </div>
    </section>`;
}

function pageCabinet() {
  const valeurs = VALEURS.map(([v, p], i) => `          <li><div class="ligne" data-apparition style="--delai:${i * 0.06}s"><span class="ligne__num">${num(i)}</span><span class="ligne__titre">${v}</span><span class="ligne__resume">${p}</span></div></li>`).join('\n');
  const methode = ENGAGEMENTS.map(([v, p], i) => `          <li class="frise__etape" data-apparition style="--delai:${0.2 + i * 0.15}s"><span class="frise__pastille">${num(i)}</span><h3 class="frise__titre">${v === 'Écouter' ? 'Comprendre' : v}</h3><p class="frise__texte">${p}</p></li>`).join('\n');
  return `${heroPage({
    index: 'I', image: P + 'salle-conseil.jpg', fil: [['Accueil', 'index.html'], ['Le cabinet']],
    surtitre: 'Le cabinet', titre: 'Une pratique fondée sur <em>l’expérience</em> et la confiance',
    textes: ["M2NB &amp; Partners Law Firm est un cabinet d’avocats établi à Yaoundé, au Cameroun. Le Cabinet accompagne ses clients dans leurs besoins de conseil, d’assistance et de représentation juridique.",
      "Nous intervenons auprès de particuliers, d’entreprises, d’entrepreneurs et, selon la nature des missions, d’organisations et d’institutions."]
  })}

    <section class="section">
      <div class="conteneur approche">
        <div class="photo approche__visuel" data-apparition="image">${photo(P + 'cabinet-bibliotheque.jpg', 'Bibliothèque juridique du cabinet')}</div>
        <div>
          ${surtitre('01', 'Notre approche')}
          <p class="chapo" data-apparition>Notre approche repose sur une conviction simple :</p>
          <p class="approche__conviction" data-lignes>Le droit doit permettre à nos clients de <em>mieux comprendre</em> leur situation, de <em>maîtriser</em> leurs risques et de prendre de <em>meilleures décisions.</em></p>
        </div>
      </div>
    </section>

    <section class="section section--serree fond-creme-2">
      <div class="conteneur duo">
        <article class="panneau panneau--clair" data-apparition>
          <span class="panneau__lettre" aria-hidden="true">M</span>
          ${surtitre('02', 'Notre mission')}
          <h2 class="titre-l">Un accompagnement <em>orienté solutions</em></h2>
          <p class="panneau__lead">Apporter à nos clients un accompagnement juridique rigoureux, professionnel et orienté vers les solutions.</p>
          <p class="texte">Nous intervenons aussi bien dans une logique de prévention et de conseil que dans la gestion et la résolution des différends.</p>
          <p class="texte">Notre ambition est de construire avec chaque client une relation fondée sur la confiance, la disponibilité et la qualité du conseil.</p>
        </article>
        <article class="panneau panneau--sombre sur-sombre grain" data-apparition style="--delai:.15s">
          <span class="panneau__lettre" aria-hidden="true">V</span>
          ${surtitre('03', 'Notre vision')}
          <h2 class="titre-l">Une relation <em>durable</em></h2>
          <p class="panneau__lead">Construire une relation durable fondée sur la confiance.</p>
          <p class="texte">M2NB &amp; Partners Law Firm ambitionne de développer une pratique juridique reconnue pour la qualité de son conseil, son intégrité professionnelle et son engagement auprès de ses clients.</p>
          <p class="texte">Nous souhaitons être présents non seulement lorsque le problème survient, mais également lorsque le client souhaite anticiper, structurer et sécuriser ses décisions.</p>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="conteneur">
        <div class="entete-section">
          <div>${surtitre('04', 'Nos valeurs')}<h2 class="titre-xl" data-lignes>Cinq principes qui <em>guident</em> notre pratique</h2></div>
        </div>
        <ul class="liste-lignes liste-lignes--claire">
${valeurs}
        </ul>
      </div>
    </section>

    <section class="section fond-nuit grain">
      <div class="conteneur sur-sombre">
        <div class="entete-section">
          <div>${surtitre('05', 'Notre méthode')}<h2 class="titre-xl" data-lignes>De l’écoute <em>à la défense</em></h2></div>
          <p class="texte" data-apparition>Chaque dossier suit un chemin exigeant, du premier échange à la protection effective de vos intérêts.</p>
        </div>
        <ol class="frise" data-trait>
${methode}
        </ol>
      </div>
    </section>`;
}

function pageServices() {
  return `${heroPage({
    index: 'II', image: P + 'hero-colonnes1.jpg', fil: [['Accueil', 'index.html'], ['Nos services']],
    surtitre: 'Nos services', titre: 'Des solutions juridiques <em>adaptées</em> à vos enjeux',
    textes: ['Le droit accompagne chaque étape de la vie d’une entreprise, d’une organisation ou d’un particulier.',
      'Notre rôle est de transformer la complexité juridique en solutions compréhensibles, structurées et adaptées à vos objectifs.']
  })}

    <section class="section">
      <div class="conteneur">
        <div class="entete-section">
          <div>${surtitre('07', 'Domaines d’intervention')}<h2 class="titre-xl" data-lignes>Sept expertises, <em>une même exigence</em></h2></div>
          <p class="texte" data-apparition>Survolez un domaine pour en découvrir l’essentiel, puis ouvrez sa fiche pour le détail de nos interventions.</p>
        </div>
        <div class="bento">
${DOMAINES.map((d, i) => '        ' + carteDomaine(d, i, { titreBalise: 'h2' })
    .replace('<a class="carte-domaine"', `<a class="carte-domaine" data-apparition style="--delai:${(i % 3) * 0.1}s"`)).join('\n')}
        </div>
      </div>
    </section>`;
}

function pageDomaine(d, i) {
  const autres = DOMAINES.map((x, j) => [x, j]).filter(([x]) => x !== d);
  return `${heroPage({
    index: num(i), image: d.image, fil: [['Accueil', 'index.html'], ['Nos services', 'services.html'], [t(d.titre)]],
    surtitre: `Nos services · ${num(i)} / 07`, titre: t(d.titre), accroche: t(d.accroche), textes: [t(d.textes[0])]
  })}

    <section class="section">
      <div class="conteneur detail">
        <div>
          ${surtitre('01', 'Notre approche')}
          <p class="detail__exergue" data-lignes>${t(d.exergue)}</p>
          <div class="detail__texte" data-apparition>
${d.textes.map(p => `            <p class="texte">${t(p)}</p>`).join('\n')}
          </div>
          <div data-apparition>${bouton('Prendre rendez-vous', 'contact.html')}</div>
        </div>
        <div class="photo detail__visuel" data-apparition="image">${photo(d.image, d.alt)}</div>
      </div>
    </section>

    <section class="section fond-nuit grain">
      <div class="conteneur sur-sombre">
        <div class="entete-section">
          <div>${surtitre('02', 'Nos interventions')}<h2 class="titre-xl" data-lignes>Ce que nous faisons <em>pour vous</em></h2></div>
          <p class="texte" data-apparition>${d.interventions.length} axes d’intervention en ${t(d.titre.toLowerCase())}, mobilisés selon la nature de votre situation.</p>
        </div>
        <ul class="interventions">
${d.interventions.map((x, j) => `          <li class="intervention" data-apparition style="--delai:${(j % 2) * 0.08}s">${t(x)}</li>`).join('\n')}
        </ul>
      </div>
    </section>

    <section class="section defileur" data-defileur>
      <div class="conteneur">
        <div class="entete-section" style="margin-bottom:40px">
          <div>${surtitre('03', 'Autres domaines')}<h2 class="titre-l" data-lignes>Poursuivre <em>l’exploration</em></h2></div>
          <div class="carrousel-fleches" style="justify-self:end">
            <button class="carrousel-fleche carrousel-fleche--prec" type="button" data-defileur-prec aria-label="Domaines précédents">${FLECHE}</button>
            <button class="carrousel-fleche" type="button" data-defileur-suiv aria-label="Domaines suivants">${FLECHE}</button>
          </div>
        </div>
        <div class="defileur__piste" data-defileur-piste>
${autres.map(([x, j]) => `          ${carteDomaine(x, j)}`).join('\n')}
        </div>
      </div>
    </section>`;
}

function pageEquipe() {
  const cartes = EQUIPE.map((m, i) => `            <li class="membre">
              <div class="membre__photo">${photo(m.photo, `Portrait de ${m.nom}`, { prioritaire: i < 3 })}<span class="membre__groupe">${m.groupe}</span></div>
              <div class="membre__corps">
                <h2 class="membre__nom">${t(m.nom)}</h2>
                <p class="membre__role">${t(m.role)}</p>
                ${m.lien ? `<div class="membre__lien">${lienFleche('Voir le profil', m.lien)}</div>` : '<span class="membre__lien--inactif">Profil à venir</span>'}
              </div>
            </li>`).join('\n');
  return `${heroPage({
    index: 'III', image: P + 'cabinet-poignee.jpg', fil: [['Accueil', 'index.html'], ['Notre équipe']],
    surtitre: 'Notre équipe', titre: 'Des professionnels <em>engagés</em> à vos côtés',
    textes: ['La qualité d’un cabinet repose avant tout sur les professionnels qui le composent.',
      'M2NB &amp; Partners Law Firm réunit des professionnels partageant une même exigence : rigueur, engagement, confidentialité et qualité du conseil.']
  })}

    <section class="section">
      <div class="conteneur">
        <div class="entete-section">
          <div>${surtitre('01', 'Les membres')}<h2 class="titre-xl" data-lignes>Une équipe, <em>un même cap</em></h2></div>
          <p class="texte" data-apparition>Les portraits défilent automatiquement&nbsp;; le défilement se met en pause au survol. Vous pouvez aussi naviguer avec les flèches ou en faisant glisser.</p>
        </div>
        <div class="carrousel" data-carrousel data-intervalle="5500" data-apparition>
          <div class="carrousel-fenetre">
            <ul class="carrousel-piste">
${cartes}
            </ul>
          </div>
          <div class="carrousel-commandes">
            <div class="carrousel-points" data-points></div>
            <div class="carrousel-fleches">
              <button class="carrousel-fleche carrousel-fleche--prec" type="button" data-prec aria-label="Membres précédents">${FLECHE}</button>
              <button class="carrousel-fleche" type="button" data-suiv aria-label="Membres suivants">${FLECHE}</button>
            </div>
          </div>
          <p class="sr-only" role="status" data-annonce></p>
        </div>
      </div>
    </section>

    <section class="section section--serree fond-creme-2">
      <div class="conteneur">
        <p class="citation__texte" data-lumiere style="max-width:26ch">Une même exigence : rigueur, engagement, confidentialité et qualité du conseil.</p>
      </div>
    </section>`;
}

function pageProfil() {
  const domaines = ['Droit des affaires', 'Droit commercial', 'Contentieux', 'Droit social', 'Arbitrage & médiation', 'Conseil juridique'];
  return `${heroPage({
    index: '', image: P + 'bureau-avocat.jpg', fil: [['Accueil', 'index.html'], ['Notre équipe', 'equipe.html'], ['Me Clovis METANG NJIKE']],
    surtitre: 'Notre équipe · Fondateur', titre: 'Me Clovis <em>METANG NJIKE</em>',
    accroche: EQUIPE[0].role, textes: ['Avocat au Barreau du Cameroun, il exerce à Yaoundé. Il a prêté serment le 16 novembre 2001.']
  })}

    <section class="section">
      <div class="conteneur profil">
        <aside class="profil__aside">
          <div class="profil__portrait photo" data-apparition="image">${photo(EQUIPE[0].photo, 'Portrait de ' + EQUIPE[0].nom, { prioritaire: true })}</div>
          <ul class="faits" data-apparition>
            <li><span>Barreau</span><span>Cameroun</span></li>
            <li><span>Exercice</span><span>Yaoundé</span></li>
            <li><span>Serment</span><span>16 novembre 2001</span></li>
            <li><span>Fonction</span><span>${EQUIPE[0].role}</span></li>
          </ul>
        </aside>
        <div>
          ${surtitre('01', 'Parcours')}
          <p class="titre-m" data-lignes>Plus de <em>deux décennies</em> de conseil, d’assistance et de défense.</p>
          <div data-apparition style="margin-top:36px">
            <p class="chapo">Me Clovis METANG NJIKE est avocat au Barreau du Cameroun et exerce à Yaoundé. Il a prêté serment le 16 novembre 2001.</p>
            <p class="texte">Au cours de sa pratique professionnelle, il a développé une expérience dans le conseil juridique, l’assistance, la représentation et la défense des intérêts de ses clients.</p>
            <p class="texte">Son nom apparaît notamment dans plusieurs publications officielles de la Cour suprême du Cameroun en qualité de conseil dans différents dossiers.</p>
          </div>
          <div style="margin-top:56px" data-apparition>
            ${surtitre('02', 'Domaines d’intervention')}
            <ul class="puces">${domaines.map(x => `<li>${t(x)}</li>`).join('')}</ul>
          </div>
          <div class="a-completer" data-apparition>
            <h3>À compléter avant mise en ligne</h3>
            <ul><li>Formation</li><li>Diplômes</li><li>Affiliations professionnelles</li><li>Langues</li><li>Autres membres de l’équipe</li><li>Photographies professionnelles</li></ul>
          </div>
          <div style="margin-top:44px" data-apparition>${bouton('Prendre rendez-vous', 'contact.html')}</div>
        </div>
      </div>
    </section>`;
}

function pageReferences() {
  const criteres = ['Le contexte', 'L’enjeu juridique', 'Notre intervention', 'L’approche', 'Le résultat'];
  const blocs = [['Problématique', '[Description synthétique de la situation.]'], ['Notre intervention', '[Description de l’intervention du Cabinet.]'],
    ['Approche adoptée', '[Description de la stratégie.]'], ['Résultat / situation', '[À publier uniquement si autorisé.]']];
  return `${heroPage({
    index: 'IV', image: P + 'cabinet-bibliotheque.jpg', fil: [['Accueil', 'index.html'], ['Nos références']],
    surtitre: 'Nos références', titre: 'Une expérience construite <em>dans la pratique</em>',
    textes: ['L’expérience d’un cabinet ne se mesure pas uniquement au nombre de dossiers traités.',
      'Elle se construit au fil des années, des situations rencontrées, des stratégies développées et de la confiance accordée par les clients.']
  })}

    <section class="section">
      <div class="conteneur">
        <div class="entete-section">
          <div>${surtitre('01', 'Expérience')}<h2 class="titre-xl" data-lignes>Depuis 2001, <em>au Cameroun</em></h2></div>
          <div data-apparition>
            <p class="chapo">Me Clovis METANG NJIKE a prêté serment en 2001 et exerce depuis lors la profession d’avocat au Cameroun.</p>
            <p class="texte">Au cours de sa pratique, il est intervenu dans différents dossiers devant les juridictions camerounaises. Cette section pourra présenter certaines expériences publiques sous une forme permettant de mettre en évidence :</p>
          </div>
        </div>
        <ol class="criteres">
${criteres.map((c, i) => `          <li class="critere" data-apparition style="--delai:${i * 0.08}s"><span class="critere__num">${num(i)}</span><div class="critere__titre">${c}</div></li>`).join('\n')}
        </ol>
      </div>
    </section>

    <section class="section fond-creme-2">
      <div class="conteneur">
        <article class="document" data-apparition>
          <span class="document__ruban">Modèle de case study</span>
          <div class="document__entete">
            <h2 class="titre-m">Cas 01 — [Titre du dossier]</h2>
            <span class="document__secteur">Secteur : [À compléter]</span>
          </div>
          <div class="document__grille">
${blocs.map(([h, p]) => `            <div class="document__bloc"><h3>${h}</h3><p>${p}</p></div>`).join('\n')}
          </div>
        </article>
      </div>
    </section>

    <section class="section fond-nuit grain">
      <div class="conteneur sur-sombre confidentialite">
        <div>
          <svg class="sceau-fixe" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><circle cx="60" cy="60" r="56"/><circle cx="60" cy="60" r="46" stroke-dasharray="2 4"/><rect x="42" y="54" width="36" height="28" rx="3"/><path d="M48 54v-8a12 12 0 0 1 24 0v8"/><circle cx="60" cy="67" r="3"/><path d="M60 70v5"/></svg>
          ${surtitre('02', 'Confidentialité')}
          <h2 class="titre-xl" data-lignes>La confiance <em>se protège</em></h2>
        </div>
        <div data-apparition>
          <p class="chapo">La relation entre l’avocat et son client repose sur la confiance et la confidentialité.</p>
          <p class="texte">M2NB &amp; Partners Law Firm ne publie pas systématiquement l’identité de ses clients, le contenu des dossiers ou les stratégies développées dans le cadre des missions qui lui sont confiées.</p>
          <p class="texte">Les références éventuellement présentées sur ce site sont publiées uniquement lorsqu’elles peuvent l’être de manière appropriée et après validation du Cabinet.</p>
        </div>
      </div>
    </section>`;
}

function pageActualites() {
  const article = (n, classe = 'titre-m') => `<div class="meta"><span>[Catégorie]</span><i></i><span>[Date]</span></div>
            <h2 class="article-titre ${classe}">[Titre de la publication ${n}]</h2>
            <p class="texte">[Chapeau de l’article — deux à trois lignes présentant l’analyse.]</p>`;
  return `${heroPage({
    index: 'V', image: P + 'art-clauses.jpg', fil: [['Accueil', 'index.html'], ['Actualités']],
    surtitre: 'Actualités', titre: 'Analyses et <em>actualités</em> juridiques',
    textes: ['Cette section accueillera les analyses, notes juridiques et actualités publiées par le Cabinet.', 'Contenu à fournir : titres, dates et textes des publications.']
  })}

    <section class="section">
      <div class="conteneur">
        <article class="une">
          <div class="photo une__visuel" data-apparition="image">${photo(P + 'art-contrat.jpg', 'Documents contractuels')}</div>
          <div data-apparition>
            <p class="surtitre"><span class="surtitre__trait"></span><span>À la une</span></p>
            ${article(1, 'titre-l')}
            <div style="margin-top:30px">${lienFleche('Lire l’article', '#')}</div>
          </div>
        </article>
        <div class="cartes-articles">
          <article class="carte-article" data-apparition>
            <div class="photo carte-article__visuel">${photo(P + 'art-clauses.jpg', 'Loupe posée sur un ouvrage juridique')}</div>
            ${article(2)}
            <div style="margin-top:22px">${lienFleche('Lire l’article', '#')}</div>
          </article>
          <article class="carte-article" data-apparition style="--delai:.12s">
            <div class="photo carte-article__visuel">${photo(P + 'art-litige.jpg', 'Marteau de juge')}</div>
            ${article(3)}
            <div style="margin-top:22px">${lienFleche('Lire l’article', '#')}</div>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--serree">
      <div class="conteneur">
        <div class="lettre fond-nuit grain sur-sombre" data-apparition>
          <div>
            ${surtitre('', 'Lettre d’information')}
            <h2 class="titre-l">Recevez nos analyses <em>et actualités</em> juridiques.</h2>
          </div>
          <form class="form-newsletter" method="post" action="#" novalidate>
            <div class="lettre__formulaire">
              <label class="sr-only" for="f-newsletter">Votre adresse e-mail</label>
              <input id="f-newsletter" name="email" type="email" placeholder="Votre adresse e-mail" autocomplete="email" required>
              ${bouton('S’inscrire', '#', 'or').replace('<a ', '<button type="submit" ').replace(' href="#"', '').replace('</a>', '</button>')}
            </div>
            <p class="form-statut" role="status" hidden></p>
          </form>
        </div>
      </div>
    </section>`;
}

function pageContact() {
  const champ = (id, nom, libelle, type, auto, requis, large = false) => `              <div class="champ${large ? ' champ--large' : ''}">
                <input id="f-${id}" name="${nom}" type="${type}" autocomplete="${auto}" placeholder=" "${requis ? ' required' : ''}>
                <label for="f-${id}">${libelle}${requis ? ' *' : ''}</label>
              </div>`;
  return `${heroPage({
    index: '', image: P + 'hero-colonnes.jpg', fil: [['Accueil', 'index.html'], ['Contact']],
    surtitre: 'Contact', titre: 'Parlons de <em>votre situation</em>',
    textes: ['Vous êtes confronté à une question juridique, un différend, une opération commerciale ou une décision nécessitant un accompagnement professionnel ?', 'Notre équipe est à votre écoute.']
  })}

    <section class="section">
      <div class="conteneur contact-grille">
        <div>
          ${surtitre('01', 'Coordonnées')}
          <ul class="coordonnees" data-apparition>
            <li><span>Ville</span><strong>Yaoundé, Cameroun</strong></li>
            <li><span>Adresse</span><strong>[À confirmer]</strong></li>
            <li><span>Téléphone</span><strong>[À confirmer]</strong></li>
            <li><span>E-mail</span><strong>[À confirmer]</strong></li>
          </ul>
          <div class="photo contact__visuel" data-apparition="image">${photo(P + 'immeuble-affaires.jpg', 'Immeuble de bureaux — accès au cabinet')}</div>
        </div>
        <div class="carte-formulaire" data-apparition>
          ${surtitre('02', 'Formulaire de contact')}
          <h2 class="titre-l" style="margin-bottom:20px">Écrivez-nous</h2>
          <form class="form-contact" method="post" action="#" novalidate>
            <div class="champs">
${champ('nom', 'nom', 'Nom et prénom', 'text', 'name', true)}
${champ('organisation', 'organisation', 'Entreprise / Organisation', 'text', 'organization', false)}
${champ('telephone', 'telephone', 'Téléphone', 'tel', 'tel', false)}
${champ('email', 'email', 'E-mail', 'email', 'email', true)}
${champ('objet', 'objet', 'Objet', 'text', 'off', true, true)}
              <div class="champ champ--large">
                <textarea id="f-message" name="message" rows="5" placeholder=" " required></textarea>
                <label for="f-message">Votre message *</label>
              </div>
            </div>
            <div class="formulaire__pied">
              <p class="formulaire__note">Les champs marqués d’un astérisque sont obligatoires. Ce premier contact ne crée pas de relation avocat-client et n’interrompt aucun délai.</p>
              <button class="bouton" type="submit"><span>Envoyer ma demande</span><span class="bouton__fleche">${FLECHE}</span></button>
            </div>
            <p class="form-statut" role="status" hidden></p>
          </form>
        </div>
      </div>
    </section>`;
}

function pageLegale(l) {
  const ancre = i => 'section-' + (i + 1);
  return `${heroPage({ index: '', image: P + 'hero-colonnes1.jpg', fil: [['Accueil', 'index.html'], [l.titre]], surtitre: l.surtitre, titre: l.titre, textes: [l.chapo] })}

    <section class="section">
      <div class="conteneur legale">
        <nav class="legale__sommaire" aria-label="Sommaire">
          <p class="surtitre"><span class="surtitre__trait"></span><span>Sommaire</span></p>
          <ol>${l.sections.map((s, i) => `<li><a href="#${ancre(i)}">${s[0]}</a></li>`).join('')}</ol>
        </nav>
        <div class="legale__corps">
${l.sections.map(([titre, ...paras], i) => `          <section id="${ancre(i)}"><h2>${titre}</h2>${paras.join('')}</section>`).join('\n')}
          <p class="legale__maj">Dernière mise à jour : <span class="apc">[À COMPLÉTER]</span></p>
        </div>
      </div>
    </section>`;
}

/* ========================================================= génération === */
const pages = [
  { fichier: 'index.html', rubrique: 'accueil', titre: "M2NB & Partners Law Firm — Cabinet d'avocats à Yaoundé, Cameroun",
    description: "Cabinet d'avocats établi à Yaoundé. Conseil, assistance et représentation juridique des entreprises, dirigeants, institutions et particuliers.", rendu: accueil },
  { fichier: 'cabinet.html', rubrique: 'cabinet', titre: 'Le cabinet — M2NB & Partners Law Firm',
    description: "Une pratique juridique fondée sur l'expérience et la confiance : approche, mission, vision, valeurs et méthode.", rendu: pageCabinet },
  { fichier: 'services.html', rubrique: 'services', titre: 'Nos services — M2NB & Partners Law Firm',
    description: "Sept domaines d'intervention : affaires, sociétés, contrats, contentieux, arbitrage, droit social et conseil juridique.", rendu: pageServices },
  ...DOMAINES.map((d, i) => ({ fichier: d.fichier, rubrique: 'services', titre: `${d.titre} — M2NB & Partners Law Firm`,
    description: `${d.accroche}. ${d.resume}`, rendu: () => pageDomaine(d, i) })),
  { fichier: 'equipe.html', rubrique: 'equipe', titre: 'Notre équipe — M2NB & Partners Law Firm',
    description: 'Des professionnels engagés à vos côtés : rigueur, engagement, confidentialité et qualité du conseil.', rendu: pageEquipe },
  { fichier: 'me-clovis-metang-njike.html', rubrique: 'equipe', titre: 'Me Clovis METANG NJIKE — M2NB & Partners Law Firm',
    description: 'Avocat au Barreau du Cameroun, fondateur et avocat associé de M2NB & Partners. Serment prêté le 16 novembre 2001.', rendu: pageProfil },
  { fichier: 'references.html', rubrique: 'references', titre: 'Nos références — M2NB & Partners Law Firm',
    description: 'Une expérience construite dans la pratique, dans le respect de la confidentialité due à chaque client.', rendu: pageReferences },
  { fichier: 'actualites.html', rubrique: 'actualites', titre: 'Actualités — M2NB & Partners Law Firm',
    description: 'Analyses, notes juridiques et actualités publiées par le Cabinet.', rendu: pageActualites },
  { fichier: 'contact.html', rubrique: 'contact', titre: 'Contact — M2NB & Partners Law Firm', sansAppel: true,
    description: 'Parlons de votre situation. Cabinet M2NB & Partners Law Firm, Yaoundé, Cameroun.', rendu: pageContact },
  ...LEGALES.map(l => ({ fichier: l.file, rubrique: '', titre: l.title, description: l.desc, rendu: () => pageLegale(l) }))
];

fs.mkdirSync(path.join(RACINE, 'assets/js'), { recursive: true });
fs.mkdirSync(path.join(RACINE, 'en'), { recursive: true });

const TRAD = require('./traduction.js');
const paires = TRAD.dictionnaire();

for (const p of pages) {
  const fr = documentHtml(p, p.rendu());
  fs.writeFileSync(path.join(RACINE, p.fichier), fr);

  /* Version anglaise : mêmes gabarits, textes traduits, sélecteur et liens inversés */
  let en = fr
    .split(selecteurLangue(p, '', 'fr')).join(selecteurLangue(p, '', 'en'))
    .split(selecteurLangue(p, 'mobile', 'fr')).join(selecteurLangue(p, 'mobile', 'en'))
    .split(alternatives(p, 'fr')).join(alternatives(p, 'en'));
  en = TRAD.traduitPage(en, paires);
  fs.writeFileSync(path.join(RACINE, 'en', p.fichier), en);
}
fs.copyFileSync(path.join(__dirname, 'site.js'), path.join(RACINE, 'assets/js/site.js'));
console.log('Pages générées :', pages.length);
