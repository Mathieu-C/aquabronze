import cartService from "./cart";
import discountService from "./discount";

const summaryService = (function() {
	function getNetPrice() {
		return cartService.getGrossPrice() - discountService.getTotalDiscountAmount();
	}

	return {
		getNetPrice,
	};
})();

export default summaryService;
