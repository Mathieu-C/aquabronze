import cartService from "../../services/cart";
import summaryView from "../../views/summary";
import cartItems from "../fixtures/cartItems";

beforeEach(() => {
	cartService.clear();
});

describe("summary view", () => {
	describe("render", () => {
		it("renders the summary", () => {
			const domTarget = document.querySelector("#js-cart-summary");
			summaryView.render();
			expect(domTarget.innerHTML).toMatchSnapshot();
		});

		it("reflects cart updates correctly in the summary", () => {
			cartService.populate(cartItems);
			const domTarget = document.querySelector("#js-cart-summary");
			summaryView.render();
			expect(domTarget.innerHTML).toMatchSnapshot();
		});

		it("renders the cart total", () => {
			const domTarget = document.querySelector("#js-cart-total");
			summaryView.render();
			expect(domTarget.innerHTML).toMatchSnapshot();
		});

		it("reflects cart updates correctly in the cart total", () => {
			cartService.populate(cartItems);
			const domTarget = document.querySelector("#js-cart-total");
			summaryView.render();
			expect(domTarget.innerHTML).toMatchSnapshot();
		});
	});
});
