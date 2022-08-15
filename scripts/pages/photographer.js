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

/** ---------- Affichage du profil du photographe sur la page photographer.html ---------- */
function displayProfil() {
  const photographerProfilContainer =
    document.querySelector(".photograph-header");
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