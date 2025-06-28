import { products } from "./products.js";
import shoppingCart from "./checkout.js";
class RenderProducts {
  renderProducts(products) {
    products.forEach((product) => {
      let productHTML = `
        <div class="product-container" data-product-id="${product.id}">
            <div class="img">
              <img
                src="${product.image}"
                alt="${product.name}"
                width="205.289px"
                height="147.938px"
              />
            </div>
            <p>${product.name}</p>
            <div class="ratings-container">
              <img
                src="ratings/rating-${product.rating.stars}.png"
                alt="rating-${product.rating.stars}"
                width="100"
                height="19.789"
              />
              <span class="ratings"> ${product.rating.count} </span>
            </div>
            <span class="price"> $${(
              product.priceCents / 100
            ).toFixed(2)} </span>
            <select class="custom-select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
            </select>
            <div class="added hidden">
              <img
                class="checkmark"
                src="images/checkmark.png"
                alt="checkmark"
                height="20px"
                width="20"
              />
              <div class="noted">Added</div>
            </div>
    
            <div class="add-cart">
              <button class="add-cart-button ">Add to Cart</button>
            </div>
        </div>
        `;

      document.querySelector(".main").innerHTML += productHTML;
      shoppingCart.initializeCartFunctionality();
    });
  }
  clearHTML() {
    document.querySelector(".main").innerHTML = "";
  }
}
const renderProducts = new RenderProducts();
renderProducts.renderProducts(products);

class SearchBar {
  searchInput = "";
  constructor() {
    document.querySelector(".input-form").addEventListener("submit", (e) => {
      e.preventDefault();
      this.searchInput = document.querySelector(".input").value;
      this.search();
    });
  }
  search() {
    renderProducts.clearHTML();
    renderProducts.renderProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(this.searchInput.toLowerCase())
      )
    );
  }
}
const searchBar = new SearchBar();
shoppingCart.showMenu();
