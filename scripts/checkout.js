import { products } from "./products.js";
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId, button) {
  let matchingItem = cart.find((item) => item.productId === productId);
  if (matchingItem) {
    matchingItem.quantity += parseFloat(
      button.closest(".product-container").querySelector(".custom-select")
        .value,
      10
    );
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    cart.push({
      productId: productId,
      quantity: parseFloat(
        button.closest(".product-container").querySelector(".custom-select")
          .value,
        10
      ),
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
function updateCartQuantity(button) {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector(".cart-q").textContent = cartQuantity;
  button
    .closest(".product-container")
    .querySelector(".added ")
    .classList.remove("hidden");
  setTimeout(() => {
    button
      .closest(".product-container")
      .querySelector(".added")
      .classList.add("hidden");
  }, 3000);
}
function updateHeaderCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector(".cart-q").textContent = cartQuantity;
}
export function initializeCartFunctionality() {
  updateHeaderCartQuantity();
  document.querySelectorAll(".add-cart-button").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.closest(".product-container").dataset.productId;

      addToCart(productId, button);
      updateCartQuantity(button);
    });
  });
}
