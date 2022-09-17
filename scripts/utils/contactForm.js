/***************************************************** CONTACT-FORM *********************************************************************/

/** ---------- Eléments du DOM ---------- */
const main = document.getElementById("main");
const form = document.getElementById("form");
const modal = document.getElementById("modal");
const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
const focusFirstName = document.getElementById("contact-first-name");
const logo = document.getElementById("logo");
const closeBtnModal = document.getElementById("close-modal");

/** ---------- Ouvre le formulaire de contact ---------- */
function openModal() {
  modal.style.display = "block";
  main.setAttribute("aria-hidden", true);
  modal.setAttribute("aria-hidden", false);
  focusFirstName.focus();
}

/** ---------- Ferme le formulaire de contact ---------- */
function closeModal() {
  modal.style.display = "none";
  main.setAttribute("aria-hidden", false);
  modal.setAttribute("aria-hidden", true);
  logo.focus();
}


/** ---------- Navigation avec le clavier ---------- */
modal.addEventListener("keydown", function (e) {
    e.stopPropagation();
    if (e.key === "Escape") {
      closeModal();
    }
    if (e.key === "Tab") {
      if (document.activeElement === closeBtnModal) focusFirstName.focus();
    }
});

/** ---------- récupérations des donneés du formulaire ---------- */
  form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const labelFirst = document.getElementById("contact-first-name").value;
    const labelLast = document.getElementById("contact-last-name").value;
    const labelEmail = document.getElementById("contact-email").value;
    const labelMessage = document.getElementById("contact-message").value;
    console.log(labelFirst , labelLast , labelEmail , labelMessage);
  
    inputs.forEach(
        (input) => (input.value = "")
    ); /** Effacement des informations collectées */
    closeModal();
})

/***************************************************** LIGHTBOX *********************************************************************/ 

/** ---------- Eléments du DOM ---------- */
const lightboxDisplay = document.getElementById("lightbox");
const prevNavigation = document.getElementById("prev");
const nextNavigation = document.getElementById("next");

/** ---------- Ouvre le carousel ---------- */
function openLightbox() {
  lightboxDisplay.style.display = "block";
  main.setAttribute("aria-hidden", true);
  lightboxDisplay.setAttribute("aria-hidden", false);
  prevNavigation.focus();
}

/** ---------- Ferme le carousel ---------- */
function closeLightbox() {
  lightboxDisplay.style.display = "none";
  main.setAttribute("aria-hidden", false);
  lightboxDisplay.setAttribute("aria-hidden", true);
  logo.focus();
}

/** ---------- CREATION DE LA CLASSE DU CAROUSEL ---------- */
class Lightbox {
  constructor(currentSlide, element, options = {}) {
    this.element = element;
    this.options = Object.assign(
      {},
      {
        slidesToScroll: 1, // Nombre de slide lors du scroll
        slidesVisible: 1, // Nombre de slide visible
      },
      options
    );
    this.currentSlide = currentSlide;
    this.goToSlide(this.currentSlide);
    this.navigation();
  }

  /** ---------- Navigation dans le carousel ---------- */
  navigation() {
    /** Création d'une nouvelle fonction qui a pour contexte "this" de la valeur passée */
    prevNavigation.addEventListener("click",this.prev.bind(this)); 
    nextNavigation.addEventListener("click", this.next.bind(this));

    /** ---------- Navigation avec le clavier ---------- */
    lightboxDisplay.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.prev();
      }
      if (e.key === "ArrowRight") {
        this.next();
      }
      if (e.key === "Escape") {
        closeLightbox();
      }
    });
  }

  /** ---------- Afficher le média suivant ---------- */
  next() {
    this.goToSlide(this.currentSlide + this.options.slidesToScroll);
  }

  /** ---------- Afficher le média précédent ---------- */
  prev() {
    this.goToSlide(this.currentSlide - this.options.slidesToScroll);
  }

  /** ---------- Afficher le média selon index ---------- */
  goToSlide(index) {
    if (index < 0) {
      index = this.element - this.options.slidesVisible;
    } else if (index > this.element - this.options.slidesVisible) {
      index = 0;
    }
    const lightboxContainer = document.getElementById("lightbox-container");
    /** index de la photo multiplié par -100 puis divisé par le nombre de média total pour obtenir le pourcentage de décalage lors du clic d'ouverture */
    let ratioSlider = (index * -100) / this.element; 
    /** Nombre de média multiplié par 100% --> pour agrandir la largeur du carousel en fonction du nombre de média */
    let ratioWidth = 100 * this.element; 
    lightboxContainer.style.transform = "translateX(" + ratioSlider + "%)"; /** Décale l'affichage selon le ratioSlider */
    lightboxContainer.style.width = ratioWidth + "%";
    this.currentSlide = index;
  }
}

