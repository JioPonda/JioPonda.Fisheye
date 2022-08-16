//Mettre le code JavaScript lié à la page photographer.html

/** ---------- FETCH DATA pour récupérer les infos des photographes du fichier JSON ---------- */
async function getPhotographers() {
  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => (photographers = data.photographers));
  return {
    photographers: [...photographers],
  };
}

/** ---------- Récupération et transformation en nombre de l'ID de la page photographe.html ---------- */
function getPhotographerId() {
  return parseInt(new URLSearchParams(window.location.search).get("id"));
}

/** ---------- CREATION DU GABARIT DU HEADER DE LA PAGE PHOTOGRAHER.HTML - PRESENTATION DU PHOTOGRAPHE ---------- */

function photographerFactory(data) {
  const { name, city, country, tagline , portrait , } = data;

  const picture = `assets/photographers/photographers_ID_Photos/${portrait}`;

  function getUserCardDOMPage() {
    const articlePage = document.createElement("section");
    const divProfil = document.createElement("div");
  
    /** Nom du photographe */
    const h1Page = document.createElement("h1");
    h1Page.textContent = name;
  
    /** Ville du photographe */
    const h2Page = document.createElement("h2");
    h2Page.textContent = city + ", " + country;
  
    /** Citation du photographe */
    const h3Page = document.createElement("h3");
    h3Page.textContent = tagline;
  
    /** Portrait du photographe */
    const imgPage = document.createElement("img");
    imgPage.setAttribute("src", picture);
    imgPage.setAttribute("alt", "portrait du photographe");
  
    articlePage.appendChild(divProfil);
    divProfil.appendChild(h1Page);
    divProfil.appendChild(h2Page);
    divProfil.appendChild(h3Page);
    articlePage.appendChild(imgPage);
    return articlePage;
  }
  return {name , picture , getUserCardDOMPage}
}


/** ---------- Affichage du profil du photographe sur la page photographer.html ---------- */
function displayProfil() {
  const photographerProfilContainer = document.querySelector(".photograph-header");

  /** Boucle dans les photographes */
  photographers.forEach((photographer) => {
    if (photographer.id === getPhotographerId()) {
      // Si l'id du photographe est égal à l'id de l'URL de la page photophapher.html
      const photographerModelPage = photographerFactory(photographer);
      const userCardDOMPage = photographerModelPage.getUserCardDOMPage();
      photographerProfilContainer.appendChild(userCardDOMPage);
    };
  })
}

/** ---------- Initialisation pour l'affichage des données du photographe sur la page photographer.html ---------- */
async function initPage() {
  const { photographers } =
    await getPhotographers(); /** Récupère les données du photographe avant affichage */
  displayProfil(
    photographers
  ); /** Appel de la fonction d'affichage des données */
}

/** ---------- Appel de la fonction pour l'affichage des données du photopgraphe dans la page photographer.html ---------- */
initPage();



/** ---------- FETCH DATA pour récupérer les medias des photographes du fichier JSON ---------- */
async function getMedia() {
  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => (media = data.media));
  return {
    media: [...media],
  };
}

function mediaFactory(data) {
  const { name, title, image, likes} = data;

  const picture = `assets/photographers/${name}/${image}`;

  function getMediaCardDOMPage() {
    const divmedia = document.createElement("div"); 
    /** photo du photographe */
    const iPicture = document.createElement("img");
    iPicture.setAttribute("src", picture)
    /** Titre de la photo */
    const iTitle = document.createElement("h2");
    iTitle.textContent = title;
    /** nombres de likes */
    const numberOfLike = document.createElement("h3");
    numberOfLike.textContent = likes;
    divmedia.appendChild(iPicture);
    divmedia.appendChild(iTitle);
    divmedia.appendChild(numberOfLike);

    return (divmedia)
  }
  return {getMediaCardDOMPage}
}

/** ---------- Affichage des photos sur la page photographer.html ---------- */
function displayMedia() {
  const photographerMediaContainer = document.querySelector(".photographer_section");
  // const widget = document.querySelector(".widget");

  /** Boucle dans les photographes */
  media.forEach((media) => {
    if (media.id === getPhotographerId()) {
      // Si l'id du Media est égal à l'id de l'URL de la page photophapher.html
      const mediaModelPage = mediaFactory(media);
      const mediaCardDOMPage = mediaModelPage.getMediaCardDOMPage();
      photographerMediaContainer.appendChild(mediaCardDOMPage);
      // /** ---------- Affichage du widget ---------- */
      // const widgetDisplay = photographerModelPage.getUserCounterDOM();
      // widget.appendChild(widgetDisplay);     
    };
  })
}

/** ---------- Initialisation pour l'affichage des données des media sur la page photographer.html ---------- */
async function initMedia() {
  const { media } =
    await getMedia(); /** Récupère les données des Medias avant affichage */
  displayMedia(
    media
  ); /** Appel de la fonction d'affichage des données */
}

/** ---------- Appel de la fonction pour l'affichage des données du photopgraphe dans la page photographer.html ---------- */
initMedia();