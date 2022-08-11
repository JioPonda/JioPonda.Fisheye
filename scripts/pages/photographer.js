//Mettre le code JavaScript lié à la page photographer.html

// Récupération des informations des photographes dans le JSON 
async function getPhotographers() {  
  /** Attendre la récupération des données JSON */
  await fetch("./data/photographers.json")
  /** Alors ce résultat est transformé en DATA (objet javascript) */
  .then((res) => res.json()) 
  /** Récupération dans DATA des données photographers */
  .then((data) => (photographers = data.photographers));
  /** On retourne un tableau avec les données des photographes */
  return {photographers: [...photographers,]};
}

// récupération de la chaine de requete dans l'url
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

// éxtraction de l'id
const id = queryString_url_id.slice(1);
console.log(id);

// affichage du photographe sélectionné par l'ID
const idPhotographe = Photographers.find((element) => element.id === id);
console.log(idPhotographe);

function photographerFactoryHead(data) {
  const [{ name, city, country, tagline, portrait }] = data;

  const picture = `assets/photographers/photographers_ID_Photos/${portrait}`;

  function getProfilHeader() {

    const artcileProfil = document.createElement( 'article' );
    const profilPicture = document.createElement( 'img' );
    profilPicture.setAttribute("src", picture)
    profilPicture.setAttribute("alt", "photo de " + name) 
    const h2 = document.createElement( 'h2' );
    h2.textContent = name;
    const h3 = document.createElement( 'h3' );
    h3.textContent = city + " , " + country;
    const h4 = document.createElement( 'h4' );
    h4.textContent = tagline; 
    artcileProfil.appendChild(profilPicture)
    artcileProfil.appendChild(h2)
    artcileProfil.appendChild(h3)
    artcileProfil.appendChild(h4)


    return (artcileProfil);
  
  }
  return { name, picture, getProfilHeader }
}

async function displayDataPhotographers(photographers) {
  const photographersHeader = document.querySelector(".photograph-header")
  console.log(photographers)
  const photographerProfil = photographerFactoryHead(photographers);
  const profilCardDOM = photographerProfil.getProfilHeader();
  photographersHeader.appendChild(profilCardDOM);
  };

async function init() {
  const { photographers } = await getPhotographers();
  displayDataPhotographers(photographers);
};

init();

// Récupération des media des photographes dans le JSON
async function getMedia() {
  /** Attendre la récupération des données JSON */
  await fetch("./data/photographers.json") 
  /** Alors ce résultat est transformé en DATA (objet javascript) */
  .then((res) => res.json()) 
  /** Récupération dans DATA des données des media */
  .then((data) => (media = data.media));
  /** On retourne un tableau avec les données des media */
  return {media: [...media,]};
}