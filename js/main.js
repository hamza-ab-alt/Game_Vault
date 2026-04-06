import { games } from "./data.js";

const gamesGrid = document.getElementById("games-grid");
const searchInput = document.getElementById("search-input");
const categoryButtons = document.querySelectorAll(".cat-btn");

function displayGames(filteredGames) {
  gamesGrid.innerHTML = "";

  filteredGames.forEach((game) => {
    const gameCard = `
            <div class="group cursor-pointer flex flex-col">
                <div class="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-4">
                    <img src="${game.image}" alt="${game.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                    <span class="absolute top-4 right-4 bg-black text-white text-[11px] font-bold px-3 py-1.5 rounded-xl uppercase shadow-lg">
                        ${game.category}
                    </span>
                </div>
                <div class="px-2">
                    <h3 class="text-2xl font-bold text-gray-900 mb-1">${game.title}</h3>
                    <p class="text-2xl font-black text-gray-900 mb-4">${game.price.toFixed(2)} €</p>
                    
                    <button class="w-full bg-black text-white py-4 rounded-[1.5rem] font-bold flex items-center justify-center gap-3 hover:bg-gray-800 transition-all active:scale-95 add-to-cart" data-id="${game.id}">
                        <i class="fa-solid fa-cart-shopping"></i>
                        Ajouter au Panier
                    </button>
                </div>
            </div>
        `;
    gamesGrid.innerHTML += gameCard;
  });
}

function filterGames() {
  const searchTerm = searchInput.value.toLowerCase();
  const activeCategory =
    document.querySelector(".cat-btn.bg-black").dataset.category;

  const filtered = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm);
    const matchesCategory =
      activeCategory === "All" || game.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  displayGames(filtered);
}

searchInput.addEventListener("input", filterGames);

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => {
      b.classList.remove("bg-black", "text-white");
      b.classList.add("bg-white", "text-gray-900");
    });
    btn.classList.add("bg-black", "text-white");
    btn.classList.remove("bg-white");

    filterGames();
  });
});

displayGames(games);

let cart = JSON.parse(localStorage.getItem("gamevault_cart")) || [];

function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalItems;
}

function addToCart(gameId) {
  const gameToAdd = games.find((g) => g.id === gameId);

  const existingItem = cart.find((item) => item.id === gameId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...gameToAdd, quantity: 1 });
  }

  localStorage.setItem("gamevault_cart", JSON.stringify(cart));
  updateCartBadge();

  // alert(`${gameToAdd.title} ajouté au panier !`);
}

gamesGrid.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-to-cart");
  if (btn) {
    const id = parseInt(btn.dataset.id);
    addToCart(id);
  }
});

updateCartBadge();
