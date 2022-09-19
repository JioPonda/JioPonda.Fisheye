/******************************************************* FETCH & ID ***********************************************************/ 

/** ---------- FETCH DATA pour récupérer les infos des photographes du fichier JSON ---------- */
async function getPhotographers() {
  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => (photographers = data.photographers));
  return {photographers: [...photographers],};
}

/** ---------- FETCH DATA pour récupérer les infos média du fichier JSON ---------- */
const getMedias = async () => {
  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => (medias = data.media));

  return {medias: [...medias],};
};

/** ---------- Récupération et transformation en nombre de l'ID de la page photographe.html ---------- */
function getPhotographerId() {
  return parseInt(new URLSearchParams(window.location.search).get("id"));
}

/****************************************************** BASE *******************************************************************/ 

function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  console.log(data);
  const picture = `./assets/photographers/Photographers_ID_Photos/${portrait}`;

  /** ---------- CREATION DU GABARIT DE LA PAGE INDEX.HTML - PRESENTATION DES PHOTOGRAPHES ---------- */
  function getUserCardDOM() {
    /** LIEN vers la page du photographe - ajout de l'ID du photographe sur l'adresse HTML de la page photographer.html */
    const lien = document.createElement("a");
    lien.setAttribute("href", "./photographer.html?id=" + id);

    /** ARTICLE pour chaque photographe */
    const article = document.createElement("article");
    article.setAttribute("aria-label", "carte du photographe " + name);

    /** Portrait et nom du photographe */
    const div = document.createElement("div");

    /** Portrait du photographe */
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "portrait de " + name);

    /** Nom du photographe */
    const h2 = document.createElement("h2");
    h2.textContent = name;

    /** Légende du portrait du photographe */
    const legendPortait = document.createElement("div");

    /** Lieu de résidence du photographe */
    const h3 = document.createElement("h3");
    h3.textContent = city + ", " + country;

    /** Slogan du photographe */
    const h4 = document.createElement("h4");
    h4.textContent = tagline;

    /** Tarif journalier du photographe */
    const h5 = document.createElement("h5");
    h5.textContent = price + "€/jour";

    article.appendChild(div);
    article.appendChild(lien);
    lien.appendChild(div);
    div.appendChild(img);
    div.appendChild(h2);
    article.appendChild(legendPortait);
    legendPortait.appendChild(h3);
    legendPortait.appendChild(h4);
    legendPortait.appendChild(h5);
    return article;
  }

  /** ---------- CREATION DU GABARIT DU HEADER DE LA PAGE PHOTOGRAHER.HTML - PRESENTATION DU PHOTOGRAPHE ---------- */
  function getUserCardDOMPage() {
    const articlePage = document.createElement("section");
    const divProfil = document.createElement("div");

    /** Nom du photographe */
    const h1Page = document.createElement("h1");
    h1Page.textContent = name;

    /** Lieu de résidence du photographe */
    const h2Page = document.createElement("h2");
    h2Page.textContent = city + ", " + country;

    /** Slogan du photographe */
    const h3Page = document.createElement("h3");
    h3Page.textContent = tagline;

    /** Bouton pour accès au formulaire de contact du photographe */
    const btnContact = document.createElement("button");
    btnContact.setAttribute("class","contact-button");
    btnContact.setAttribute("onclick", "openModal()");
    btnContact.setAttribute("aria-label", "Contactez-moi");
    btnContact.textContent = "Contactez-moi";

    /** Portrait du photographe */
    const imgPage = document.createElement("img");
    imgPage.setAttribute("src", picture);
    imgPage.setAttribute("alt", "portrait du photographe");

    articlePage.appendChild(divProfil);
    divProfil.appendChild(h1Page);
    divProfil.appendChild(h2Page);
    divProfil.appendChild(h3Page);
    articlePage.appendChild(btnContact);
    articlePage.appendChild(imgPage);
    return articlePage;
  }

  /** ---------- CREATION DU GABARIT DU WIDGET DE LA PAGE PHOTOGRAHER.HTML - TARIF JOURNALIER ET LIKE DU PHOTOGRAPHE ---------- */
  function getUserCounterDOM() {
    /** Widget indiquant le tarif journalier et nombre de like du photographe */
    const asideWidget = document.createElement("aside");
    const counterLikes = document.createElement("div");

    /** Compteur de like */
    const counterLikesDisplay = document.createElement("span");
    counterLikesDisplay.setAttribute("class","counter-likes");
    const likeHeart = document.createElement("i");
    likeHeart.classList.add("fas", "fa-heart");
    likeHeart.setAttribute("alt", "like");
    likeHeart.setAttribute("role", "img");

    /** Tarif journalier du photographe */
    const priceWidget = document.createElement("div");
    const h5Widget = document.createElement("h5");
    h5Widget.textContent = price + "€/jour";

    asideWidget.appendChild(counterLikes);
    counterLikes.appendChild(counterLikesDisplay);
    counterLikes.appendChild(likeHeart);
    asideWidget.appendChild(priceWidget);
    priceWidget.appendChild(h5Widget);
    return asideWidget;
  }

  /** ---------- AFFICHAGE DU NOM DU PHOTOGRAPHE DANS LE FORMULAIRE DE CONTACT DE LA PAGE PHOTOGRAHER.HTML ---------- */
  function getUserContactDOM() {
    const contactName = document.createElement("span");
    contactName.textContent = name;
    return contactName;
  }

  return {name, id, city, country, tagline, price, picture, getUserCardDOM, getUserCardDOMPage, getUserCounterDOM, getUserContactDOM,};
}