/***************************************************** LIKES *********************************************************************/

/** ---------- FETCH DATA pour récupérer les infos média du fichier JSON ---------- */
async function getLikes() {
    await fetch("./data/photographers.json")
      .then((res) => res.json())
      .then((data) => (medias = data.media));
    return {
      medias: [...medias],
    };
  }
  
/** ---------- GESTION DES LIKES  ---------- */
function addClic() {
  /** Elements du DOM */
  const likesInput = document.querySelectorAll(".like-input");

  /** ---------- Ecoute les inputs des likes ---------- */
  likesInput.forEach((likeInput) => {
    likeInput.addEventListener("click", (e) => {
      /** ---------- Variables ---------- */
      let likeText = parseInt(e.target.nextSibling.textContent); /** Transforme en nombre le texte à côté de l'input (label = nombre de like) */
      let liked = e.target.nextSibling; /** Texte du label (nombre de like) */
      let maker = e.currentTarget; /** Input cible */
  
      /** Si l'input cible est non checké */
      if (!maker.checked) {
        likeText--; /** Décremente le label */
        /** Si l'input cible est checké */
      } else {
        likeText++; /** Incrémente le label */
      }
      liked.textContent = likeText; /** Modifie le label */
      displayLikes(); /** Rappel de la fonction d'affichage des likes du photopgraphe */
    });
  });
}
  
/** ---------- AFFICHAGE DU TOTAL DES LIKES ---------- */
function displayLikes() {
  /** ---------- Elements du DOM ---------- */
  const nbrLikes = document.querySelectorAll(".like-label");
  const displayLikeCounter = document.querySelector(".counter-likes");

  /** ---------- Variables ---------- */
  let likesText = 0;
  let totalLike = 0;
  let arrayLikes = [];

  nbrLikes.forEach((like) => {
    /** Transforme en nombre le texte à côté de l'input (label = nombre de like) */
    likesText = parseInt(like.textContent);
    /** Alimente le tableau "arrayLikes" du nombre de like de chaque média du photographe */ 
    arrayLikes.push(likesText); 
    totalLike = arrayLikes.reduce((accumulator, currentValue) => {return accumulator + currentValue;}, 0); /** Calcule la somme du tableau */
    return (displayLikeCounter.textContent = totalLike + " "); /** Met à jour le total des likes du photographe */
  });
}
  
/** ---------- Initialisation pour la gestion et affichage des likes ---------- */
async function initLike() {
  await initGalery(); /** Attend l'initialisation de la galerie */
  getLikes(); /** Appel de la fonction  qui récupère les données concernant les likes */
  return (addClic(), displayLikes()); /** Renvoi les fonctions d'affichage du total des likes et la gestion des likes */
}
  
/** ---------- Appel de la fonction pour la gestion et affichage des likes ---------- */
initLike();


/***************************************************** LISTBOX *********************************************************************/

/** ---------- Eléments du DOM ---------- */
const selectElt = document.querySelector("select");
const listboxCustom = document.querySelector(".listbox-custom");

