import { products } from "./products.js";
import shoppingCart from  "./checkout.js";

class orders{
    
    updateHTML2="";
    constructor(){

        this.updateHTML2=localStorage.getItem("updateHTML2");
        document.querySelector(".orders-container").innerHTML=this.updateHTML2;
    }
}
const order=new orders();
shoppingCart.buyAgain();
if(shoppingCart.orderplaced===true){
    document.querySelector(".empty-cart").innerHTML=`
    <div class="checkout-body-left-no-items">
      <div class="checkout-body-left-content">
         Your cart is empty.
        </div>
      <a href="index.html">
            <button class="checkout-body-left-button">Continue shopping</button>
        </a>
        </div>
    `;
}
shoppingCart.orderplaced=false;