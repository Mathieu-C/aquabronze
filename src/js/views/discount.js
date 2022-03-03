import discountService from "../services/discount";
import viewHelper from "./helper";

const discountView = (function() {
	function render() {
		const discounts = discountService.getActive();

		const discountsRender = discounts.map((discount) => `
      <li class="discounts__item">
        <span>${discount.label}</span>
        <span>-${discount.amount} €</span>
      </li>
    `);

		viewHelper.render("#js-cart-discounts", discountsRender);
	}

	return {
		notify: render,
		render,
	};
})();

export default discountView;
