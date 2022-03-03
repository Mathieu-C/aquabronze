import cartService from "../../services/cart";
import cartItems from "../fixtures/cartItems";

beforeEach(() => {
	cartService.clear();
});

describe("cart service", () => {

	describe("getAll", () => {
		it("returns an empty array when cart is empty", () => {
			expect(cartService.getAll()).toEqual([]);
		});

		it("returns all items", () => {
			cartService.populate(cartItems);
			expect(cartService.getAll()).toEqual([...cartItems]);
		});
	});

	describe("clear", () => {
		it("clears items array", () => {
			cartService.populate([{ id: "GOKU", name: "Goku" }]);
			cartService.clear();
			expect(cartService.getAll()).toEqual([]);
		});
	});

	describe("populate", () => {
		it("populates the service items", () => {
			const elements = [{ id: "GOKU", name: "Goku" }];
			cartService.populate(elements);
			expect(cartService.getAll()).toEqual([{ id: "GOKU", name: "Goku" }]);
		});

		it("creates proxies of products", () => {
			const elements = [{ id: "GOKU", name: "Goku" }];
			cartService.populate(elements);

			const element = cartService.get("GOKU");
			expect(element._isProxy).toBe(true);
		});
	});

	describe("get", () => {
		it("throws an error if no item is found", () => {
			expect(() => cartService.get("invalidId")).toThrow();
		});

		it("returns an item by id", () => {
			cartService.populate([{ id: "GOKU", name: "Goku" }]);
			expect(cartService.get("GOKU")).toEqual({ id: "GOKU", name: "Goku" });
		});
	});

	describe("getTotalQuantity", () => {
		it("returns the total quantity", () => {
			cartService.populate([{ quantity: 40 }, { quantity: 2 }]);
			expect(cartService.getTotalQuantity()).toEqual(42);
		});
	});

	describe("getGrossPrice", () => {
		it("returns the gross price", () => {
			cartService.populate([{ price: 2, quantity: 5 }, { price: 10, quantity: 10 }]);
			expect(cartService.getGrossPrice()).toEqual(110);
		});
	});

	describe("modifyQuantity", () => {
		it("adds one to quantity", () => {
			cartService.populate([{ id: "GOKU", quantity: 1 }]);
			cartService.modifyQuantity("GOKU", 1);
			expect(cartService.get("GOKU").quantity).toEqual(2);
		});

		it("substracts one to quantity", () => {
			cartService.populate([{ id: "GOKU", quantity: 2 }]);
			cartService.modifyQuantity("GOKU", -1);
			expect(cartService.get("GOKU").quantity).toEqual(1);
		});

		it("notifies observers", () => {
			const observer = { notify: jest.fn() };
			cartService.subscribe(observer);

			expect(observer.notify).not.toHaveBeenCalled();

			cartService.populate([{ id: "GOKU", quantity: 2 }]);
			cartService.modifyQuantity("GOKU", 1);

			expect(observer.notify).toHaveBeenCalled();
		});
	});

	describe("remove", () => {
		it("removes an item", () => {
			// eslint-disable-next-line no-undef
			global.confirm = jest.fn(() => true);

			cartService.populate([{ id: "NARU", quantity: 1 }]);
			cartService.modifyQuantity("NARU", -1);

			expect(cartService.getAll()).toEqual([]);
		});

		it("puts the item back to quantity 1 if prompt is cancelled", () => {
			// eslint-disable-next-line no-undef
			global.confirm = jest.fn(() => false);

			cartService.populate([{ id: "NARU", quantity: 1 }]);
			cartService.modifyQuantity("NARU", -1);

			expect(cartService.getAll()).toEqual([{ id: "NARU", quantity: 1 }]);
		});
	});
});