/******************************************************* GALERY ***********************************************************/ 

function galeryFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  let srcMedia = `./assets/photographers/${photographerId}/`;
  if (image) {
    srcMedia += image;
  } else {
    srcMedia += video;
  }

  /** ---------- CREATION DU GABARIT DE LA GALERIE DES MEDIAS DU PHOTOGRAPHE ---------- */
  function getUserGaleryDOM() {
    /** FIGURES pour chaque médias */
    const figureGalery = document.createElement("figure");
    figureGalery.setAttribute( "class" , "media-figure");
    figureGalery.setAttribute("id", "figure-" + id);
    figureGalery.setAttribute("aria-label", "carte du média " + title);

    /** LEGENDES(TITRES et LIKES) des médias */
    const legendGalery = document.createElement("figcaption");

    /** TITRES des médias */
    const legendTitle = document.createElement("span");
    legendTitle.setAttribute( "class" ,"legend-title");
    legendTitle.textContent = title;

    /** LIKES des médias */
    const legendLike = document.createElement("div");
    legendLike.setAttribute( "class" , "legend-like");

    /** INPUT des likes */
    const likeInput = document.createElement("input");
    likeInput.setAttribute("type", "checkbox");
    likeInput.setAttribute("id", id);
    likeInput.setAttribute("class" , "like-input");
    likeInput.setAttribute("role", "img");
    likeInput.setAttribute("aria-label", "Bouton likes");
    likeInput.setAttribute("tabindex", "0");

    /** LABEL des likes */
    const likeLabel = document.createElement("label");
    likeLabel.setAttribute("for", id);
    likeLabel.setAttribute("class", "like-label");
    likeLabel.textContent = likes + " ";

    /** MEDIAS => vidéo ou image */
    if (image) {
      const imgPhoto = document.createElement("img");
      imgPhoto.setAttribute("class", "galery-medias");
      imgPhoto.setAttribute("src", srcMedia);
      imgPhoto.setAttribute("data-mediaid", id);
      imgPhoto.setAttribute("alt", title + ", closeup view");
      imgPhoto.setAttribute("role", "link");
      imgPhoto.setAttribute("tabindex", 0);
      figureGalery.appendChild(imgPhoto);
    } else {
      const vidPhoto = document.createElement("video");
      vidPhoto.setAttribute("class","galery-medias");
      vidPhoto.setAttribute("type", "video/mp4");
      vidPhoto.setAttribute("src", srcMedia);
      vidPhoto.setAttribute("data-mediaid", id);
      vidPhoto.setAttribute("alt", title + ", closeup view");
      vidPhoto.setAttribute("role", "link");
      vidPhoto.setAttribute("tabindex", 0);
      figureGalery.appendChild(vidPhoto);
    }

    figureGalery.appendChild(legendGalery);
    legendGalery.appendChild(legendTitle);
    legendGalery.appendChild(legendLike);
    legendLike.appendChild(likeInput);
    legendLike.appendChild(likeLabel);
    return figureGalery;
  }

  /** ---------- CREATION DU GABARIT DE LA LIGHTBOX ---------- */
  function getUserGaleryLightbox() {
    /** création du CONTAINER des SLIDES de la lightbox */
    const slidesContainer = document.createElement("div");
    slidesContainer.setAttribute("class", "slides-container");

    /** création des SLIDES de la lightbox */
    const slides = document.createElement("figure");
    slides.setAttribute("class", "slides");
    slidesContainer.appendChild(slides);

    /** MEDIAS => vidéo ou image */
    const slideMedia = document.createElement("div");
    slideMedia.setAttribute("id", "slide-media" + id);
    slideMedia.setAttribute("class","slide-media");
    slides.appendChild(slideMedia);
    if (image) {
      const imgPhotoLightbox = document.createElement("img");
      imgPhotoLightbox.setAttribute("src", srcMedia);
      imgPhotoLightbox.setAttribute("class","lightbox-modal-media");
      imgPhotoLightbox.setAttribute("alt", "");
      imgPhotoLightbox.setAttribute("tabindex", "1");
      slideMedia.appendChild(imgPhotoLightbox);
    } else {
      const vidPhotoLightbox = document.createElement("video");
      vidPhotoLightbox.setAttribute("controls", "");
      vidPhotoLightbox.setAttribute("src", srcMedia);
      vidPhotoLightbox.setAttribute("type", "video/mp4");
      vidPhotoLightbox.setAttribute("preload", "metadata");
      vidPhotoLightbox.setAttribute("class","lightbox-modal-media");
      vidPhotoLightbox.setAttribute("aria-label", title);
      vidPhotoLightbox.setAttribute("tabindex", "1");
      slideMedia.appendChild(vidPhotoLightbox);
    }

    /** LEGENDE(TITRE) des médias de la lightbox */
    const lightboxLegendTitle = document.createElement("figcaption");
    const titlePhoto = document.createElement("h4");
    titlePhoto.setAttribute("id", "title-photo");
    titlePhoto.textContent = title;

    slides.appendChild(lightboxLegendTitle);
    lightboxLegendTitle.appendChild(titlePhoto);
    return slidesContainer;
  }

  return {id, photographerId, title, image, video, likes, date, price, srcMedia, getUserGaleryDOM, getUserGaleryLightbox,};
}

