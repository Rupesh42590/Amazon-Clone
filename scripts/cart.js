import ShoppingCart from "./checkout.js";
const shoppingCart = new ShoppingCart();
class Checkout {
  cartBody() {
    let cartBody = `
  <div class="checkout-header">
    <div class="checkout-header-content">Checkout (<span class="items">0 items</span>)</div>
</div>
<main>
<div class="checkout-body">
    <div class="checkout-body-left">
        <p class="checkout-body-left-title">Review your order</p>


    </div>
    <section class="checkout-body-bottom">
        <div class="checkout-body-left-content">Your cart is empty.</div>
        <div class="empty-cart">
        <a href="index.html">
            <button class="checkout-body-left-button">Continue shopping</button>
        </a>

            <div class="js-payment-info">
                <div class="payment-summary-title">
                    Order Summary
                </div>

                <div class="payment-summary-row">
                    <div>Items (0):</div>
                    <div class="payment-summary-money" data-testid="product-cost">
                        $0.00
                    </div>
                </div>

                <div class="payment-summary-row">
                    <div>Shipping &amp; handling:</div>
                    <div class="payment-summary-money" data-testid="shipping-cost">
                        $0.00
                    </div>
                </div>

                <div class="payment-summary-row subtotal-row">
                    <div id="tax">Total before tax:</div>
                    <div class="payment-summary-money tax" data-testid="sub-total">
                        $0.00
                    </div>
                </div>

                <div class="payment-summary-row">
                    <div>Estimated tax (10%):</div>
                    <div class="payment-summary-money" data-testid="tax-cost">
                        $0.00
                    </div>
                </div>

                <div class="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div class="payment-summary-money" data-testid="total-cost">
                        $0.00
                    </div>
                </div>
                <div class="order-button no-items">
                <button class="place-order">Place your order</button>
                </div>
            </div>
        </div>
    </section>
</div>
</main>
    `;
    document.querySelector("body").innerHTML = cartBody;
  }
}
const cart = new Checkout();
cart.cartBody();
shoppingCart.updateCartMenu();
