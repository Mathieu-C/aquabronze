import cartService from "../services/cart";

const discountService = (function() {

	const discounts = {
		bulk: {
			amount: ({ quantity }) => quantity * 1,
			isActive: ({ quantity }) => quantity > 2,
			label: ({ quantity, name }) => `x${quantity} ${name} offer`,
		},
		twoForOne: {
			amount: ({ price }) => price,
			isActive: ({ quantity }) => quantity > 1,
			label: ({ name }) => `2x1 ${name} offer`,
		},
	};

	function getActive() {
		const products = cartService.getAll();
		let appliedDiscounts = [];

		products.forEach((product) => {
			if (!product.discount) return;

			const discount = discounts[product.discount];

			if (!discount) {
				throw new Error(`Discount ${product.discount} details not found for ${product.name}.`);
			}

			if (!discount.isActive(product)) return;

			appliedDiscounts.push({
				amount: discount.amount(product),
				label: discount.label(product),
			});
		});

		return appliedDiscounts;
	}

	function getTotalDiscountAmount() {
		return getActive().reduce((sum, product) => sum + product.amount, 0);
	}

	return {
		getActive,
		getTotalDiscountAmount,
	};
})();

export default discountService;
