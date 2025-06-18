import { products } from "./products.js";
class ShoppingCart {
  cart;
  cartQuantity = 0;
  headerCartQuantity = 0;
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
      localStorage.setItem("cart", JSON.stringify(this.cart));
    }
  }
  updateCartQuantity(button) {
    let cartQuantity = 0;

    this.cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector(".cart-q").textContent = cartQuantity;
    this.updateMenu();
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
    this.cartQuantity = 0;
    this.cart.forEach((item) => {
      this.cartQuantity += item.quantity;
    });
    document.querySelector(".cart-q").textContent = this.cartQuantity;
  }

  initializeCartFunctionality() {
    this.updateHeaderCartQuantity();
    this.updateMenu();
    document.querySelectorAll(".add-cart-button").forEach((button) => {
      button.addEventListener("click", () => {
        const productId =
          button.closest(".product-container").dataset.productId;

        this.addToCart(productId, button);
        this.updateCartQuantity(button);
      });
    });
  }
  updateMenu() {
    this.headerCartQuantity = 0;
    this.cart.forEach((item) => {
      this.headerCartQuantity += item.quantity;
    });
    document.querySelector(
      ".cm"
    ).innerHTML = `Cart (<span class="cq">${this.headerCartQuantity}</span>)`;
  }
  updateCartMenu() {
    this.headerCartQuantity = 0;
    this.cart.forEach((item) => {
      this.headerCartQuantity += item.quantity;
    });
    document.querySelector(
      ".checkout-header-content"
    ).innerHTML = `Checkout (<span class="items">${this.headerCartQuantity} items</span>)`;
  }

  showMenu() {
    document.querySelector(".menu").addEventListener("click", () => {
      document.querySelector(".RO").classList.toggle("hidden");
      document.querySelector(".cm").classList.toggle("hidden");
    });
  }
}
export default ShoppingCart;
