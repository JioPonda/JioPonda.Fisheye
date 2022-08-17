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
  const { photographers } =
    await getPhotographers(); /** Récupère les données du photographe avant affichage */
  displayProfil(
    photographers
  ); /** Appel de la fonction d'affichage des données */
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
  const moovie = `assets/photographers/${photographerId}/${video}` ;

  function getMediaCardDOMPage() {
    const divMedia = document.createElement("div");
    /** Vidéo du photographe */
    const iVideo = document.createElement("video");
    iVideo.setAttribute("class" , "video")
    iVideo.setAttribute("controls" , "muted")
    iVideo.setAttribute("width" , "350px")
    iVideo.setAttribute("height" , "300px")
    iVideo.setAttribute("src" , moovie) 
    /** photo du photographe */
    const iPicture = document.createElement("img");
    iPicture.setAttribute("src", picture)
    /** Titre de la photo */
    const iTitle = document.createElement("h2");
    iTitle.textContent = title;
    /** Choix entre vidéo et photo  */
    media.forEach((media) => {
      if (media[3] === video) {
        return divMedia.appendChild(iPicture); 
      } else {
        return divMedia.appendChild(iVideo);
      }
    });
    divMedia.appendChild(iTitle);
    return (divMedia);
  }
  return {getMediaCardDOMPage};
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
  const { media } =
    await getMedia(); /** Récupère les données des Medias avant affichage */
  displayMedia(
    media
  ); /** Appel de la fonction d'affichage des données */
}

/** Appel de la fonction pour l'affichage des données du photopgraphe dans la page photographer.html */
initMedia();


// /** CREATION DU WIDGET DE LA PAGE PHOTOGRAPHER.HTML */ 

// function widgetFactory (data) {
//   const price = data; 

//   function getWidgetCardDOMPage() {
//     const widget = document.createElement("div");
//     /** Prix par jour */ 
//     const pricePerDay = document.createElement("p");
//     pricePerDay.textContent = price + "/ jour";
//     widget.appendChild(pricePerDay)

//     return (widget);
//   }
//   return getWidgetCardDOMPage;
// }

// /** Affichage du widget sur la page photographer.html */ 

// function displayWidget(data) {
//   const widgetContainer = document.querySelector(".photographer_section");
//   const widgetModelPage = widgetFactory(data);
//   const widgetCardDOMPage = widgetModelPage.getWidgetCardDOMPage();
//   widgetContainer.appendChild(widgetCardDOMPage);
// };

// /** Appel de la fonction pour l'affichage du widget */ 
// displayWidget();