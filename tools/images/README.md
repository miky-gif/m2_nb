# Atelier d'images

Les visuels d'illustration du site sont des images de synthèse. Elles ont été
produites à part, déposées dans `img/image generer/`, puis reprises par
`importer.js` sous les noms attendus par le cahier des charges. Les photos
Unsplash de la maquette ont toutes été remplacées.

Les portraits de l'équipe, dans `img/equipe/`, sont de vraies photographies
et ne passent par aucun de ces scripts.

Trois visuels manquent encore et deux sont provisoires ; la liste à jour, avec
les prompts prêts à coller, sort de :

```
node tools/images/generer.js --manquants      # écrit aussi img/A-GENERER.md
```

Aucune dépendance à installer : les scripts pilotent le navigateur déjà
présent sur le poste (Edge ou Chrome) et s'en servent comme atelier
graphique. Si l'exécutable n'est pas trouvé, indiquez-le une fois pour toutes :

```
set NAVIGATEUR=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe
```

## Deux chemins possibles

**Le meilleur : photographier.** Une demi-journée avec un photographe dans les
locaux donne des images que personne d'autre n'a — les vrais bureaux, la vraie
salle de réunion, la vraie équipe. C'est ce qui distingue un site de cabinet
d'un catalogue. `briefs.js` contient, pour chaque image, le cadrage attendu et
la description à remettre au photographe.

**Le plus rapide : générer.** Pour la présentation au client, ou pour les
scènes impossibles à organiser, les mêmes briefs alimentent un service de
génération d'images.

Dans les deux cas, les fichiers d'origine se déposent dans `img/brut/`, et
`optimiser.js` les met aux bonnes dimensions.

## Les fichiers

| Fichier | Rôle |
|---|---|
| `briefs.js` | Le cahier des charges : 20 images, leur emplacement, leur format, leur brief en français et le prompt en anglais |
| `generer.js` | Appelle un service de génération d'images d'après les briefs |
| `optimiser.js` | Recadre, redimensionne et décline en JPEG + WebP |
| `logo.js` | Décline le logo du Cabinet (détourage, version claire, monogramme, favicon) |
| `portraits.js` | Prépare les portraits de l'équipe, avec effacement du sigle incrusté |
| `navigateur.js` | Socle commun : pilote le navigateur qui sert d'atelier |

## Faire le tour du cahier des charges

```
node tools/images/generer.js --liste            les 20 visuels et leur état
node tools/images/generer.js --brief            tous les briefs, en détail
node tools/images/generer.js --brief art-penal  un seul
```

Le tableau distingue trois cas : `à refaire` (une image est déjà en place),
`nouveau` (un emplacement se contente aujourd'hui d'une image empruntée à un
autre) et `photo` (à prendre sur place — l'entrée de l'immeuble Tsambou, que
personne ne peut inventer).

## Importer des images produites à la main

Quand les images viennent d'un outil de génération utilisé en dehors du
dépôt, elles arrivent avec un horodatage pour seul nom. `importer.js` tient
la correspondance entre ces fichiers et les noms du site, répare au passage
les défauts repérés, et note les recadrages décentrés pour l'optimiseur.

```
node tools/images/importer.js --liste    la correspondance, sans rien écrire
node tools/images/importer.js            copie vers img/brut/
```

Si vous régénérez une image, remplacez sa ligne dans la table `TABLE` en tête
du script : c'est le seul endroit où le choix est consigné.

## Générer

Renseignez la clé du service retenu, puis lancez le script. Rien n'est écrit
dans le dépôt : la clé reste dans votre session.

```
set OPENAI_API_KEY=sk-...                  (ou GEMINI_API_KEY, ou STABILITY_API_KEY)

node tools/images/generer.js --essai art-penal   une image, pour juger du rendu
node tools/images/generer.js                     tout ce qui manque
node tools/images/generer.js --tout              tout, y compris l'existant
```

Les images arrivent dans `img/brut/`. Elles ne partent pas en ligne
directement : regardez-les, supprimez celles qui ne conviennent pas, relancez
pour les remplacer. Comptez plusieurs essais par visuel — c'est normal.

## Mettre en ligne

```
node tools/images/optimiser.js        recadre img/brut/ vers img/photos/
node tools/images/optimiser.js --verifie   contrôle les poids
node tools/build.js                   republie les pages
```

`--verifie` signale les fichiers au-dessus de 260 Ko : au-delà, la page devient
lente sur un réseau mobile camerounais. `--reprend` repasse les images déjà en
ligne dans la moulinette, sans jamais les agrandir.

## Ce qu'il faut savoir avant de générer

- **Les personnes.** Le brief impose des professionnels africains à Yaoundé et
  interdit le regard caméra. Les images où figure quelqu'un portent
  `personnes: true` ; les autres reçoivent la consigne inverse, faute de quoi
  les moteurs peuplent volontiers les salles que l'on voulait vides.
- **Aucun texte dans l'image.** Les moteurs écrivent mal, et un faux mot
  juridique sur une photo de cabinet d'avocats se remarque.
- **Pas de photo de personne réelle générée.** Les portraits de l'équipe sont
  de vraies photographies ; ils ne passent jamais par `generer.js`.
- **Les droits.** Une image générée n'est pas protégée de la même manière
  qu'une photographie d'auteur. Pour un usage commercial durable, vérifiez les
  conditions du service retenu — elles varient et changent.
- **Les crédits.** `img/photos/CREDITS.json` décrit l'origine des visuels.
  Les mentions légales du site annoncent explicitement que les illustrations
  sont des images de synthèse et ne représentent ni des personnes réelles, ni
  les locaux du Cabinet : si vous remplacez une image par une photographie
  authentique, reprenez les deux textes.
