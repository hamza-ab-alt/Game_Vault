// js/cart.js

// 1. Récupérer les éléments du DOM
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountBadge = document.getElementById('cart-count');
const orderSummary = document.getElementById('order-summary');
const checkoutBtn = document.getElementById('checkout-btn');

// 2. Initialiser le panier depuis localStorage
let cart = JSON.parse(localStorage.getItem('gamevault_cart')) || [];

// 3. Fonction principale pour afficher le panier
function updateCartUI() {
    if (!cartItemsContainer) return; // Sécurité

    cartItemsContainer.innerHTML = '';
    if (orderSummary) orderSummary.innerHTML = '';
    
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-300">
                <i class="fa-solid fa-cart-shopping text-4xl text-gray-200 mb-4"></i>
                <p class="text-gray-500 font-medium text-xl">Votre panier est vide</p>
                <a href="index.html" class="inline-block mt-4 text-black font-bold underline">Retourner à l'accueil</a>
            </div>`;
        if (cartTotalElement) cartTotalElement.textContent = '0.00 €';
        if (cartCountBadge) cartCountBadge.textContent = '0';
        return;
    }

