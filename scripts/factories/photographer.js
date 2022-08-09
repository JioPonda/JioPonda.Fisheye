function photographerFactory(data) {
    const { name, id, city, country, tagline , price, portrait , } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const photographerProfil = document.createElement( 'a' );
        const article = document.createElement( 'article' );
        photographerProfil.setAttribute ( "href" , id)
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture ,)
        img.setAttribute("aria-label", "photo de " + name ,)
        img.setAttribute("alt" , "Photo de profile de" + name)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement( 'h3' );
        h3.textContent = city + " , " + country;
        const h4 = document.createElement( 'h4' );
        h4.textContent = tagline;
        const p = document.createElement ( 'p' );
        p.textContent = price + '€ / jour';
        article.append(photographerProfil)
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3)
        article.appendChild(h4)
        article.appendChild(p)
        

        return (article);
    }
    return { name, picture, getUserCardDOM }
}


// function photographerFactory(data) {
//     const { name, id, city, country, tagline , price, portrait , } = data;

//     const picture = `assets/photographers/${portrait}`;

//     function getUserCardDOM() {
//         const photographerProfil = document.createElement( 'a' );
//         const article = document.createElement( 'article' );
//         photographerProfil.setAttribute ( "href" , id)
//         const img = document.createElement( 'img' );
//         img.setAttribute("src", picture ,)
//         img.setAttribute("aria-label", "photo de " + name ,)
//         img.setAttribute("alt" , "Photo de profile de" + name)
//         const h2 = document.createElement( 'h2' );
//         h2.textContent = name;
//         const h3 = document.createElement( 'h3' );
//         h3.textContent = city + " , " + country;
//         const h4 = document.createElement( 'h4' );
//         h4.textContent = tagline;
//         const p = document.createElement ( 'p' );
//         p.textContent = price + '€ / jour';
//         photographerProfil.append(article)
//         photographerProfil.appendChild(img);
//         photographerProfil.appendChild(h2);
//         photographerProfil.appendChild(h3)
//         photographerProfil.appendChild(h4)
//         photographerProfil.appendChild(p)
        

//         return (photographerProfil);
//     }
//     return { name, picture, getUserCardDOM }
// }