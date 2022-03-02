import cartService from "../../services/cart";
import summaryService from "../../services/summary";

describe("summary service", () => {
	describe("getNetPrice", () => {
		it("returns the net price", () => {
			cartService.populate([{ discount: "twoForOne", id: "GOKU", price: 10, quantity: 2 }]);
			expect(summaryService.getNetPrice()).toBe(10);
		});

	});
});
