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