/********************************************************* AFFICHAGE SUR LA PAGE PHOTOGRAPHER.HTML *****************************************************************/ 

/** ---------- Affichage du profil du photographe sur la page photographer.html ---------- */
function displayProfil() {
  const photographerProfilContainer = document.querySelector(".photograph-header");
  const widget = document.querySelector(".widget");
  const contact = document.querySelector(".nameContact");

  /** Boucle dans les photographes */
  photographers.forEach((photographer) => {
    if (photographer.id === getPhotographerId()) {
      // Si l'id du photographe est égal à l'id de l'URL de la page photophapher.html
      const photographerModelPage = photographerFactory(photographer);
      const userCardDOMPage = photographerModelPage.getUserCardDOMPage();
      photographerProfilContainer.appendChild(userCardDOMPage);

      /** ---------- Affichage du widget ---------- */
      const widgetDisplay = photographerModelPage.getUserCounterDOM();
      widget.appendChild(widgetDisplay);

      /** ---------- Affichage du formulaire de contact ---------- */
      const contactDisplay = photographerModelPage.getUserContactDOM();
      contact.appendChild(contactDisplay);
    }
  });
}

/** ---------- Affichage de la galerie des médias du photographe ---------- */
function photographGaleryDisplay() {
  const mediasFilter = medias.filter(
    (media) => media.photographerId === parseInt(getPhotographerId())
  ); /** Filtre les médias en comparant l'ID du photographe et l'ID de la page (dans l'adresse HTML) */

  const itemsSort = document.querySelector(".listbox-custom-new").textContent; /** Cible le texte du bouton de tri */

  /** ---------- Selectionne la fonction à utiliser selon la catégorie qui s'affiche  ---------- */
  function selectSort(itemSort) {
    if (itemSort === "Date") {
      /** Si le texte du bouton est égale à "Date" */
      return sortMediaByDate; /** Retourne le tri par dates */
    } else if (itemSort === "Popularité") {
      /** Sinon si le texte du bouton est égale à "Popularité" */
      return sortMediaByLikes; /** Retourne le tri par likes */
    } else {
      return sortMediaByTitle; /** Sinon retourne le tri par titres */
    }
  }

  /** ---------- Medias filtrés et triés  ---------- */
  mediasFilter.sort(
    selectSort(itemsSort)
  ); /** TRI dans les médias filtrés selon la selection de tri */

  const photographGalery = document.querySelector(".photograph-galery");
  const photographLightbox = document.getElementById("lightbox-container");

  photographGalery.innerHTML = ""; /** Vide le DOM de la galerie */
  photographLightbox.innerHTML = ""; /** Vide le DOM du carousel */

  mediasFilter.forEach((media) => {
    if (mediasFilter.indexOf()) {
      const photographerModelGalery = galeryFactory(media); /** Récupération des données des médias du photographe ciblé */
      const userGalery = photographerModelGalery.getUserGaleryDOM(); /** Création de la carte du média dans la galerie du photographe */
      photographGalery.appendChild(userGalery); /** On rattache cet élément dans le DOM */

      const photographerModelGaleryPhoto = galeryFactory(media);
      const userGaleryPhoto = photographerModelGaleryPhoto.getUserGaleryLightbox(); /** Création de la carte du média dans le carousel du photographe */
      photographLightbox.appendChild(userGaleryPhoto);
    }
  });

  const mediasLightbox = document.querySelectorAll(".galery-medias");

  /** ---------- Ecouteurs d'évènements pour l'ouverture du carousel ---------- */
  for (let i = 0; i < mediasLightbox.length; i++) {
    mediasLightbox[i].addEventListener("click", () => {
      new Lightbox(i,mediasLightbox.length); 
      /** Création du carousel selon le média clické grâce à son index et selon le nombre de média pour la longueur du carousel */
      openLightbox(); /** Ouverture du carousel */
    });
    mediasLightbox[i].addEventListener("keydown", (e) => {
      /** Création du carousel selon le média selectionné par la touche "enter" */
      if (e.key === "Enter") {
        new Lightbox(i + 1, mediasLightbox.length);
        openLightbox();
      }
    });
  }
  new Lightbox(); /** Création d'un nouvel objet pour la classe Lightbox */
}

/******************************************* INITIALISATION ***************************************************************/ 

/** ---------- Initialisation pour l'affichage des données du photographe sur la page photographer.html ---------- */
async function initPage() {
  const { photographers } = await getPhotographers(); /** Récupère les données du photographe avant affichage */
  displayProfil(photographers); /** Appel de la fonction d'affichage des données */
}

/** ---------- Appel de la fonction pour l'affichage des données du photopgraphe dans la page photographer.html ---------- */
initPage();

/** ---------- Initialisation pour l'affichage de la galerie de la page photographer.html ---------- */
async function initGalery() {
  const { medias } = await getMedias(); /** Récupère les données des médias avant affichage */
  photographGaleryDisplay(medias); /** Appel de la fonction d'affichage des données de la galerie */
}

/** ---------- Appel de la fonction pour l'affichage des données de la galerie dans la page photographer.html ---------- */
initGalery();
