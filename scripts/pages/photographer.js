//Mettre le code JavaScript lié à la page photographer.html

/**  FETCH DATA pour récupérer les infos des photographes du fichier JSON */
async function getPhotographers() {
  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => (photographers = data.photographers));
  return {photographers: [...photographers],};
}

/** FETCH DATA pour récupérer les medias des photographes du fichier JSON  */
async function getMedia() {
  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => (media = data.media));
  return {
    media: [...media],
  };
}

/**  Récupération et transformation en nombre de l'ID de la page photographe.html  */
function getPhotographerId() {
  return parseInt(new URLSearchParams(window.location.search).get("id"));
}

/**  CREATION DU GABARIT DU HEADER DE LA PAGE PHOTOGRAHER.HTML - PRESENTATION DU PHOTOGRAPHE  */

function photographerFactory(data) {
  const { name, city, country, tagline , portrait , price} = data;

  const picture = `assets/photographers/photographers_ID_Photos/${portrait}`;
  const heart = 'assets/icons/heartBlack.png'

  function getUserCardDOMPage() {
    const articlePage = document.createElement("section");
    const divProfil = document.createElement("div");
    divProfil.setAttribute("class" , "divProfil")
  
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
    const pricePerDay = document.querySelector(".price");
    pricePerDay.textContent = price + "€ / jour";

    articlePage.appendChild(divProfil);
    divProfil.appendChild(h1Page);
    divProfil.appendChild(h2Page);
    divProfil.appendChild(h3Page);
    articlePage.appendChild(imgPage);
    return articlePage;
  }

  return {name , picture , getUserCardDOMPage}
} 



// const sumLike = media.map(item => item.likes).reduce((prev ,curr) => prev + curr, 0);

function mediaFactory(data) {
  let { photographerId, title, likes, image, video} = data;

  const picture = `assets/photographers/${photographerId}/${image}`;
  const moovie = `assets/photographers/${photographerId}/${video}`;
  const heart = `assets/icons/heart.png`

  function getMediaCardDOMPage() {
    const divMedia = document.createElement("div");
    divMedia.setAttribute("class" , "divMedia");
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
    const divTitle = document.createElement("div");
    divTitle.setAttribute("class","divTitle");
    const iTitle = document.createElement("h2");
    iTitle.textContent = title;
    /** Nombres de like*/ 
    const iLike = document.createElement("p");
    iLike.textContent = likes;
    iLike.setAttribute("class","like");
    const iHeart = document.createElement("img");
    iHeart.setAttribute("src" , heart);
    iHeart.setAttribute("class" , "heart");
    /** Choix entre vidéo et photo  */
    media.forEach((media) => {
      if (media[3] == image) {
        divMedia.appendChild(iVideo);
      } else {
        divMedia.appendChild(iPicture);
      }
    });
    /** Fonctionnalité de like des photos et vidéos*/ 
    media.forEach(function(media) {
      if (photographerId === getPhotographerId()) {
        iHeart.addEventListener("click" , function() {
          iLike.textContent = likes + 1;
        })
      }
    })
  
    /** Affichage du nombre de like total du vidéaste*/ 
    const sumLike = document.querySelector(".totalLike");
    const nbrLikes = document.querySelectorAll(".like");
    let likesText = 0;
    let total = 0;
    let arrayLikes = [];

    nbrLikes.forEach((like) => {
      likesText = parseInt(like.textContent); /** Transforme en nombre le texte à côté de l'input (label = nombre de like) */
      arrayLikes.push(likesText); /** Alimente le tableau "arrayLikes" du nombre de like de chaque média du photographe */
      total = arrayLikes.reduce((accumulator, currentValue) => accumulator + currentValue , 0); /** Calcule la somme du tableau */
      sumLike.textContent = total + " "; /** Met à jour le total des likes du photographe */ 
    });

    // /** Systeme de tris des photos */ 
    // const containerDivMedia = document.querySelector(".photographer_section");
    // const sortPopular = document.querySelector(".Popular");
    // const sortDate = document.querySelector(".Date");
    // const sortTitle = document.querySelector(".Titre");
    // const allDivMedia = document.querySelectorAll(".divMedia");

    // let arrayDivMedia = [];

    // allDivMedia.forEach((div) => {
      
    // })

    // const mediasFilter = media.filter(
    //   (media) => media.photographerId === parseInt(getPhotographerId())
    // ); 
    // console.log(mediaFilter.sort());
    divTitle.appendChild(iTitle);
    divTitle.appendChild(iLike);
    divTitle.appendChild(iHeart);
    divMedia.appendChild(divTitle);
    return (divMedia);
  }
  return {getMediaCardDOMPage};
}


