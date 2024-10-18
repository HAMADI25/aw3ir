document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    let formValid = true; 
    let errors = [];

    
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const dateNaissance = document.getElementById('dateNaissance').value;
    const adressePostale = document.getElementById('adressePostale').value;
    const email = document.getElementById('email').value;

    // Validation Nom (5 caractères minimum)
    if (nom.length < 5) {
        errors.push("Le nom doit comporter au moins 5 caractères.");
        formValid = false;
    }

    /
    if (prenom.length < 5) {
        errors.push("Le prénom doit comporter au moins 5 caractères.");
        formValid = false;
    }

    // Validation Date de naissance (ne doit pas être dans le futur)
    const birthdayTimestamp = new Date(dateNaissance).getTime();
    const nowTimestamp = Date.now();
    if (birthdayTimestamp >= nowTimestamp || isNaN(birthdayTimestamp)) {
        errors.push("La date de naissance ne peut pas être dans le futur.");
        formValid = false;
    }

    // Validation Adresse postale (5 caractères minimum)
    if (adressePostale.length < 5) {
        errors.push("L'adresse postale doit comporter au moins 5 caractères.");
        formValid = false;
    }

    // Validation Email (doit être bien formaté)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        errors.push("Veuillez entrer une adresse email valide.");
        formValid = false;
    }

    // Affichage des erreurs ou soumission réussie
    if (!formValid) {
        alert(errors.join("\n")); // Affiche les erreurs dans une alerte
    } else {
        alert("Formulaire soumis avec succès !");
    }
});
