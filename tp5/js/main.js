var app = new Vue({
    el: "#weatherApp", // Cible l'élément HTML avec l'ID "weatherApp"
    data: {
        // Variable utilisée pour saisir le nom de la ville via v-model
        formCityName: "",

        // Message d'erreur ou de validation à afficher
        messageForm: "",

        // Liste des villes saisies, initialisée avec Paris
        cityList: [
            {
                name: "Paris",
            },
        ],

        // Variable pour stocker la réponse météo
        cityWeather: null,
        cityWeatherLoading: false, // Indicateur de chargement
        message: "", // Message d'information ou d'erreur
    },
    
    methods: {
        // Méthode pour ajouter une ville
        addCity: function (event) {
            event.preventDefault(); // Empêche la page de se recharger lors de la soumission du formulaire

            // Vérification si la ville existe déjà
            if (this.isCityExist(this.formCityName)) {
                // Si la ville existe déjà, affichage d'un message d'erreur
                this.messageForm = "existe déjà"; 
            } else if (this.formCityName.trim() !== "") {
                // Si la ville n'existe pas déjà et que le champ n'est pas vide, ajout de la ville à la liste
                this.cityList.push({ name: this.formCityName });

                // Remise à zéro du champ de saisie et du message d'erreur
                this.messageForm = "";
                this.formCityName = "";
            } else {
                // Affichage d'un message si le champ est vide
                this.messageForm = "Le champ ne peut pas être vide.";
            }
        },

        // Méthode pour vérifier si une ville existe déjà dans la liste
        isCityExist: function (_cityName) {
            // Utilise la méthode 'filter' pour vérifier si la ville existe déjà dans la liste
            let filteredCities = this.cityList.filter(
                (item) => item.name.toUpperCase() === _cityName.toUpperCase() // Comparaison insensible à la casse
            );
            return filteredCities.length > 0; // Retourne `true` si la ville existe déjà, sinon `false`
        },

        // Méthode pour récupérer les données météo via l'API OpenWeatherMap
        meteo: function (_city) {
            this.cityWeatherLoading = true;

            // Remplacer 'VOTRE_APIKEY' par votre clé d'API OpenWeatherMap
            fetch('https://api.openweathermap.org/data/2.5/weather?q='+ _city.name + '&units=metric&lang=fr&appid=VOTRE_APIKEY')
                .then(function(response) {
                    return response.json(); // On attend la réponse en JSON
                })
                .then(function(json) {
                    app.cityWeatherLoading = false;

                    // Vérification du code de réponse
                    if(json.cod == 200) {
                        // Si tout va bien, on stocke les données météo dans `cityWeather`
                        app.cityWeather = json;
                        app.message = null;
                    } else {
                        // Si la ville est introuvable ou autre erreur
                        app.cityWeather = null;
                        app.message = 'Météo introuvable pour ' + _city.name + ' (' + json.message + ')';
                    }
                })
                .catch(function(error) {
                    app.cityWeatherLoading = false;
                    app.message = "Erreur de communication avec l'API.";
                });
        },
    },
});
