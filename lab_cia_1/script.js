document
  .getElementById("interestForm")
  .addEventListener("submit", function (e) {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const product = document.getElementById("product").value.trim();
    const msg = document.getElementById("formMsg");
    if (!username || !email || !product) {
      e.preventDefault();
      msg.textContent = "Please fill in all fields.";
    } else {
      msg.textContent = "";
      localStorage.setItem("eshop_name", username);
      localStorage.setItem("eshop_product", product);
    }
  });

window.addEventListener("DOMContentLoaded", function () {
  const name = localStorage.getItem("eshop_name");
  const product = localStorage.getItem("eshop_product");
  if (name && product) {
    const greetDiv = document.createElement("div");
    greetDiv.className =
      "bg-blue-100 text-blue-900 p-4 rounded mb-4 text-center";
    greetDiv.textContent = `Welcome back, ${name}! You were interested in ${product}.`;
    document.querySelector("main").prepend(greetDiv);
  }
});

window.addEventListener("DOMContentLoaded", function () {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude.toFixed(4);
        const lon = position.coords.longitude.toFixed(4);
        const geoDiv = document.createElement("div");
        geoDiv.className =
          "bg-green-100 text-green-900 p-4 rounded mb-4 text-center";
        geoDiv.innerHTML = `<i class="fa-solid fa-location-dot" style="color: #74C0FC;"></i> Your location: Latitude ${lat}, Longitude ${lon}`;
        document.querySelector("main").prepend(geoDiv);
      },
      function () {}
    );
  }
});

let allProducts = [];
let filteredProducts = [];
let sortOrder = "low-high";

async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    allProducts = data.slice(0, 8);
    filteredProducts = [...allProducts];
    displayProducts(filteredProducts);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
fetchProducts();

function displayProducts(products) {
  const container = document.getElementById("productsContainer");
  container.innerHTML = "";
  products.forEach((product) => {
    const div = document.createElement("div");
    div.className =
      "bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-between transition-transform hover:scale-105 h-full";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="mb-6 rounded-lg shadow" style="max-width:200px; max-height:200px; object-fit:contain;">
      <h3 class="font-bold text-xl text-center mb-4">${product.title}</h3>
      <p class="text-gray-700 text-center mb-6 font-semibold text-lg">$${product.price}</p>
      <button class="bg-blue-600 text-white px-8 py-3 rounded font-bold hover:bg-blue-700 transition-colors w-full">View Details</button>
    `;
    container.appendChild(div);
  });
}

document.getElementById("searchBtn").addEventListener("click", function () {
  const searchValue = document
    .getElementById("searchBox")
    .value.trim()
    .toLowerCase();
  filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchValue)
  );
  sortAndDisplay();
});

document
  .getElementById("sortDropdown")
  .addEventListener("change", function (e) {
    sortOrder = e.target.value;
    sortAndDisplay();
  });

function sortAndDisplay() {
  let sorted = [...filteredProducts];
  if (sortOrder === "low-high") {
    sorted.sort((a, b) => a.price - b.price);
  } else {
    sorted.sort((a, b) => b.price - a.price);
  }
  displayProducts(sorted);
}

const productsForForm = ["Product A", "Product B", "Product C"];
const productSelect = document.getElementById("product");
productsForForm.forEach((product) => {
  const option = document.createElement("option");
  option.value = product;
  option.textContent = product;
  productSelect.appendChild(option);
});
