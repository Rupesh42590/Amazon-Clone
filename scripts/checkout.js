import { products } from "./products.js";
export function cart() {
  document.querySelectorAll(".add-cart-button").forEach((button) => {
    button.addEventListener("click", () => {
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
    });
  });
}
