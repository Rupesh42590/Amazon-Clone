import { products } from "./products.js";
class ShoppingCart {
  cart;
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
  }
  addToCart(productId, button) {
    let matchingItem = this.cart.find((item) => item.productId === productId);
    if (matchingItem) {
      matchingItem.quantity += parseFloat(
        button.closest(".product-container").querySelector(".custom-select")
          .value,
        10
      );
      localStorage.setItem("cart", JSON.stringify(this.cart));
    } else {
      this.cart.push({
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
  updateCartQuantity(button) {
    let cartQuantity = 0;
    this.cart.forEach((item) => {
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

  updateHeaderCartQuantity() {
    let cartQuantity = 0;
    this.cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector(".cart-q").textContent = cartQuantity;
  }
  updateHeaderCartQuantity() {
    let cartQuantity = 0;
    this.cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector(".cart-q").textContent = cartQuantity;
  }
  initializeCartFunctionality() {
    this.updateHeaderCartQuantity();
    document.querySelectorAll(".add-cart-button").forEach((button) => {
      button.addEventListener("click", () => {
        const productId =
          button.closest(".product-container").dataset.productId;

        this.addToCart(productId, button);
        this.updateCartQuantity(button);
      });
    });
  }
}
export default ShoppingCart;
