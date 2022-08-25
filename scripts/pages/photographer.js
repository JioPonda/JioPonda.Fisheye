//Mettre le code JavaScript lié à la page photographer.html

/**  FETCH DATA pour récupérer les infos des photographes du fichier JSON */
async function getPhotographers() {
  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => (photographers = data.photographers));
  return {photographers: [...photographers],};
}

/**  Récupération et transformation en nombre de l'ID de la page photographe.html  */
function getPhotographerId() {
  return parseInt(new URLSearchParams(window.location.search).get("id"));
}

/**  CREATION DU GABARIT DU HEADER DE LA PAGE PHOTOGRAHER.HTML - PRESENTATION DU PHOTOGRAPHE  */

function photographerFactory(data) {
  const { name, city, country, tagline , portrait , price } = data;

  const picture = `assets/photographers/photographers_ID_Photos/${portrait}`;

  function getUserCardDOMPage() {
    const articlePage = document.createElement("section");
    const divProfil = document.createElement("div");
    divProfil.setAttribute("class" , "divProfil")
    const divWidget = document.createElement("div")
    divWidget.setAttribute( "class" , "widget")
  
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
  
    /** Widget*/
    const pricePerDay = document.createElement("p")
    pricePerDay.textContent = price + "€ / jour" 

    articlePage.appendChild(divProfil);
    articlePage.appendChild(divWidget);
    divWidget.appendChild(pricePerDay);
    divProfil.appendChild(h1Page);
    divProfil.appendChild(h2Page);
    divProfil.appendChild(h3Page);
    articlePage.appendChild(imgPage);
    return articlePage;
  }

  return {name , picture , getUserCardDOMPage}
} 

/**  Affichage du profil du photographe sur la page photographer.html  */
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

/**  Initialisation pour l'affichage des données du photographe sur la page photographer.html  */
async function initPage() {
  /** Récupère les données du photographe avant affichage */
  const { photographers } = await getPhotographers();
  /** Appel de la fonction d'affichage des données */ 
  displayProfil(photographers); 
}

/** Appel de la fonction pour l'affichage des données du photopgraphe dans la page photographer.html  */
initPage();

/** FETCH DATA pour récupérer les medias des photographes du fichier JSON  */
async function getMedia() {
  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => (media = data.media));
  return {
    media: [...media],
  };
}

function mediaFactory(data) {
  const { photographerId, title, image, video} = data;

  const picture = `assets/photographers/${photographerId}/${image}`;
  const moovie = `assets/photographers/${photographerId}/${video}`;

  function getMediaCardDOMPage() {
    const divMedia = document.createElement("div");
    /** Vidéo du photographe */
    const iVideo = document.createElement("video");
    iVideo.setAttribute("class" , "video");
    iVideo.setAttribute("controls" , "muted");
    iVideo.setAttribute("width" , "350px");
    iVideo.setAttribute("height" , "300px");
    iVideo.setAttribute("src" , moovie);
    iVideo.setAttribute("aria-label" , "vidéo prise par le photographe");
    iVideo.setAttribute("onclick" , "openLightBox()" );
    /** photo du photographe */
    const iPicture = document.createElement("img");
    iPicture.setAttribute("src", picture);
    iPicture.setAttribute("aria-label" , "photo appeler " + title);
    iPicture.setAttribute( "onclick" , "openLightBox() + displayLightBox()");
    /** Titre de la photo */
    const iTitle = document.createElement("h2");
    iTitle.textContent = title;
    /** Choix entre vidéo et photo  */
    media.forEach((media) => {
      if (media[3] == image) {
        divMedia.appendChild(iVideo);
      } else {
        divMedia.appendChild(iPicture);
      }
    });
    divMedia.appendChild(iTitle);
    return (divMedia);
  }
  
  return {getMediaCardDOMPage};
}

function lightBoxFactory (data) {
  const { photographerId, image, video} = data;

  const picture = `assets/photographers/${photographerId}/${image}`;
  const moovie = `assets/photographers/${photographerId}/${video}`;

  function getLigthBoxCardDOMPage () {
    /** Container de la LightBox*/ 
    const container = document.createElement("div");
    container.setAttribute("id" , "lightBox_container")
    /** fleche gauche*/
    const arrowL = document.createElement("img");
    arrowL.setAttribute("src" , "assets/icons/arrow.png");
    arrowL.setAttribute("alt" , "fleche de direction gauche");
    arrowL.setAttribute("class" , "arrow");
    arrowL.setAttribute("id" , "L");
    /** fleche droite*/
    const arrowR = document.createElement("img");
    arrowR.setAttribute("src" , "assets/icons/arrow.png");
    arrowR.setAttribute("alt" , "fleche de direction gauche");
    arrowR.setAttribute("class" , "arrow");
    arrowR.setAttribute("id" , "R");
    /** croix de fermeture de la lightBox */
    const cross = document.createElement("img")
    cross.setAttribute("src" , "assets/icons/close_red.png")
    cross.setAttribute("alt" , "croix de fermeture de la lightBox")
    cross.setAttribute("class" , "crossLightBox")
    cross.setAttribute("onclick" , "closeLightBox()")
    /** const pour les fleches */
    const L = document.getElementById("L") ;
    const R = document.getElementById("R");
    /** Photo de la lightBox */ 
    const lPicture = document.createElement("img");
    lPicture.setAttribute("src" , picture)
    /** Video de la lightBox */ 
    const lMoovie = document.createElement("video");
    lMoovie.setAttribute("src" , moovie);

    media.forEach((media) => {
      if (photographerId === getPhotographerId && media[3] === video) {
        console.log("ça passe ici");
        container.appendChild(lPicture);
      } else { 
        console.log("ça passe par la");
        container.appendChild(lMoovie);
      }
    })
    container.appendChild(arrowL);
    container.appendChild(arrowR);
    container.appendChild(cross);
    return (container)
  }
 return {getLigthBoxCardDOMPage};
}

/** Affichage de la lightbox sur la page photographer.html */
function displayLightBox () {
  const lightBoxContainer = document.querySelector("#lightBox");
  const lightBoxModelPage = lightBoxFactory(media);
  const LigthBoxCardDOMPage = lightBoxModelPage.getLigthBoxCardDOMPage();
  lightBoxContainer.appendChild(LigthBoxCardDOMPage);
}

/** Affichage des photos sur la page photographer.html */
function displayMedia() {
  const photographerMediaContainer = document.querySelector(".photographer_section");

  /** Boucle dans les photographes */
  media.forEach((media) => {
    if (media.photographerId === getPhotographerId()) {
      // Si l'id du Media est égal à l'id de l'URL de la page photophapher.html
      const mediaModelPage = mediaFactory(media);
      const mediaCardDOMPage = mediaModelPage.getMediaCardDOMPage();
      photographerMediaContainer.appendChild(mediaCardDOMPage);    
    };
  })
}

/**  Initialisation pour l'affichage des données des media sur la page photographer.html */
async function initMedia() {
  /** Récupère les données des Medias avant affichage */
  const { media } = await getMedia();
  /** Appel de la fonction d'affichage des données */ 
  displayMedia(media); 
}

/** Appel de la fonction pour l'affichage des données du photopgraphe dans la page photographer.html */
initMedia();