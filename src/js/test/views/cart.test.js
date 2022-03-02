import cartService from "../../services/cart";
import cartView from "../../views/cart";

describe("cart view", () => {
	describe("render", () => {
		it("shows products in the cart", () => {
			cartService.populate([{ id: "GOKU" }]);

			cartView.render();
			const domNode = document.querySelector("#product-GOKU");

			expect(domNode).not.toBeNull();
		});
	});
});
