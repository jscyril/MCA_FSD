// Toggle hamburger menu
document.getElementById("menu-btn").addEventListener("click", () => {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
});

const countries = [
  "India",
  "Japan",
  "France",
  "Brazil",
  "Canada",
  "Germany",
  "Australia",
  "Italy",
  "Spain",
  "South Africa",
  "Egypt",
  "Mexico",
  "Argentina",
  "Russia",
  "Norway",
  "Indonesia",
  "Thailand",
  "Vietnam",
  "Switzerland",
  "United Kingdom",
];

function getRandomCountries(count) {
  const shuffled = [...countries].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const selectedCountries = getRandomCountries(5);
const container = document.getElementById("destinations");

container.innerHTML = "";

selectedCountries.forEach((countryName) => {
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to fetch ${countryName}`);
      return response.json();
    })
    .then((data) => {
      const country = data[0];

      const div = document.createElement("div");
      div.className =
        "bg-white p-4 rounded shadow hover:shadow-lg transition text-center";

      div.innerHTML = `
        <img src="${country.flags.png}" alt="Flag of ${
        country.name.common
      }" class="w-full h-40 object-cover mb-4 rounded">
        <h3 class="text-xl font-bold">${country.name.common}</h3>
        <p class="text-gray-600">Capital: ${country.capital?.[0] || "N/A"}</p>
        <p class="text-gray-600">Region: ${country.region}</p>
        <p class="text-gray-600">Population: ${country.population.toLocaleString()}</p>
      `;

      container.appendChild(div);
    })
    .catch((error) => {
      const div = document.createElement("div");
      div.className = "bg-red-100 text-red-700 p-4 rounded text-center shadow";
      div.textContent = `Error loading ${countryName}: ${error.message}`;
      container.appendChild(div);
    });
});
