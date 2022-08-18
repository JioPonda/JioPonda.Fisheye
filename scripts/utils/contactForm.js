/** Ouverture de la modal*/ 
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    modal.setAttribute("role" , "dialog");
    main.style.display = "none";
    main.setAttribute("aria-hidden" , "true");
    return true;
}

/** Fermeture de la modal*/ 
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    main.style.display = "block";
    main.setAttribute("aria-hidden" , "false");
}


const modalId = document.getElementById("contact_modal");
modalId.addEventListener('Keydown' , e => {
    const keyCode = e.keyCode ?  e.keyCode : e.which
    if (keyCode === 27) {
        return closeModal();
    }
});

// // Close modal when escape key is pressed
// $(document).on('keydown', e => {
//     const keyCode = e.keyCode ? e.keyCode : e.which
  
//     if ( keyCode === 27) {
//        return closeModal()
//     }
//  })