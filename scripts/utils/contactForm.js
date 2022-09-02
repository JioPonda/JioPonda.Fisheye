/** Ouverture de la modal*/ 
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    modal.setAttribute("role" , "dialog");
    // main.style.opacity = 0.5;
    main.style.display = "none";
    main.setAttribute("aria-hidden" , "true");
};

/** Fermeture de la modal*/ 
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    main.style.display = "block";
    main.setAttribute("aria-hidden" , "false");
};

/** création de la function de récupération des données saisie dans la modal */ 
function sendInfos () {
    const labelFirst = document.getElementById("firstName").value;
    const labelLast = document.getElementById("lastName").value;
    const labelEmail = document.getElementById("email").value;
    const labelMessage = document.getElementById("message").value;
    console.log(labelFirst , labelLast , labelEmail , labelMessage);
};

/** Ouverture de la LightBox*/ 
function openLightBox() {
    const lightBox = document.getElementById("lightBox");
    lightBox.style.display = "block";
    main.style.display = "none";
    main.setAttribute("aria-hidden" , "true");
};

/** Fermeture de la LightBox*/ 
function closeLightBox() {
    const lightBox = document.getElementById("lightBox");
    lightBox.style.display = "none";
    main.style.display = "block";
    main.setAttribute("aria-hidden" , "false");
};