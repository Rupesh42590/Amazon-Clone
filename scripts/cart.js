
class Checkout {
  cartBody() {
    let cartBody = `
   <div class="checkout-header">
        <span class="checkout-header-content">Checkout (<span class="items"> items</span>)</span>
    </div>
    <div class="checkout-body">
        <div class="checkout-body-left">
            <p class="checkout-body-left-title">Review your order</p>
            <div class="checkout-body-left-content">Your cart is empty.</div>
            <a href="index.html"><button class="checkout-body-left-button">Continue shopping</button></a>

        </div>
        <div class="checkout-body-right"></div>
    </div>
    `;
    document.querySelector("body").innerHTML = cartBody;
  }
}
const cart = new Checkout();
cart.cartBody();
