# M2NB & Partners Law Firm — site vitrine

Site statique (HTML/CSS/JS, sans dépendance) : il s'ouvre tel quel dans un navigateur et se publie
sur n'importe quel hébergement de fichiers statiques.

Les contenus proviennent de la maquette Claude Design `M2NB Accueil.dc.html` ; la direction
artistique a ensuite été entièrement refondue (système de design écrit sur mesure).

## Direction artistique

- **Typographie éditoriale** : Instrument Serif en très grand corps, mots-clés en italique doré,
  Manrope pour le texte courant. Sections numérotées « (01) — Le cabinet ».
- **Charte « Bordeaux & Laiton »** : bordeaux (`#6B1C2A`, repris du « 2 » du logo), encre chaude
  (`#1D1614`), laiton champagne (`#B08D57` / `#D9BF8C`) et ivoire (`#F7F2EB`), avec grain
  photographique sur les aplats sombres. Toutes les couleurs sont des variables en tête de
  `assets/css/site.css` : changer de charte revient à modifier ce bloc `:root`.
- **Éléments signature** :
  - héros d'accueil en **diaporama de 3 slides** (Le cabinet / Nos domaines / Notre équipe),
    défilement automatique toutes les 7 s synchronisé sur une barre de progression, pause au survol
    et au focus, onglets, flèches et glissement au doigt ; chiffres clés détachés dans un bandeau ;
  - ouverture animée au logo (première visite de la session) et rideau entre les pages ;
  - titres révélés mot à mot, images dévoilées par un masque, parallaxe douce ;
  - sceaux circulaires à texte tournant (« Avocat au Barreau du Cameroun • Depuis 2001 ») ;
  - bande défilante des sept domaines ;
  - liste des domaines avec aperçu photo qui suit le pointeur ;
  - citation dont les mots s'allument au fil de la lecture ;
  - engagements en liste épinglée avec compteur de progression ;
  - bento de cartes photo sur la page Services ;
  - carrousel de l'équipe à défilement automatique (5,5 s), en pause au survol et au focus ;
  - méga-menu « Nos services » avec visuel qui change au survol ;
  - curseur personnalisé et boutons magnétiques (ordinateur uniquement) ;
  - bandeau bordeaux à bouton rotatif « Prendre rendez-vous ».
