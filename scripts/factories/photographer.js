function photographerFactory(data) {
    const { name, id, city, country, tagline , price, portrait , } = data;

    const picture = `assets/photographers/photographers_ID_Photos/${portrait}`;

    function getUserCardDOM() {
        const a = document.createElement( 'a' );
        a.setAttribute("href" , "photographer.html?id="+ id)
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture )
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
        a.appendChild(article)
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3)
        article.appendChild(h4)
        article.appendChild(p)
        

        return (a);
    }
    return { name, picture, getUserCardDOM }
}
