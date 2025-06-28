import shoppingCart from "./checkout.js";
import { products } from "./products.js";
class Checkout {
  updateHTML;
  updateOrder = "";
  cartIsEmpty;
  constructor() {
    this.updateHTML = shoppingCart.updateHTML;
    shoppingCart.cart.length === 0
      ? (this.cartIsEmpty = true)
      : (this.cartIsEmpty = false);
  }
  orderColor() {
    if (this.cartIsEmpty === false) {
      document.querySelector(".order-button").classList.remove("no-items");
      document.querySelector(".place-order").classList.add("hover-color");
    }
  }

  cartBody() {
    let cartBody = `
  <div class="checkout-header">
  <a class="checkout-header-link" href="index.html">
    <div class="checkout-header-content">Checkout (<span class="items">0 items</span>)</div>
    </a>
</div>
<div class="checkout-body">
    
        
        <div class="empty-cart">
        ${this.updateHTML}

            
        </div>
<div class="js-payment-info">
                <div class="payment-summary-title">
                    Order Summary
                </div>

                <div class="payment-summary-row">
                    <div>Items (0):</div>
                    <div class="payment-summary-money" data-testid="product-cost">
                        $${(shoppingCart.itemsPrice() / 100).toFixed(2)}
                    </div>
                </div>

                <div class="payment-summary-row">
                    <div>Shipping &amp; handling:</div>
                    <div class="payment-summary-money" data-testid="shipping-cost">
                                                $${shoppingCart.totalShippingPrice()}

                    </div>
                </div>

                <div class="payment-summary-row subtotal-row">
                    <div id="tax">Total before tax:</div>
                    <div class="payment-summary-money tax" data-testid="sub-total">
                        $${shoppingCart.totalPrice()}
                    </div>
                </div>

                <div class="payment-summary-row">
                    <div>Estimated tax (10%):</div>
                    <div class="payment-summary-money" data-testid="tax-cost">
                        $${shoppingCart.estimatedTax()}
                    </div>
                </div>

                <div class="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div class="payment-summary-money" data-testid="total-cost">
                        $${shoppingCart.orderTotal()}
                    </div>
                </div>
                <div class="order-button  no-items">
                <button class="place-order">Place your order</button>
                </div>
            </div>

    
</div>
    `;

    document.querySelector("body").innerHTML = cartBody;
   
  }

  delete() {
    document.querySelectorAll(".js-delete-quantity-link").forEach((button) => {
      button.addEventListener("click", () => {
        shoppingCart.cart = shoppingCart.cart.filter(
          (item) => item.productId !== button.dataset.cartItemId
        );
        shoppingCart.shippingPriceCents = shoppingCart.shippingPriceCents.filter(
          (item) => item.productId !== button.dataset.cartItemId
        );
        localStorage.setItem("cart", JSON.stringify(shoppingCart.cart));
        localStorage.setItem(
          "shippingPriceCents",
          JSON.stringify(shoppingCart.shippingPriceCents)
        );
        renderPage();
        shoppingCart.reducePrice();
      });
    });
  }
  updateQuantity() {
    document.querySelectorAll(".js-update-quantity-link").forEach((button) => {
      button.addEventListener("click", () => {
        button
          .closest(".js-cart-item")
          .querySelector(".js-new-quantity-input")
          .classList.remove("hidden");
        button
          .closest(".js-cart-item")
          .querySelector(".js-save-quantity-link")
          .classList.remove("hidden");
        button
          .closest(".js-cart-item")
          .querySelector(".js-update-quantity-link")
          .classList.add("hidden");
      });
    });
  }

  saveQuantity() {
    document.querySelectorAll(".js-save-quantity-link").forEach((button) => {
      button.addEventListener("click", () => {
        button
          .closest(".js-cart-item")
          .querySelector(".js-new-quantity-input")
          .classList.add("hidden");
        button
          .closest(".js-cart-item")
          .querySelector(".js-save-quantity-link")
          .classList.add("hidden");
        button
          .closest(".js-cart-item")
          .querySelector(".js-update-quantity-link")
          .classList.remove("hidden");
        const productId = button.closest(".js-cart-item").dataset.cartItemId;
        const newQuantity = parseInt(
          button
            .closest(".js-cart-item")
            .querySelector(".js-new-quantity-input").value
        );

        shoppingCart.cart = shoppingCart.cart.map((item) => {
          if (item.productId === productId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        localStorage.setItem("cart", JSON.stringify(shoppingCart.cart));

        renderPage();
        shoppingCart.itemsPrice();
        shoppingCart.placeOrder();
      });
    });
  }
}

function renderPage() {
  shoppingCart.updateCartBody();

  const cart = new Checkout();
  cart.cartBody();
  shoppingCart.updateCartMenu();
  shoppingCart.addDeliveryDate();
  cart.orderColor();
  shoppingCart.updateCartMenu();

  cart.delete();
  cart.updateQuantity();
  cart.saveQuantity();
}
document.addEventListener("cartUpdated", () => {
 renderPage();
 
});

renderPage();
shoppingCart.placeOrder();

