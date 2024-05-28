'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header sticky & back top btn active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
}

addEventOnElem(window, "scroll", headerSticky);



/**
 * scroll reveal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);



/**
 * cart and wishlist selection
 */

// Get cart and star buttons
const cartBtn = document.querySelector('.cart-btn');
const starBtn = document.querySelector('.star-btn');

// Initialize item count and total price
let cartCount = 0;
let favCount = 0;
let totalPrice = 0;

// Function to update cart information
function updateCart() {
  cartBtn.querySelector('.btn-badge').textContent = cartCount;
  cartBtn.querySelector('.btn-text').textContent = `$${totalPrice.toFixed(2)}`;
}

// Function to update star information
function updateStar() {
  starBtn.querySelector('.btn-badge').textContent = favCount;
}

// Function to toggle cart icon
function toggleCartIcon(button) {
  const icon = button.querySelector('ion-icon');
  if (icon.name === 'bag-handle-outline') {
    icon.name = 'checkmark-outline';
  } else {
    icon.name = 'bag-handle-outline';
  }
}

// Function to toggle star icon
function toggleStarIcon(button) {
  const icon = button.querySelector('ion-icon');
  if (icon.name === 'star-outline') {
    icon.name = 'star';
  } else {
    icon.name = 'star-outline';
  }
}

// Function to remove items from cart
function removeFromCart(button) {
  // Get product price
  const productPrice = parseFloat(button.closest('.shop-card').querySelector('.price .span').textContent.slice(1));
  // Update total price and item count
  totalPrice -= productPrice;
  cartCount--;
  // Update cart information
  updateCart();
  // Toggle cart icon
  toggleCartIcon(button);
}

// Add event listener to cart buttons to toggle icon and remove item
const addToCartButtons = document.querySelectorAll('.action-btn[aria-label="add to cart"]');
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.querySelector('ion-icon').name === 'bag-handle-outline') {
      // Toggle cart icon
      toggleCartIcon(button);
      // Get product price
      const productPrice = parseFloat(button.closest('.shop-card').querySelector('.price .span').textContent.slice(1));
      // Update total price and item count
      totalPrice += productPrice;
      cartCount++;
      // Update cart information
      updateCart();
    } else {
      // Remove item from cart
      removeFromCart(button);
    }
  });
});

// Function to remove items from fav
function removeFromFav(button) {
  favCount--;
  // Update cart information
  updateStar();
  // Toggle cart icon
  toggleStarIcon(button);
}

// Add event listener to star buttons
const addToStarButtons = document.querySelectorAll('.action-btn[aria-label="add to whishlist"]');
addToStarButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.querySelector('ion-icon').name === 'star-outline') {
      // Toggle cart icon
      toggleStarIcon(button);
      favCount++;
      // Update cart information
      updateStar();
    } else {
      // Remove item from cart
      removeFromFav(button);
    }
  });
});



/**
 * product description
 */

function toggleDescription(productId) {
  var description = document.getElementById(productId + '-description');
  var descriptionContent = document.getElementById('description-content');
  var br = document.querySelector('#' + productId + '-description + br'); // Check if <br> exists

  var computedStyle = window.getComputedStyle(description); // Get the computed style of the description

  if (computedStyle.display === "none") { // Check if the description is hidden
    description.style.display = "block";
    if (!br) { // Add <br> only if it doesn't exist
      description.insertAdjacentHTML('afterend', '<br>'); // Insert <br> after the description
    }
  } else {
    description.style.display = "none";
    if (br) { // Remove <br> if it exists
      br.remove();
    }
  }
}

// Hide descriptions by default
document.querySelectorAll('.product-description').forEach(function(description) {
  description.style.display = 'none';
});

