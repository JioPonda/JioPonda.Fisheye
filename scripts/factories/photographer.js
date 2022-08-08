function photographerFactory(data) {
    const {portrait, name, city, country, tagline, price} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture ,)
        img.setAttribute("aria-label", name ,)
        img.setAttribute("alt" , "Photo de profile de" + name)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement( 'h3' );
        h3.textContent = city + " , " + country;
        const h4 = document.createElement( 'h4' );
        h4.textContent = tagline;
        const p = document.createElement ( 'p' );
        p.textContent = price + '€ / jour';
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3)
        article.appendChild(h4)
        article.appendChild(p)

        return (article);
    }
}