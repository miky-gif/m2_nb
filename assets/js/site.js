/* M2NB & Partners — interactions du site.
   Tout est progressif : sans JavaScript ou avec « réduire les animations », le contenu reste lisible et complet. */
(function () {
  'use strict';

  var doc = document.documentElement;
  var reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pointeurFin = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var premiereVisite = doc.classList.contains('premiere-visite');
  /* Messages produits par le JavaScript, dans la langue de la page */
  var EN = doc.lang === 'en';
  var T = {
    ouvrirMenu: EN ? 'Open the menu' : 'Ouvrir le menu',
    fermerMenu: EN ? 'Close the menu' : 'Fermer le menu',
    position: EN ? 'Go to position ' : 'Aller à la position ',
    membres: EN ? function (a, b, n) { return 'Members ' + a + ' to ' + b + ' of ' + n; }
                : function (a, b, n) { return 'Membres ' + a + ' à ' + b + ' sur ' + n; },
    sansDestinataire: EN
      ? 'The form is not yet connected to a recipient address. Set DESTINATAIRE in tools/site.js, or connect the form to your host’s mail service.'
      : 'Le formulaire n’est pas encore relié à une adresse de réception. Renseignez DESTINATAIRE dans tools/site.js, ou branchez le formulaire sur le service d’envoi de votre hébergeur.',
    messagerie: EN
      ? 'Your mail application opens with the request pre-filled. All that is left is to send it.'
      : 'Votre messagerie s’ouvre avec la demande pré-remplie. Il ne reste qu’à l’envoyer.',
    lettre: EN
      ? 'Newsletter sign-up is not active yet. Connect this form to your emailing tool to enable it.'
      : 'L’inscription à la lettre d’information n’est pas encore active. Reliez ce formulaire à votre outil d’emailing pour l’activer.',
    objet: EN ? 'Contact request' : 'Demande de contact',
    champs: EN ? ['Name: ', 'Company / Organization: ', 'Phone: ', 'Email: '] : ['Nom : ', 'Entreprise / Organisation : ', 'Téléphone : ', 'E-mail : ']
  };

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ------------------------------------------------------- ouverture ---- */
  var ouverture = $('.ouverture');
  if (ouverture && premiereVisite) {
    ouverture.classList.add('est-active');
    try { sessionStorage.setItem('m2nb-vu', '1'); } catch (e) {}
    setTimeout(function () { ouverture.classList.add('est-finie'); }, 1250);
    setTimeout(function () { ouverture.remove(); doc.classList.remove('premiere-visite'); }, 2300);
  }
  var delaiDepart = premiereVisite ? 1200 : (doc.classList.contains('depuis-rideau') ? 250 : 0);

  /* ---------------------------------------------- transitions de page ---- */
  var rideau = $('.rideau');
  if (rideau && !reduit) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || a.target === '_blank' || a.hasAttribute('download')) return;
      var url = new URL(a.href, location.href);
      if (url.origin !== location.origin || !/\.html$/.test(url.pathname)) return;
      if (url.pathname === location.pathname && url.hash) return;
      e.preventDefault();
      try { sessionStorage.setItem('m2nb-rideau', '1'); } catch (err) {}
      rideau.classList.add('est-entrant');
      setTimeout(function () { location.href = a.href; }, 520);
    });
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) { rideau.classList.remove('est-entrant'); doc.classList.remove('depuis-rideau'); }
    });
  }

  /* ---------------------------------------------------------- en-tête ---- */
  var entete = $('[data-entete]');
  var dernierY = window.scrollY;
  var menuOuvert = false;
  function surDefilement() {
    var y = window.scrollY;
    var max = doc.scrollHeight - window.innerHeight;
    if (entete) {
      entete.classList.toggle('est-defile', y > 40);
      var descend = y > dernierY && y > 400;
      var survole = entete.matches(':hover') || entete.contains(document.activeElement);
      entete.classList.toggle('est-cache', descend && !menuOuvert && !survole);
      entete.style.setProperty('--progression', max > 0 ? (y / max).toFixed(4) : 0);
    }
    dernierY = y;
  }

  /* ------------------------------------------------------ méga-menu ---- */
  $$('[data-mega]').forEach(function (mega) {
    var liens = $$('[data-mega-index]', mega);
    var images = $$('[data-mega-image]', mega);
    var titre = $('[data-mega-titre]', mega);
    var accroche = $('[data-mega-accroche]', mega);
    function active(i) {
      liens.forEach(function (l, j) { l.classList.toggle('est-survole', i === j); });
      images.forEach(function (img, j) { img.classList.toggle('est-visible', i === j); });
      if (titre) titre.textContent = liens[i].querySelector('.mega__titre').textContent;
      if (accroche) accroche.textContent = liens[i].dataset.accroche || '';
    }
    liens.forEach(function (l, i) {
      l.addEventListener('mouseenter', function () { active(i); });
      l.addEventListener('focus', function () { active(i); });
    });
  });

  /* ------------------------------------------------ sélecteur de langue --- */
  $$('[data-langue]').forEach(function (bloc) {
    var bouton = $('.langue__bouton', bloc);
    function bascule(ouvrir) {
      bloc.classList.toggle('est-ouvert', ouvrir);
      bouton.setAttribute('aria-expanded', String(ouvrir));
    }
    bouton.addEventListener('click', function (e) {
      e.stopPropagation();
      bascule(!bloc.classList.contains('est-ouvert'));
    });
    document.addEventListener('click', function (e) { if (!bloc.contains(e.target)) bascule(false); });
    bloc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && bloc.classList.contains('est-ouvert')) { e.stopPropagation(); bascule(false); bouton.focus(); }
    });
    bloc.addEventListener('focusout', function () {
      setTimeout(function () { if (!bloc.contains(document.activeElement)) bascule(false); }, 0);
    });
  });

  /* ---------------------------------------------------- menu mobile ---- */
  var burger = $('.burger');
  var menu = $('#menu-mobile');
  function basculeMenu(ouvrir) {
    menuOuvert = ouvrir;
    burger.setAttribute('aria-expanded', String(ouvrir));
    burger.setAttribute('aria-label', ouvrir ? T.fermerMenu : T.ouvrirMenu);
    menu.classList.toggle('est-ouvert', ouvrir);
    document.body.classList.toggle('menu-ouvert', ouvrir);
    $$('.menu-mobile__lien', menu).forEach(function (l, i) { l.style.transitionDelay = ouvrir ? (0.15 + i * 0.05) + 's' : '0s'; });
    if (entete) entete.classList.remove('est-cache');
  }
  if (burger && menu) {
    burger.addEventListener('click', function () { basculeMenu(burger.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuOuvert) { basculeMenu(false); burger.focus(); }
    });
  }

  /* ------------------------------------------- découpage en mots ------- */
  function decoupe(el) {
    var index = 0;
    (function traite(noeud) {
      Array.prototype.slice.call(noeud.childNodes).forEach(function (enfant) {
        if (enfant.nodeType === 1) { traite(enfant); return; }
        if (enfant.nodeType !== 3) return;
        var frag = document.createDocumentFragment();
        enfant.textContent.split(/(\s+)/).forEach(function (morceau) {
          if (!morceau) return;
          if (/^\s+$/.test(morceau)) { frag.appendChild(document.createTextNode(' ')); return; }
          var mot = document.createElement('span');
          mot.className = 'mot';
          var dedans = document.createElement('span');
          dedans.className = 'mot__in';
          dedans.style.setProperty('--i', index++);
          dedans.textContent = morceau;
          mot.appendChild(dedans);
          frag.appendChild(mot);
        });
        enfant.replaceWith(frag);
      });
    })(el);
  }
  if (!reduit) $$('[data-lignes], [data-mots]').forEach(decoupe);

  /* ------------------------------------------ diaporama du héros ------- */
  $$('[data-diaporama]').forEach(function (hero) {
    var diapos = $$('[data-diapo]', hero);
    var fonds = $$('[data-diapo-fond]', hero);
    var images = $$('[data-diapo-image]', hero);
    var onglets = $$('[data-onglet]', hero);
    var n = diapos.length, index = 0;
    hero.style.setProperty('--duree-diapo', '7s');

    function montre(i) {
      index = (i + n) % n;
      onglets.forEach(function (o) { o.classList.remove('est-active'); });
      void hero.offsetWidth; /* relance l'animation de la barre de progression */
      diapos.forEach(function (d, j) {
        var actif = j === index;
        d.classList.toggle('est-active', actif);
        d.classList.remove('est-joue');
        if (actif) {
          d.removeAttribute('aria-hidden'); d.removeAttribute('inert');
          requestAnimationFrame(function () { requestAnimationFrame(function () { d.classList.add('est-joue'); }); });
        } else {
          d.setAttribute('aria-hidden', 'true'); d.setAttribute('inert', '');
        }
      });
      fonds.forEach(function (f, j) { f.classList.toggle('est-active', j === index); });
      images.forEach(function (img, j) { img.classList.toggle('est-active', j === index); });
      onglets.forEach(function (o, j) {
        o.classList.toggle('est-active', j === index);
        o.classList.toggle('est-vue', j < index);
        if (j === index) o.setAttribute('aria-current', 'true'); else o.removeAttribute('aria-current');
      });
    }

    onglets.forEach(function (o, j) { o.addEventListener('click', function () { montre(j); }); });
    var prec = $('[data-diapo-prec]', hero), suiv = $('[data-diapo-suiv]', hero);
    if (prec) prec.addEventListener('click', function () { montre(index - 1); });
    if (suiv) suiv.addEventListener('click', function () { montre(index + 1); });

    /* Avance automatique : à la fin de la barre de progression de l'onglet actif.
       Désactivée si l'utilisateur préfère réduire les animations. */
    if (!reduit) {
      onglets.forEach(function (o) {
        o.addEventListener('animationend', function (e) {
          if (e.animationName === 'progression-diapo' && o.classList.contains('est-active')) montre(index + 1);
        });
      });
    }
    function pause(oui) { hero.classList.toggle('est-en-pause', oui); }
    hero.addEventListener('mouseenter', function () { pause(true); });
    hero.addEventListener('mouseleave', function () { pause(false); });
    hero.addEventListener('focusin', function () { pause(true); });
    hero.addEventListener('focusout', function () { if (!hero.contains(document.activeElement)) pause(false); });
    document.addEventListener('visibilitychange', function () { pause(document.hidden); });

    var departX = null;
    hero.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') departX = e.clientX; });
    hero.addEventListener('pointerup', function (e) {
      if (departX === null) return;
      var delta = e.clientX - departX;
      if (Math.abs(delta) > 60) montre(index + (delta < 0 ? 1 : -1));
      departX = null;
    });

    /* la première diapositive s'anime une fois l'ouverture terminée */
    diapos[0].classList.remove('est-joue');
    setTimeout(function () { diapos[0].classList.add('est-joue'); }, delaiDepart + 60);
  });

  /* Mots qui s'allument au fil de la lecture */
  var lumieres = $$('[data-lumiere]').map(function (el) {
    var mots = el.textContent.trim().split(/\s+/);
    el.innerHTML = mots.map(function (m) { return '<span class="mot-lumiere">' + m.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span>'; }).join(' ');
    return { el: el, mots: $$('.mot-lumiere', el) };
  });
  function allume() {
    var h = window.innerHeight;
    lumieres.forEach(function (l) {
      var r = l.el.getBoundingClientRect();
      var avance = Math.min(1, Math.max(0, (h * 0.85 - r.top) / (r.height + h * 0.35)));
      var n = Math.round(avance * l.mots.length);
      l.mots.forEach(function (m, i) { m.classList.toggle('est-allume', i < n); });
    });
  }

  /* ------------------------------------------------------ révélations --- */
  var aReveler = $$('[data-apparition], [data-lignes], [data-trait], .etape');
  var enSuspens = [];          /* éléments pas encore révélés */
  var revelationsLancees = false;
  function revele(el) {
    if (el.classList.contains('est-visible')) return;
    el.classList.add('est-visible');
    $$('[data-compteur]', el).forEach(compte);
  }
  /* Double garantie : l'observateur ET une vérification à chaque défilement.
     Un élément entré à l'écran est toujours révélé, même si l'observateur a manqué l'événement. */
  function verifieSuspens() {
    if (!revelationsLancees || !enSuspens.length) return;
    var h = window.innerHeight;
    enSuspens = enSuspens.filter(function (el) {
      var r = el.getBoundingClientRect();
      /* y compris ce qui a été « sauté » par un défilement rapide (déjà au-dessus de l'écran) */
      if (r.top < h * 0.92) { revele(el); return false; }
      return !el.classList.contains('est-visible');
    });
  }
  function lanceRevelations() {
    revelationsLancees = true;
    if (reduit || !('IntersectionObserver' in window)) { aReveler.forEach(revele); $$('[data-compteur]').forEach(compte); return; }
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (!e.isIntersecting) return;
        revele(e.target);
        obs.unobserve(e.target);
        verifieSuspens();
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    aReveler.forEach(function (el) {
      /* ce qui est déjà à l'écran au chargement apparaît tout de suite */
      if (el.getBoundingClientRect().top < window.innerHeight) revele(el);
      else { obs.observe(el); enSuspens.push(el); }
    });
  }
  setTimeout(lanceRevelations, delaiDepart);

  /* -------------------------------------------------------- compteurs ---- */
  function compte(el) {
    if (el.dataset.compte) return;
    el.dataset.compte = '1';
    var fin = parseInt(el.dataset.compteur, 10);
    var debut = parseInt(el.dataset.depart || '0', 10);
    if (reduit) { el.textContent = fin; return; }
    var t0 = null, duree = 1800;
    function pas(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / duree);
      el.textContent = Math.round(debut + (fin - debut) * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(pas);
    }
    el.textContent = debut;
    requestAnimationFrame(pas);
  }

  /* -------------------------------------------------------- parallaxe ---- */
  var parallaxes = reduit ? [] : $$('[data-parallaxe]');
  function parallaxe() {
    var h = window.innerHeight;
    parallaxes.forEach(function (el) {
      var r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > h + 200) return;
      var limite = r.height * 0.14;
      var decalage = Math.max(-limite, Math.min(limite, (r.top + r.height / 2 - h / 2) * parseFloat(el.dataset.parallaxe)));
      el.style.transform = 'translate3d(0,' + decalage.toFixed(1) + 'px,0)';
    });
  }

  /* ------------------------------------------------------ engagements ---- */
  $$('[data-engagements]').forEach(function (bloc) {
    var items = $$('.engagement', bloc);
    var numero = $('[data-engagement-num]', bloc);
    var barre = $('.engagements__barre', bloc);
    if (!('IntersectionObserver' in window)) return;
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (!e.isIntersecting) return;
        var i = items.indexOf(e.target);
        items.forEach(function (it, j) { it.classList.toggle('est-actif', j === i); });
        if (numero) numero.textContent = String(i + 1).padStart(2, '0');
        if (barre) barre.style.setProperty('--avance', ((i + 1) / items.length).toFixed(3));
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    items.forEach(function (it) { obs.observe(it); });
  });

  /* ------------------------------------------------ aperçu flottant ---- */
  var apercu = $('.apercu');
  var listeApercus = $('[data-apercus]');
  if (apercu && listeApercus && pointeurFin && !reduit) {
    var lignes = $$('[data-apercu]', listeApercus);
    lignes.forEach(function (l) {
      var img = new Image();
      img.src = l.dataset.image; img.alt = ''; img.dataset.pour = l.dataset.apercu;
      apercu.appendChild(img);
    });
    var cible = { x: 0, y: 0 }, pos = { x: 0, y: 0 }, anime = false;
    function suit() {
      pos.x += (cible.x - pos.x) * 0.14;
      pos.y += (cible.y - pos.y) * 0.14;
      apercu.style.transform = 'translate3d(' + (pos.x + 60).toFixed(1) + 'px,' + (pos.y - 40).toFixed(1) + 'px,0) translate(-50%,-50%)';
      if (anime) requestAnimationFrame(suit);
    }
    listeApercus.addEventListener('mousemove', function (e) { cible.x = e.clientX; cible.y = e.clientY; });
    lignes.forEach(function (l) {
      l.addEventListener('mouseenter', function (e) {
        if (!anime) { pos.x = cible.x = e.clientX; pos.y = cible.y = e.clientY; anime = true; requestAnimationFrame(suit); }
        apercu.classList.add('est-visible');
        $$('img', apercu).forEach(function (img) { img.classList.toggle('est-visible', img.dataset.pour === l.dataset.apercu); });
      });
    });
    listeApercus.addEventListener('mouseleave', function () { apercu.classList.remove('est-visible'); anime = false; });
  }

  /* ------------------------------------------------------------ curseur --- */
  var curseur = $('.curseur'), anneau = $('.curseur-anneau');
  if (curseur && anneau && pointeurFin && !reduit) {
    var cx = -100, cy = -100, ax = -100, ay = -100;
    var libelle = $('span', anneau);
    document.addEventListener('mousemove', function (e) {
      cx = e.clientX; cy = e.clientY;
      curseur.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
      doc.classList.add('avec-curseur');
    });
    document.addEventListener('mouseleave', function () { doc.classList.remove('avec-curseur'); });
    (function boucle() {
      ax += (cx - ax) * 0.18; ay += (cy - ay) * 0.18;
      anneau.style.transform = 'translate3d(' + ax.toFixed(1) + 'px,' + ay.toFixed(1) + 'px,0)';
      requestAnimationFrame(boucle);
    })();
    document.addEventListener('mouseover', function (e) {
      var zone = e.target.closest('[data-curseur]');
      var lien = e.target.closest('a, button, input, textarea, label');
      anneau.classList.toggle('est-libelle', !!zone);
      anneau.classList.toggle('est-lien', !zone && !!lien);
      libelle.textContent = zone ? zone.dataset.curseur : '';
    });
  }

  /* Boutons magnétiques */
  if (pointeurFin && !reduit) {
    $$('[data-magnetique], .bouton, .carrousel-fleche').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.2).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.28).toFixed(1) + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ------------------------------------------------ carrousel équipe ---- */
  $$('[data-carrousel]').forEach(function (carrousel) {
    var piste = $('.carrousel-piste', carrousel);
    var cartes = Array.prototype.slice.call(piste.children);
    var prec = $('[data-prec]', carrousel), suiv = $('[data-suiv]', carrousel);
    var zonePoints = $('[data-points]', carrousel), annonce = $('[data-annonce]', carrousel);
    var index = 0;
    var intervalle = parseInt(carrousel.dataset.intervalle, 10) || 0;
    var minuteur = null, enPause = false;

    function ecart() { return parseFloat(getComputedStyle(piste).columnGap) || 22; }
    function parVue() {
      var carte = cartes[0].getBoundingClientRect().width;
      return Math.max(1, Math.round((piste.clientWidth + ecart()) / (carte + ecart())));
    }
    function maxIndex() { return Math.max(0, cartes.length - parVue()); }
    function place() {
      var carte = cartes[0].getBoundingClientRect().width;
      piste.style.transform = 'translateX(' + (-index * (carte + ecart())) + 'px)';
      var vue = parVue();
      cartes.forEach(function (c, i) {
        var visible = i >= index && i < index + vue;
        c.setAttribute('aria-hidden', visible ? 'false' : 'true');
        $$('a, button', c).forEach(function (f) { if (visible) f.removeAttribute('tabindex'); else f.setAttribute('tabindex', '-1'); });
      });
      $$('.carrousel-point', zonePoints).forEach(function (p, i) {
        p.classList.toggle('is-active', i === index);
        p.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
      if (annonce) annonce.textContent = T.membres(index + 1, Math.min(cartes.length, index + vue), cartes.length);
    }
    function va(n) { var max = maxIndex(); index = n > max ? 0 : (n < 0 ? max : n); place(); relance(); }

    /* Défilement automatique : suspendu au survol, au focus clavier, pendant un
       glissement et lorsque l'onglet passe en arrière-plan. Jamais actif si
       l'utilisateur a demandé à réduire les animations. */
    function relance() {
      clearInterval(minuteur);
      if (!intervalle || reduit || enPause || maxIndex() === 0) return;
      minuteur = setInterval(function () { index = index >= maxIndex() ? 0 : index + 1; place(); }, intervalle);
    }
    function pause(oui) { enPause = oui; relance(); }
    carrousel.addEventListener('mouseenter', function () { pause(true); });
    carrousel.addEventListener('mouseleave', function () { pause(false); });
    carrousel.addEventListener('focusin', function () { pause(true); });
    carrousel.addEventListener('focusout', function () { if (!carrousel.contains(document.activeElement)) pause(false); });
    document.addEventListener('visibilitychange', function () { pause(document.hidden); });
    function points() {
      zonePoints.innerHTML = '';
      for (var i = 0; i <= maxIndex(); i++) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'carrousel-point';
        b.setAttribute('aria-label', T.position + (i + 1));
        b.addEventListener('click', (function (n) { return function () { va(n); }; })(i));
        zonePoints.appendChild(b);
      }
    }
    if (prec) prec.addEventListener('click', function () { va(index - 1); });
    if (suiv) suiv.addEventListener('click', function () { va(index + 1); });

    var departX = null;
    piste.addEventListener('pointerdown', function (e) { departX = e.clientX; });
    piste.addEventListener('pointerup', function (e) {
      if (departX === null) return;
      var delta = e.clientX - departX;
      if (Math.abs(delta) > 50) va(index + (delta < 0 ? 1 : -1));
      departX = null;
    });
    var largeur = piste.clientWidth;
    window.addEventListener('resize', function () {
      if (piste.clientWidth === largeur) return;
      largeur = piste.clientWidth; points(); va(Math.min(index, maxIndex()));
    });
    points(); place(); relance();
  });

  /* ------------------------------------- défileur « autres domaines » ---- */
  $$('[data-defileur]').forEach(function (bloc) {
    var piste = $('[data-defileur-piste]', bloc);
    function pas() { var c = piste.firstElementChild; return c ? c.getBoundingClientRect().width + 18 : 300; }
    var p = $('[data-defileur-prec]', bloc), s = $('[data-defileur-suiv]', bloc);
    if (p) p.addEventListener('click', function () { piste.scrollBy({ left: -pas(), behavior: reduit ? 'auto' : 'smooth' }); });
    if (s) s.addEventListener('click', function () { piste.scrollBy({ left: pas(), behavior: reduit ? 'auto' : 'smooth' }); });
  });

  /* ------------------------------------------------------- formulaires --- */
  /* Site statique : à défaut de service d'envoi, la demande est préparée dans la
     messagerie du visiteur. Renseigner DESTINATAIRE ou brancher l'attribut action. */
  var DESTINATAIRE = '';   // ex. 'contact@m2nb-partners.cm'
  function statut(form, message) {
    var p = $('.form-statut', form);
    if (!p) return;
    p.textContent = message; p.hidden = false;
  }
  var contact = $('.form-contact');
  if (contact) {
    contact.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contact.reportValidity()) return;
      var v = function (n) { var el = contact.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; };
      if (!DESTINATAIRE) {
        statut(contact, T.sansDestinataire);
        return;
      }
      var corps = [T.champs[0] + v('nom'), T.champs[1] + v('organisation'), T.champs[2] + v('telephone'), T.champs[3] + v('email'), '', v('message')].join('\n');
      window.location.href = 'mailto:' + DESTINATAIRE + '?subject=' + encodeURIComponent('[Site] ' + (v('objet') || T.objet)) + '&body=' + encodeURIComponent(corps);
      statut(contact, T.messagerie);
    });
  }
  var lettre = $('.form-newsletter');
  if (lettre) {
    lettre.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!lettre.reportValidity()) return;
      statut(lettre, T.lettre);
    });
  }

  /* ----------------------------------------------------- boucle scroll --- */
  var enAttente = false;
  function trame() { surDefilement(); parallaxe(); allume(); verifieSuspens(); enAttente = false; }
  window.addEventListener('scroll', function () { if (!enAttente) { enAttente = true; requestAnimationFrame(trame); } }, { passive: true });
  window.addEventListener('resize', trame);
  trame();

  $$('[data-annee]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
