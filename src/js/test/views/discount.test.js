import cartService from "../../services/cart";
import discountView from "../../views/discount";
import cartItems from "../fixtures/cartItems";

beforeEach(() => {
	cartService.clear();
});

describe("discount view", () => {
	describe("render", () => {
		it("doesn't render when there is no active discount", () => {
			const domTarget = document.querySelector("#js-cart-discounts");
			discountView.render();
			expect(domTarget.innerHTML).toBe("");
		});

		it("reflects the active discounts", () => {
			cartService.populate(cartItems);
			const domTarget = document.querySelector("#js-cart-discounts");
			discountView.render();
			expect(domTarget.innerHTML).toMatchSnapshot();
		});

		it("handles multiple active discounts", () => {
			cartService.populate(cartItems);
			cartService.modifyQuantity("NARU", 5);
			const domTarget = document.querySelector("#js-cart-discounts");
			discountView.render();
			expect(domTarget.innerHTML).toMatchSnapshot();
		});
	});
});
