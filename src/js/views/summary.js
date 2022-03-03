import cartService from "../services/cart";
import summaryService from "../services/summary";

const summaryView = (function() {
	function render() {
		updateTotal();
		updateTotalCost();
	}

	function updateTotal() {
		const domTarget = document.querySelector("#js-cart-summary");
		domTarget.innerHTML = `
      <span>${cartService.getTotalQuantity()} Items</span>
      <span class="summary__count-gross">${cartService.getGrossPrice()} €</span>
    `;
	}

	function updateTotalCost() {
		const domTarget = document.querySelector("#js-cart-total");
		domTarget.innerHTML = `
      <span>Total cost</span>
      <span class="summary__total-net">${summaryService.getNetPrice()} €</span>
    `;
	}

	return {
		notify: render,
		render,
	};
})();

export default summaryView;
