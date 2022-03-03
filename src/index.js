import cartService from "./js/services/cart";

import cartView from "./js/views/cart";
import discountView from "./js/views/discount";
import summaryView from "./js/views/summary";

// Test import of styles
import "./styles/index.scss";

const products = [
	{
		discount: "twoForOne",
		id: "GOKU",
		name: "Goku POP",
		price: 5,
		quantity: 2,
	},
	{
		discount: "bulk",
		id: "NARU",
		name: "Naruto POP",
		price: 20,
		quantity: 1,
	},
	{
		id: "LUF",
		name: "Luffy POP",
		price: 7.5,
		quantity: 1,
	},
];

cartService.subscribe(cartView);
cartService.subscribe(discountView);
cartService.subscribe(summaryView);

cartService.populate(products);
