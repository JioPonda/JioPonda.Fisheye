    async function getPhotographers() {

        fetch('../data/photographers.json')
        .then (res => res.json())
        .then (data => console.log(data))
        // Penser à remplacer par les données récupérées dans le json
        const photographers = [
            {
                "name": "Mimi Keel",
                "id": 243,
                "city": "London",
                "country": "UK",
                "tagline": "Voir le beau dans le quotidien",
                "price": 400,
                "portrait": "./mimi/Portrait_Nora.jpg"
            },
            {
                "name": "Ellie-Rose Wilkens",
                "id": 930,
                "city": "Paris",
                "country": "France",
                "tagline": "Capturer des compositions complexes",
                "price": 250,
                "portrait": "./Ellie_Rose/Architecture_Horseshoe.jpg"
            },{
                "name": "Tracy Galindo",
			    "id": 82,
			    "city": "Montreal",
			    "country": "Canada",
			    "tagline": "Photographe freelance",
			    "price": 500,
			    "portrait": "./Tracy/Fashion_Urban_Jungle.jpg"
            },
            {
                "name": "Nabeel Bradford",
                "id": 527,
                "city": "Mexico City",
                "country": "Mexico",
                "tagline": "Toujours aller de l'avant",
                "price": 350,
                "portrait": "./Nabeel/Travel_Outdoor_Baths.jpg"
            },{
                "name": "Rhode Dubois",
                "id": 925,
                "city": "Barcelona",
                "country": "Spain",
                "tagline": "Je crée des souvenirs",
                "price": 275,
                "portrait": "./Rhode/Fashion_Melody_Red_on_Stripes.jpg"
            },
            {
                "name": "Marcel Nikolic",
                "id": 195,
                "city": "Berlin",
                "country": "Germany",
                "tagline": "Toujours à la recherche de LA photo",
                "price": 300,
                "portrait": "./Marcel/Travel_Tower.jpg"
            },
        ]
        // et bien retourner le tableau photographers seulement une fois
        return ({
            photographers: [...photographers,]})
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
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

    // async function getPhotographers() {

    //     fetch('../data/photographers.json')
    //     .then (res => res.json())
    //     .then (data => console.log(data))
    
    // class photographerProfil {
    //     constructor (photographers) {
    //         this._name = photographers.name
    //         this._id = photographers.id
    //         this._city = photographers.city
    //         this._country = photographers.country
    //         this._tagline = photographers.tagline
    //         this._price = photographers.price
    //         this._portrait = photographers.portrait
    //     }

    //     get name() {
    //         return this._name
    //     }
        
    //     get id() {
    //         return this._id
    //     }
        
    //     get city() {
    //         return this._tagline
    //     }
        
    //     get country() {
    //         return this.price
    //     }
        
    //     get tagline() {
    //         return this.tagline
    //     }
        
    //     get price() {
    //         return this.price
    //     }
        
    //     get portrait() {
    //         return this.portrait
    //     }
    // }

    // for (i = 0 ; i < photographer.length; i++ ) {
    //     return new photographerProfil
    // }
    
    // async function displayData(photographers) {
    //     const photographersSection = document.querySelector(".photographer_section");

    //     photographers.forEach((photographer) => {
    //         const photographerModel = photographerFactory(photographer);
    //         const userCardDOM = photographerModel.getUserCardDOM();
    //         photographersSection.appendChild(userCardDOM);
    //     });
    // };

    // async function init() {
    //     // Récupère les datas des photographes
    //     const { photographers } = await getPhotographers();
    //     displayData(photographers);
    // };
    
    // init();