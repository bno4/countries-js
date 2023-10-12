const countriesCard = document.querySelector(".countries-container");
const inputSearch = document.getElementById("inputSearch");
console.log(inputSearch);
const btns = document.querySelectorAll("button");
let sortMethod = "maxToMin"; // affichage par défaut des pays du plus grand au plus petit

// 2 - Passer les données fetchées à une variable tableau
let countries = [];

// 1- fonction pour "fetcher" les données
const fetchCountries = async () => {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countries = data));
  displayCountries();
  console.log(countries[0]);
};

// fetch au chargement de la page
window.addEventListener("load", fetchCountries);

const displayCountries = () => {
  countriesCard.innerHTML = countries
    .filter(
      (country) =>
        country.translations.fra.common
          .toLowerCase()
          .includes(inputSearch.value.toLowerCase()) //toLowerCase pour retirer la sensibilité à la casse
    )
    .sort((a, b) => {
      if (sortMethod === "maxToMin") return b.population - a.population;
      else if (sortMethod === "minToMax") {
        return a.population - b.population;
      } else if (sortMethod === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .slice(0, inputRange.value)
    .map((country) => {
      return `<div class = "country-container">
      <img src="${country.flags.svg}" alt="Drapeau ${
        country.translations.fra.common
      }">
      <h3>${country.translations.fra.common}</h3>
      <h4>${country.capital}</h4>
      <p>Population : ${country.population.toLocaleString()}</p>
      </div>`;
    })
    .join("");
};

inputSearch.addEventListener("input", () => {
  displayCountries();
});

inputRange.addEventListener("input", () => {
  displayCountries();
  rangeValue.innerText = inputRange.value; // association de la value de l'input range avec le span d'affichage de la value choisie
});

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id; // on passe l'id du boutton cliqué à la variable sortMethod
    displayCountries();
  });
});
