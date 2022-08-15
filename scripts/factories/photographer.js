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


  /** ---------- CREATION DU GABARIT DU HEADER DE LA PAGE PHOTOGRAHER.HTML - PRESENTATION DU PHOTOGRAPHE ---------- */
  function getUserCardDOMPage() {
    const articlePage = document.createElement("section");
    const divProfil = document.createElement("div");

    /** Nom du photographe */
    const h1Page = document.createElement("h1");
    h1Page.textContent = name;

    /** Lieu de résidence du photographe */
    const h2Page = document.createElement("h2");
    h2Page.textContent = city + ", " + country;

    /** Slogan du photographe */
    const h3Page = document.createElement("h3");
    h3Page.textContent = tagline;

    /** Bouton pour accès au formulaire de contact du photographe */
    const btnContact = document.createElement("button");
    btnContact.classList.add("contact-button");
    btnContact.setAttribute("onclick", "openModal()");
    btnContact.setAttribute("aria-label", "Contact Me");
    btnContact.textContent = "Contactez-moi";

    /** Portrait du photographe */
    const imgPage = document.createElement("img");
    imgPage.setAttribute("src", picture);
    imgPage.setAttribute("alt", "portrait du photographe");

    articlePage.appendChild(divProfil);
    divProfil.appendChild(h1Page);
    divProfil.appendChild(h2Page);
    divProfil.appendChild(h3Page);
    articlePage.appendChild(btnContact);
    articlePage.appendChild(imgPage);
    return articlePage;
  }