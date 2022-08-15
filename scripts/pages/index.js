    async function getPhotographers() {

        await fetch(
            "./data/photographers.json"
          ) /** Attendre la récupération des données JSON */
          .then((res) => res.json()) 
          /** Alors ce résultat est transformé en DATA (objet javascript) */
          .then((data) => (photographers = data.photographers));
          /** Récupération dans DATA des données photographers */
          return {photographers: [...photographers,] 
          /** On retourne un tableau avec les données des photographes */,
          };
    }
    
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            console.log(photographer);
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();