- **Barre de navigation** blanche translucide (flou d'arrière-plan), qui se masque en descendant et
  réapparaît en remontant, avec une jauge de lecture dorée. Onglets : Accueil, Le cabinet, Nos
  services (méga-menu), Notre équipe, Nos références, Actualités, Contact ; menu plein écran sous
  1320 px.
- **Site bilingue** : version française à la racine, version anglaise dans `/en/`. Sélecteur de
  langue en menu déroulant (drapeaux en SVG, lisibles aussi sous Windows), présent aussi dans le
  menu mobile, qui pointe toujours vers la même page dans l'autre langue. Balises `hreflang`
  déclarées dans chaque page.
- **Héros** : photographies floutées sous voile noir sur toutes les pages.

## Pages

| Fichier | Page |
| --- | --- |
| `index.html` | Accueil |
| `cabinet.html` | Le cabinet — approche, mission, vision, valeurs, méthode |
| `services.html` | Nos services — bento des 7 domaines |
| `droit-des-affaires.html`, `droit-des-societes.html`, `droit-commercial-contrats.html`, `contentieux.html`, `arbitrage-mediation.html`, `droit-du-travail.html`, `conseil-juridique.html` | Fiches domaines |
| `equipe.html` | Notre équipe — carrousel manuel des 11 membres |
| `me-clovis-metang-njike.html` | Profil du fondateur |
| `references.html` | Nos références |
| `actualites.html` | Actualités et lettre d'information |
| `contact.html` | Contact et formulaire |
| `mentions-legales.html`, `confidentialite.html` | Pages légales *(trames à valider)* |

## Modifier le site

Les pages HTML sont **générées** : ne pas les éditer directement.

```bash
node tools/build.js      # régénère les 17 pages et copie tools/site.js vers assets/js/site.js
```

| Fichier | Rôle |
| --- | --- |
| `tools/contenu.js` | Textes : domaines (accroches, interventions, images), engagements, valeurs, équipe |
| `tools/legal.js` | Contenu des pages légales |
| `tools/contenu-en.js` | Traduction anglaise des contenus métier (domaines, engagements, valeurs, fonctions) |
| `tools/traduction.js` | Dictionnaire français → anglais des textes d'interface et fabrication des pages `/en/` |
| `tools/verifie-traduction.js` | Contrôle : signale toute chaîne restée en français dans `/en/` |
| `tools/build.js` | Gabarits de toutes les pages, en-tête, méga-menu, pied de page |
| `tools/site.js` | Interactions (copié dans `assets/js/site.js` à la génération) |
| `assets/css/site.css` | Système de design complet (modifiable directement) |
| `img/` | Logos et fichiers sources fournis par le Cabinet |
| `img/equipe/` | Portraits de l'équipe optimisés pour le web (WebP + repli JPEG) |
| `img/photos/` | Photographies d'illustration (+ `CREDITS.json`) |

### Portraits de l'équipe

Les 11 portraits fournis (PNG d'environ 2 Mo chacun, 22 Mo au total) ont été redimensionnés à
900 px de large et convertis : **846 ko en WebP pour les 11**, avec un repli JPEG. Le site
n'utilise que `img/equipe/` ; les PNG d'origine et `Doc1.pdf` restent dans `img/` comme archive et
**peuvent être retirés du serveur** lors de la mise en ligne.

Pour ajouter ou modifier un membre : déposer le portrait dans `img/equipe/`, compléter la table
`EQUIPE` de `tools/contenu.js` (nom, fonction, groupe, photo, et `lien` si une fiche existe), puis
relancer la génération.

### Version anglaise

Les pages anglaises sont **générées à partir des pages françaises** : mêmes gabarits, mêmes
images, textes traduits. Deux sources de traduction :

1. `tools/contenu-en.js` — contenus métier, appariés automatiquement entrée par entrée avec
   `tools/contenu.js` (si vous ajoutez un domaine en français, ajoutez-le au même rang en anglais) ;
2. `tools/traduction.js` — textes d'interface, sous forme de paires « français → anglais ».

Après chaque génération, lancer le contrôle :

```bash
node tools/verifie-traduction.js   # doit afficher : aucune chaîne française détectée
```

Il signale les chaînes non traduites et celles qui « sentent » encore le français. Les messages
produits par le JavaScript (formulaires, carrousel) suivent la langue de la page via l'attribut
`lang` du document.

## Qualité

- Responsive vérifié à 390, 768, 1024 et 1440 px sur les 24 pages principales (français et
  anglais), sans défilement horizontal ; menu plein écran sous 1320 px.
- Accessibilité : lien d'évitement, fil d'Ariane, `aria-current`, menus clavier (`Échap`),
  étiquettes de formulaire, textes alternatifs, contrastes AA.
- **Animations entièrement désactivées** si l'utilisateur a activé « réduire les animations »
  (le diaporama ne défile alors plus tout seul) ; sans JavaScript, tout le contenu reste visible.
- **Apparitions fiables** : les images se dévoilent par un volet (sans rogner l'image) et chaque
  élément est révélé dès qu'il est passé à l'écran, y compris lors d'un défilement rapide — ce qui
  corrige les images qui ne s'affichaient parfois pas dans « Le cabinet » et « Notre équipe ».
  Vérifié en navigateur piloté en temps réel.
- Référencement : titres et descriptions par page, Open Graph, données structurées `LegalService`.
- Performance : WebP, chargement différé, animations limitées à `transform`/`opacity`.

## À valider ou compléter avant mise en ligne

1. **Intitulés de sections ajoutés lors de la refonte** — les textes de fond viennent de la maquette,
   mais certains titres et phrases de liaison ont été rédigés pour la nouvelle mise en page :
   « Cinq exigences, une méthode », « Sept expertises, une même exigence », « Une équipe, un même
   cap », « Ce que nous faisons pour vous », « Poursuivre l'exploration », « Depuis 2001, au
   Cameroun », « La confiance se protège », « De l'écoute à la défense », « Un accompagnement
   orienté solutions », « Une relation durable », « Plus de deux décennies de conseil, d'assistance
   et de défense », la phrase d'introduction des domaines sur l'accueil, et les consignes
   « Survolez un domaine… » / « Parcourez les membres… », ainsi que la slide 2 du diaporama
   (« Conseil, assistance et représentation juridique. », assemblée à partir de phrases de la
   maquette). À relire par le Cabinet.
2. **Coordonnées** — adresse, téléphone et e-mail `[À confirmer]` (page Contact, pages légales).
3. **Formulaires** — non reliés à un service d'envoi : renseigner `DESTINATAIRE` dans
   `tools/site.js` ou brancher l'attribut `action`, puis régénérer.
4. **Fiches individuelles** — seul Me Clovis METANG NJIKE dispose d'une page de profil (sa
   biographie figurait dans la maquette). Les dix autres membres affichent « Profil à venir » :
   fournir un texte de présentation par membre pour créer leurs fiches.
5. **Références et actualités** — gabarits `[Titre…]`, conformes à la maquette.
6. **Pages légales** — forme juridique, hébergeur, durées de conservation.
7. **Traduction anglaise** — relire les textes d'interface et surtout les **pages légales
   anglaises**, traduites à titre indicatif : la version française fait foi.
8. **Actualités (version anglaise)** — votre traduction prévoyait aussi une liste de catégories et
   six titres d'articles « à préparer ». Ils ne sont pas publiés : dites-moi si vous voulez les
   ajouter (dans les deux langues).
9. **Photographies d'illustration** — images Unsplash (hors portraits de l'équipe, qui sont ceux
   du Cabinet), à remplacer par des visuels du cabinet si disponibles.