/** CREATION DU GABARIT DE LA LIGHTBOX */ 
function lightBoxFactory (data) {
  const { photographerId , image, video} = data;

  const picture = `assets/photographers/${photographerId}/${image}`;
  const moovie = `assets/photographers/${photographerId}/${video}`;

  function getLigthBoxCardDOMPage () {
    const container = document.createElement("div")
    container.setAttribute("class" , "ligthBoxElement")
    /** Photo de la lightBox */ 
    const lPicture = document.createElement("img");
    lPicture.setAttribute("src" , picture)
    lPicture.setAttribute("class", "picture")
    /** Video de la lightBox */ 
    const lMoovie = document.createElement("video");
    lMoovie.setAttribute("src" , moovie);
    lMoovie.setAttribute("controls" , "muted");
    lMoovie.setAttribute("width" , "800px");
    lMoovie.setAttribute("height" , "600px");
    /** Affichage Photo ou Video dans la ligthBox */ 
    media.forEach((media) => {
      if (photographerId === getPhotographerId && media[3] === video) {
        console.log("ça passe par la");
        container.appendChild(lMoovie);
      } else { 
        console.log("ça passe ici");
        container.appendChild(lPicture);
      }
    })
    return (container);
  }
  return {getLigthBoxCardDOMPage};
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

/** Affichage des photos sur la page photographer.html */
function displayMedia() {
  const photographerMediaContainer = document.querySelector(".photographer_section");

  /** Boucle dans les photographes */
  media.forEach((mediasFilter) => {
    // if (media.photographerId === getPhotographerId()) {
      // Si l'id du Media est égal à l'id de l'URL de la page photophapher.html
      const mediaModelPage = mediaFactory(mediasFilter);
      const mediaCardDOMPage = mediaModelPage.getMediaCardDOMPage();
      photographerMediaContainer.appendChild(mediaCardDOMPage);    
    // };
  })
}

/** Affichage de la lightbox sur la page photographer.html */
function displayLightBox () {
  const lightBoxContainer = document.querySelector(".lightBoxSlide");

  /** Boucle dans les media*/ 
    media.forEach((media) => {
      if (media.photographerId === getPhotographerId()) {
      //  si l'id du media est égal à l'id de l'URL de la page photographer.html 
      const lightBoxModelPage = lightBoxFactory(media);
      const LigthBoxCardDOMPage = lightBoxModelPage.getLigthBoxCardDOMPage();
      lightBoxContainer.appendChild(LigthBoxCardDOMPage);
    };
  })
}

/** fonction suivant et précédent du carrousel de la lightBox */ 

let position = 0;

function next() {
  const slider = document.querySelector(".lightBoxSlide");
  const count = slider.childElementCount;
  const L = document.querySelector("#L");
  L.addEventListener("click" , function () {
    if (position>-count+1) {
      position--;
      slider.style.transform= "translateX("+position*1000+"px)";
    }
  })
}

function preview() {
  const R = document.querySelector("#R");
  R.addEventListener("click" , function () {
    const slider = document.querySelector(".lightBoxSlide");
    if (position<0) {
      position++;
      slider.style.transform= "translateX("+position*1000+"px)";
    }
  })
}

// /** ---------- Affichage de la galerie des médias du photographe ---------- */
// function photographGaleryDisplay() {
//   const mediasFilter = medias.filter((media) => media.photographerId === parseInt(getPhotographerId())); 
//   /** Filtre les médias en comparant l'ID du photographe et l'ID de la page (dans l'adresse HTML) */

//   const itemsSort = document.querySelector(".menu").textContent; 
//   /** Cible le texte du bouton de tri */

  // /** ---------- Selectionne la fonction à utiliser selon la catégorie qui s'affiche  ---------- */
  // function selectSort(itemSort) {
  //   if (itemSort === "Date") {
  //     /** Si le texte du bouton est égale à "Date" */
  //     return sortMediaByDate; /** Retourne le tri par dates */
  //   } else if (itemSort === "Popularité") {
  //     /** Sinon si le texte du bouton est égale à "Popularité" */
  //     return sortMediaByLikes; /** Retourne le tri par likes */
  //   } else {
  //     return sortMediaByTitle; /** Sinon retourne le tri par titres */
  //   }
  // }

  // /********************************************************************************************/

  // /** ---------- Medias filtrés et triés  ---------- */
  // mediasFilter.sort(selectSort(itemsSort)); 
  // /** TRI dans les médias filtrés selon la selection de tri */

  // const photographGalery = document.querySelector(".photographer_section");
  // const photographLightbox = document.getElementById("lightBox");

  // photographGalery.innerHTML = ""; /** Vide le DOM de la galerie */
  // photographLightbox.innerHTML = ""; /** Vide le DOM du carousel */

  // mediasFilter.forEach((media) => {
  //   if (mediasFilter.indexOf()) {
  //     const photographerModelGalery = galeryFactory(media);
  //     /** Récupération des données des médias du photographe ciblé */
  //     const userGalery =
  //       photographerModelGalery.getUserGaleryDOM();
  //       /** Création de la carte du média dans la galerie du photographe */
  //       photographGalery.appendChild(userGalery);
  //       /** On rattache cet élément dans le DOM */

  //     const photographerModelGaleryPhoto = galeryFactory(media);
  //     const userGaleryPhoto =
  //       photographerModelGaleryPhoto.getUserGaleryLightbox(); 
  //       /** Création de la carte du média dans le carousel du photographe */
  //       photographLightbox.appendChild(userGaleryPhoto);
  //   }
  // });

  // /********************************************************************************************/
  
  



/**  Initialisation pour l'affichage des données des media sur la page photographer.html */
async function initMedia() {
  /** Récupère les données des Medias avant affichage */
  const { media } = await getMedia();
  /** Appel de la fonction d'affichage des données */ 
  displayMedia(media); 
}

/** Appel de la fonction pour l'affichage des données du photopgraphe dans la page photographer.html */
initMedia();

/**  Initialisation pour l'affichage des données du photographe sur la page photographer.html  */
async function initPage() {
  /** Récupère les données du photographe avant affichage */
  const { photographers } = await getPhotographers();
  /** Appel de la fonction d'affichage des données */ 
  displayProfil(photographers); 
}

/** Appel de la fonction pour l'affichage des données du photopgraphe dans la page photographer.html  */
initPage();