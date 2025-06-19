import { products } from "./products.js";
class ShoppingCart {
  cart;
  cartQuantity = 0;
  headerCartQuantity = 0;
  updateHTML = "";
  deliveryDate;
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
  }
  updateDate() {
    if (document.getElementById("7").checked) {
      this.deliveryDate = dayjs().add(7, "days").format("dddd, MMMM D");
    } else if (document.getElementById("5").checked) {
      this.deliveryDate = dayjs().add(5, "days").format("dddd, MMMM D");
    } else if (document.getElementById("5").checked) {
      this.deliveryDate = dayjs().add(1, "days").format("dddd, MMMM D");
    }
  }

  updateCartBody() {
    if (this.cart.length === 0) {
      this.updateHTML = `
      <div class="checkout-body-left-no-items">
      <div class="checkout-body-left-content">
         Your cart is empty.
        </div>
      <a href="index.html">
            <button class="checkout-body-left-button">Continue shopping</button>
        </a>
        </div>
      `;
      return;
    }
    this.updateHTML = "";
    this.cart.forEach((item) => {
      const product = products.find((product) => product.id === item.productId);
      this.updateHTML += `
     <div class="js-cart-item cart-item-container" data-cart-item-id="${
       product.id
     }" data-testid="cart-item-container-${product.id}">

          <div class="delivery-date">
            Delivery date:
            <span class="js-delivery-date">${this.deliveryDate}   </span>
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${product.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${product.name}
              </div>

              <div class="product-price">
                $${(product.priceCents/100).toFixed(2)}
                
              </div>

              

              <div class="js-quantity-container product-quantity" data-testid="quantity-container">
                Quantity: <span class="js-quantity-label quantity-label" data-testid="quantity-label">${
                  item.quantity
                }</span>

                <input class="js-new-quantity-input new-quantity-input hidden" type="number" value="${
                  item.quantity
                }" data-testid="new-quantity-input">

                <span class="js-update-quantity-link update-quantity-link link-primary" data-cart-item-id="${
                  product.id
                }" data-testid="update-quantity-link">
                  Update
                </span>

                <span class="js-save-quantity-link save-quantity-link link-primary hidden" data-testid="save-quantity-link">
                  Save
                </span>

                <span class="js-delete-quantity-link delete-quantity-link link-primary" data-cart-item-id="${
                  product.id
                }" data-testid="delete-quantity-link">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>

              
        <div class="js-delivery-option delivery-option" data-delivery-option-id="f297d333-a5c4-452f-840b-15a662257b3f" data-testid="delivery-option-f297d333-a5c4-452f-840b-15a662257b3f">

          <input class="js-delivery-option-input delivery-option-input" checked="" name="${
            product.id
          }-delivery-option" type="radio" id="7" data-testid="delivery-option-input">

          <div>
            <div class="delivery-option-date">
${dayjs().add(7, "days").format("dddd, MMMM D")}               </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
      
        <div class="js-delivery-option delivery-option" data-delivery-option-id="6e2dd65a-6665-4f24-bcdc-f2ecdbc6e156" data-testid="delivery-option-6e2dd65a-6665-4f24-bcdc-f2ecdbc6e156">

          <input class="js-delivery-option-input delivery-option-input" name="${
            product.id
          }-delivery-option" type="radio" id="5" data-testid="delivery-option-input">

          <div>
            <div class="delivery-option-date">
${dayjs().add(5, "days").format("dddd, MMMM D")}               </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
      
        <div class="js-delivery-option delivery-option" data-delivery-option-id="178aa766-de75-4686-8442-038c1a027003" data-testid="delivery-option-178aa766-de75-4686-8442-038c1a027003">

          <input class="js-delivery-option-input delivery-option-input" name="${
            product.id
          }-delivery-option" type="radio" id="1" data-testid="delivery-option-input">

          <div>
            <div class="delivery-option-date">
${dayjs().add(1, "days").format("dddd, MMMM D")}            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      
            </div>
          </div>
        </div>
      `;
    });
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
    console.log(this.cartQuantity);
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
    console.log(this.headerCartQuantity);
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
