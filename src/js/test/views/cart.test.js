import cartService from "../../services/cart";
import cartView from "../../views/cart";
import cartItems from "../fixtures/cartItems";

describe("cart view", () => {
	describe("render", () => {
		it("shows products in the cart", () => {
			cartService.populate(cartItems);
			cartView.render();

			const domNode = document.querySelector("#product-GOKU");

			setTimeout(() => {
				expect(domNode).not.toBeNull();
			}, 1000);
		});
	});
});
