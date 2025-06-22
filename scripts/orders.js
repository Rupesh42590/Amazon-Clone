import { products } from "./products.js";
import shoppingCart from  "./checkout.js";

class orders{
    
    updateHTML2="";
    constructor(){

        this.updateHTML2=localStorage.getItem("updateHTML2");
        if(this.updateHTML2===null){
            document.querySelector(".orders-container").innerHTML=`
            <div class="no-orders">
                <div class="no-orders-title">No orders yet</div>    
                <a href="index.html">
                    <button class="continue-shopping">Continue shopping</button>
                </a>
            </div>
            `;
        }else{
            document.querySelector(".orders-container").innerHTML=this.updateHTML2;
        }
    }
}
const order=new orders();
shoppingCart.buyAgain();

