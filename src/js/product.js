import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Initialize the cart in localStorage if needed
function initializeCart() {
  const cart = localStorage.getItem("so-cart");
  if (!cart || !Array.isArray(JSON.parse(cart))) {
    console.log("Initializing cart as empty array.");
    localStorage.setItem("so-cart", JSON.stringify([]));
  }
}

function addProductToCart(product) {
  let currentCart = JSON.parse(localStorage.getItem("so-cart") || "[]");

  // Ensure `currentCart` is an array
  if (!Array.isArray(currentCart)) {
    console.warn("Corrupted cart data detected, resetting to empty array.");
    currentCart = [];
  }

  currentCart.push(product);
  setLocalStorage("so-cart", currentCart);
  console.log("Updated cart:", currentCart);
}

// Add to cart button event handler
async function addToCartHandler(e) {
  const productId = e.target.dataset.id;
  console.log("Clicked product ID:", productId);

  if (!productId) {
    console.error("Product ID not found on the button.");
    return;
  }

  const product = await dataSource.findProductById(productId);
  console.log("Fetched product:", product);

  if (product) {
    try {
      addProductToCart(product);
      console.log("Product successfully added to cart!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  } else {
    console.error("Product not found for ID:", productId);
  }
}

// Initialize cart and add event listener
initializeCart();

const addToCartButton = document.getElementById("addToCart");
if (addToCartButton) {
  addToCartButton.addEventListener("click", addToCartHandler);
} else {
  console.error("Add to Cart button not found.");
}