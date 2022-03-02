import cartService from "../../services/cart";
import discountService from "../../services/discount";


beforeEach(() => {
	cartService.clear();
});

describe("discount service", () => {

	describe("getActive", () => {
		it("returns an empty array when there is no appliable discount", () => {
			cartService.populate([{ id: "GOKU", quantity: 1 }]);
			expect(discountService.getActive()).toEqual([]);
		});

		it("throws an error if discount infos aren't found", () => {
			cartService.populate([{ discount: "invalidDiscount", id: "GOKU" }]);
			expect(() => discountService.getActive()).toThrow();
		});

		it("returns applied discounts", () => {
			cartService.populate([{ discount: "twoForOne", name: "Goku", price: 1, quantity: 2 }]);
			expect(discountService.getActive()).toEqual([
				{
					amount: 1,
				  label: "2x1 Goku offer",
				},
			]);
		});
	});

	describe("getTotalDiscountAmount", () => {
		it("calculates the discount amount", () => {
			cartService.populate([{ discount: "twoForOne", price: 10, quantity: 2 }]);
			expect(discountService.getTotalDiscountAmount()).toBe(10);
		});
	});
});
