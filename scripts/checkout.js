import { products } from "./products.js";

class ShoppingCart {
  cart;
  cartQuantity = 0;
  headerCartQuantity = 0;
  itemPrice = 0;
  shippingPriceCents = 0;
  totalShippingPrice = 0;
  updateHTML = "";
  updateHTML2 = "";
  deliveryDate;
  orderplaced = false;
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
  }
  itemsPrice() {
    this.cart.forEach((item) => {
      const prod = products.find((p) => p.id === item.productId);
      this.itemPrice += Number(
        ((prod.priceCents * item.quantity) / 100).toFixed(2)
      );
      console.log(this.itemPrice);
    });
  }
  reducePrice() {
    this.cart.forEach((item) => {
      const prod = products.find((p) => p.id === item.productId);
      this.itemPrice -= Number(
        ((prod.priceCents * item.quantity) / 100).toFixed(2)
      );
      console.log(this.itemPrice);
    });
  }
  buyAgain() {
    document.querySelectorAll(".js-buy-again-button").forEach((button) => {
      button.closest(".order-container").addEventListener("click", () => {
        if (
          this.cart.find((item) => item.productId === button.dataset.orderId)
        ) {
          this.cart.find(
            (item) => item.productId === button.dataset.orderId
          ).quantity += 1;
        } else {
          this.cart.push({ productId: button.dataset.orderId, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(this.cart));
        window.location.href = "cart.html";
      });
    });
  }
  placeOrder() {
    document.querySelector(".place-order").addEventListener("click", () => {
      this.orderplaced = true;
      this.updateHTML2 = localStorage.getItem("updateHTML2") || "";

      this.cart.forEach((item) => {
        const product = products.find((p) => p.id === item.productId);

        this.updateHTML2 += `
          <div class="order-container" data-testid="order-container-${
            product.id
          }">
              <div class="order-header">
                <section class="left-section">
                  <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div> ${dayjs().add(7, "days").format("dddd, MMMM D")} </div>
                  </div>
                  <div class="order-total">
                    <div class="order-header-label">Total:</div>
                      <div>$${(
                        this.itemPrice + this.totalShippingPrice
                      ).toFixed(2)}</div>
                  </div>
                </section>
    
                <section class="right-section">
                  <div class="order-header-label">Order ID:</div>
                  <div>${product.id}</div>
                </section>
              </div>
    
              <div class="order-details-grid">
                
            <div class="product-image-container">
              <img src="${product.image}">
            </div>
    
            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
    
              <div class="product-delivery-date">
                Arriving on: ${this.deliveryDate}
              </div>
    
              
    
              <div class="product-quantity">
                  Quantity: ${item.quantity}
              </div>
    
             
            </div>
             <button class="js-buy-again-button buy-again-button button-primary" data-order-id="${
               product.id
             }" data-cart-item-id="${
          product.id
        }" data-testid="buy-again-button-${product.id}">
                <span class="buy-again-message">Buy it again</span>
  
              </button>
    
            
          
              </div>
            </div>
          `;
        localStorage.setItem("updateHTML2", this.updateHTML2);
        this.cart.find((item) => item.productId === product.id).quantity = 0;
        localStorage.setItem("cart", JSON.stringify(this.cart));
        window.location.href = "orders.html";
      });
    });
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
            <span class="js-delivery-date"> </span>
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${product.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${product.name}
              </div>

              <div class="product-price">
                $${(product.priceCents / 100).toFixed(2)}
                
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

              
        <div class="js-delivery-option delivery-option" data-delivery-option-id="${
          product.id
        }" data-testid="delivery-option-${product.id}">

          <input class="js-delivery-option-input delivery-option-input" checked="" name="${
            product.id
          }-delivery-option" type="radio" value="0" id="7" data-testid="delivery-option-input">

          <div>
            <div class="delivery-option-date">
${dayjs().add(7, "days").format("dddd, MMMM D")}               </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
      
        <div class="js-delivery-option delivery-option" data-delivery-option-id="${
          product.id
        }" data-testid="delivery-option-${product.id}">

          <input class="js-delivery-option-input delivery-option-input" name="${
            product.id
          }-delivery-option" type="radio" value="499" id="5" data-testid="delivery-option-input">

          <div>
            <div class="delivery-option-date">
${dayjs().add(5, "days").format("dddd, MMMM D")}               </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
      
        <div class="js-delivery-option delivery-option" data-delivery-option-id="${
          product.id
        }" data-testid="delivery-option-${product.id}">

          <input class="js-delivery-option-input delivery-option-input" name="${
            product.id
          }-delivery-option" type="radio" value="999" id="1" data-testid="delivery-option-input">

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
  updateDate(button) {
    if (button) {
      if (
        button
          .closest(".js-delivery-option")
          .querySelector(".js-delivery-option-input").value === "0"
      ) {
        this.deliveryDate = dayjs().add(7, "days").format("dddd, MMMM D");
      } else if (
        button
          .closest(".js-delivery-option")
          .querySelector(".js-delivery-option-input").value === "499"
      ) {
        this.deliveryDate = dayjs().add(5, "days").format("dddd, MMMM D");
      } else if (
        button
          .closest(".js-delivery-option")
          .querySelector(".js-delivery-option-input").value === "999"
      ) {
        this.deliveryDate = dayjs().add(1, "days").format("dddd, MMMM D");
      }
    }
  }
  addDeliveryDate() {
    document.querySelectorAll(".js-delivery-date").forEach((date) => {
      date.innerHTML = dayjs().add(7, "days").format("dddd, MMMM D");
    });
    document.querySelectorAll(".js-delivery-option").forEach((button) => {
      
      button.addEventListener("click", () => {
        this.shippingPriceCents = 0;
        this.updateDate(button);
        console.log(this.deliveryDate);
        if (!button) {
          return;
        }
        console.log(button.closest(".cart-item-container"));
        button
          .closest(".cart-item-container")
          .querySelector(".js-delivery-date").innerHTML = this.deliveryDate;

        if (
          button
            .closest(".js-delivery-option")
            .querySelector(".js-delivery-option-input").value === "0"
        ) {
          this.shippingPriceCents += 0;
        } else if (
          button
            .closest(".js-delivery-option")
            .querySelector(".js-delivery-option-input").value === "499"
        ) {
          this.shippingPriceCents += 499;
        } else if (
          button
            .closest(".js-delivery-option")
            .querySelector(".js-delivery-option-input").value === "999"
        ) {
          this.shippingPriceCents += 999;
        }
        this.totalShippingPrice += this.shippingPriceCents;
        console.log(this.totalShippingPrice);
      });
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
const shoppingCart = new ShoppingCart();
export default shoppingCart;