/** ---------- Création de la nouvelle listbox ---------- */
const listboxCustomtNew = document.createElement("div");
listboxCustomtNew.setAttribute("class","listbox-custom-new");
listboxCustomtNew.setAttribute("role", "button");
listboxCustomtNew.setAttribute("aria-haspopup", "listbox");
listboxCustomtNew.setAttribute("aria-expanded", "");
listboxCustomtNew.setAttribute("tabindex", 0);
listboxCustomtNew.innerHTML = selectElt.options[selectElt.selectedIndex].innerHTML;
listboxCustom.appendChild(listboxCustomtNew);

/** ---------- Création de la liste déroulante ---------- */
const newMenu = document.createElement("div");
newMenu.classList.add("select-items", "select-hide");
newMenu.setAttribute("id", "listbox-select-items");
newMenu.setAttribute("aria-haspopup", "listbox");
newMenu.setAttribute("aria-expanded", "true");
newMenu.setAttribute("tabindex", "0");

/** ---------- Création de la listbox avec les options du select ---------- */
for (let option of selectElt.options) {
  const newOption = document.createElement("div");
  newOption.setAttribute("role", "listbox");
  newOption.setAttribute("aria-activedescendant", "trier");
  newOption.setAttribute("aria-labelledby", "listbox-select-items");
  newOption.setAttribute("tabindex", "0");
  newOption.innerHTML = option.innerHTML;

  /** ---------- Ecoute les options et à chaque clic modifie l'option de tri ---------- */
  newOption.addEventListener("click", function () {
    const changeOption = () => {
      for (let option of selectElt.options) {
        if (option.innerHTML === this.innerHTML) {
          selectElt.selectedIndex = option.index;
          listboxCustomtNew.innerHTML = this.innerHTML;
        }
      }
      listboxCustomtNew.click(); /** on simule un clic sur "listboxCustomtNew" (pour fermer la liste) */
    };
    changeOption();
  });

  /** ---------- Ecoute les options et à chaque pression de la touche ENTER modifie l'option de tri ---------- */
  newOption.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const changeOption = () => {
        for (let option of selectElt.options) {
          if (option.innerHTML === this.innerHTML) {
            selectElt.selectedIndex = option.index;
            listboxCustomtNew.innerHTML = this.innerHTML;
          }
        }
        listboxCustomtNew.click();
      };
      changeOption();
    }
  });

  /** ---------- On rattache les options à la nouvelle listbox ---------- */
  newMenu.appendChild(newOption);
}

/** ---------- On rattache la liste déroulante à la listbox ---------- */
listboxCustom.appendChild(newMenu);

/** ---------- Ecoute les options et à chaque pression de la touche ENTER modifie l'option de tri ---------- */
listboxCustomtNew.addEventListener("click", function (e) {
  /** On empèche la propagation du clic */
  e.stopPropagation();
  /** On retire le "select-hide" de notre liste déroulante */
  this.nextSibling.classList.toggle("select-hide"); // toggle = recherche la chaine de caractère et si présente, il retire)
  /** Ajoute la class "active" sur l'option selectionnée */
  this.classList.toggle("active");
  photographGaleryDisplay();
  initLike();
});

/** ---------- Ecoute les options et à chaque pression de la touche ENTER modifie l'option de tri ---------- */
listboxCustomtNew.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.stopPropagation();
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("active");
    photographGaleryDisplay();
  }
});

/** ---------- Tri la galerie des médias par titre ---------- */
function sortMediaByTitle(a, b) {
  if (a.title.toLowerCase() < b.title.toLowerCase()) {
    return -1;
  }
  if (a.title.toLowerCase() > b.title.toLowerCase()) {
    return 1;
  }
  return 0;
}

/** ---------- Tri la galerie des médias par le nombre de like ---------- */
function sortMediaByLikes(a, b) {
  return b.likes - a.likes;
}

/** ---------- Tri la galerie des médias par leur date ---------- */
function sortMediaByDate(a, b) {
  if (a.date > b.date) {
    return -1;
  }
  if (a.date < b.date) {
    return 1;
  }
  return 0;
}
