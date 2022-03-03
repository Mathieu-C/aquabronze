import cartService from "../services/cart";
import viewHelper from "./helper";

const cartView = (function() {
	function render() {
		const products = cartService.getAll();

		const productsRender = products.map((product) => `
			<tr class="product" id="product-${product.id}">
        <td>
          <figure class="product__details">
            <img class="product__image" alt="${product.name}" src="products/${product.id}.jpg" />
            <figcaption>
              <h3 class="product__name">${product.name}</h3>
              <p class="product__code">Product code ${product.id}</p>
            </figcaption>
          </figure>
        </td>
				<td class="product__quantity">
					<button class="product__quantity-selector js-qty-minus" data-productid="${product.id}">
            -
          </button>
					<input
						min="0"
						readonly
						step="1"
            class="product__quantity-input"
            data-productid="${product.id}"
            type="number"
            value="${product.quantity}"
          />
					<button class="product__quantity-selector js-qty-plus" data-productid="${product.id}">
            +
          </button>
				</td>
        <td class="product__price">${product.price} €</td>
				<td class="product__total">${product.quantity * product.price} €</td>
			</tr>
		`.replace(/\s+/g, " "));

		viewHelper.render("#js-cart-content", productsRender);
		registerEventListeners();
	}

	function registerEventListeners() {
		const qtyPlus = document.querySelectorAll(".js-qty-plus");
		const qtyMinus = document.querySelectorAll(".js-qty-minus");

		qtyPlus.forEach((element) => {
			element.addEventListener(
				"click",
				cartService.modifyQuantity.bind(this, element.dataset.productid, 1));
		});

		qtyMinus.forEach((element) => {
			element.addEventListener(
				"click",
				cartService.modifyQuantity.bind(this, element.dataset.productid, -1),
			);
		});
	}

	return {
		notify: render,
		render,
	};
})();

export default cartView;
