window.onload = function () {
    const form = document.querySelector("#myForm");
    const contactsTable = document.querySelector("#contactsTable tbody");
    const contactCountElement = document.getElementById("contactCount");
    const resetButton = document.getElementById("resetButton");

    // Initialiser le compteur de contacts
    let contactCount = 0;

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Empêche le comportement par défaut de soumission

        let formValid = true;
        clearErrorMessages();

        // Validation des champs Nom, Prénom, Adresse
        const fields = ["nom", "prenom", "adresse"];
        fields.forEach(function (field) {
            const input = document.getElementById(field);
            if (input.value.trim().length < 5) {
                showErrorMessage(input, "Doit avoir au moins 5 caractères.");
                formValid = false;
            }
        });

        // Validation de l'email
        const emailInput = document.getElementById("email");
        const email = emailInput.value.trim();
        if (!validateEmail(email)) {
            showErrorMessage(emailInput, "Format d'email invalide.");
            formValid = false;
        }

        // Validation de la date de naissance
        const dateNaissanceInput = document.getElementById("dateNaissance");
        const dateNaissance = new Date(dateNaissanceInput.value);
        const now = new Date();
        if (dateNaissance >= now) {
            showErrorMessage(dateNaissanceInput, "La date ne peut pas être dans le futur.");
            formValid = false;
        }

        // Si le formulaire est valide, ajout du contact au tableau
        if (formValid) {
            ajouterContact();
            form.reset(); // Réinitialise le formulaire

            // Afficher le message de succès
            const successMessage = document.getElementById("successMessage");
            if (successMessage) {
                successMessage.style.display = "block"; 
                successMessage.innerText = "Contact ajouté avec succès !";

                // Masquer le message après 3 secondes
                setTimeout(function() {
                    successMessage.style.display = "none";
                }, 3000);
            }

            // Incrémenter le compteur de contacts et le mettre à jour dans l'interface
            contactCount++;
            contactCountElement.innerText = contactCount;
        }
    });

    // Gérer le bouton "Reset" pour réinitialiser la table des contacts
    resetButton.addEventListener("click", function() {
        contactsTable.innerHTML = ""; 
        contactCount = 0;
        contactCountElement.innerText = contactCount; 
    });

    // Fonction pour valider les emails
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    function showImage(){
        getLocation()
        document.getElementById('gpsImage').style.display= 'block';
    }

    // Fonction pour afficher un message d'erreur
    function showErrorMessage(input, message) {
        const errorContainer = document.createElement("div");
        errorContainer.className = "invalid-feedback";
        errorContainer.textContent = message;
        input.classList.add("is-invalid");
        input.parentNode.appendChild(errorContainer);
    }

    // Fonction pour supprimer les messages d'erreur
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll(".invalid-feedback");
        errorMessages.forEach(function(msg) {
            msg.remove();
        });

        const inputs = document.querySelectorAll("input");
        inputs.forEach(function(input) {
            input.classList.remove("is-invalid");
        });
    }

    // Fonction pour ajouter un contact au tableau
    function ajouterContact() {
        const nom = document.getElementById("nom").value;
        const prenom = document.getElementById("prenom").value;
        const adresse = document.getElementById("adresse").value;
        const email = document.getElementById("email").value;
        const dateNaissance = document.getElementById("dateNaissance").value;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${nom}</td>
            <td>${prenom}</td>
            <td>${dateNaissance}</td>
            <td>${adresse}</td>
            <td>${email}</td>
        `;
        contactsTable.appendChild(row);
    }

    // Fonction pour calculer le nombre de caractères en temps réel
    function calcNbChar(input) {
        const charCount = input.value.length; 
        const countSpan = document.getElementById(`${input.id}-count`); 
        countSpan.textContent = `${charCount} car.`; 
    }

    // Attacher calcNbChar à chaque champ de saisie via 'onkeyup'
    const fieldsToTrack = ["nom", "prenom", "adresse", "email", "dateNaissance"];
    fieldsToTrack.forEach(function (field) {
        const inputField = document.getElementById(field);
        inputField.addEventListener("keyup", function () {
            calcNbChar(inputField);
        });
    });
};
