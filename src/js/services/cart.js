const cartService = (function() {
	let observers = [];

	let items = [];

	const proxyHandler = {	
		set(target, prop, value) {
      
			if (prop === "quantity" && value === 0) {
				if (promptRemove(target.id)) {
					remove(target.id);
				} else {
					Reflect.set(target, prop, 1);
				}
			} else {
				Reflect.set(target, prop, value);
			}

			notify();

			return true;
		},
	};

	function clear() {
		items = [];
	}

	function populate(elements) {
		items = elements.map((element) => new Proxy(element, proxyHandler));
		notify();
	}

	function getAll() {
		return [...items];
	}

	function get(id) {
		const item = items.find((item) => item.id === id);
		if (!item) throw new Error(`Couldn't find cart item with id ${id}`);
		return item;
	}

	function getTotalQuantity() {
		return items.reduce((total, product) => total + product.quantity, 0);
	}

	function getGrossPrice() {
		return items.reduce((total, product) => total + product.quantity * product.price, 0);
	}

	function modifyQuantity(id, modifier) {
		const item = get(id);
		item.quantity += modifier;
	}

	function remove(id) {
		items = items.filter((item) => item.id !== id);
	}

	function promptRemove(id) {
		const item = get(id);
		return confirm(`Remove product ${item.name} from the cart?`);
	}

	function subscribe(observer) {
		observers = [...observers, observer];
		return observers;
	}

	function notify() {
		observers.forEach((observer) => observer.notify());
	}
  
	return {
		clear,
		get,
		getAll,
		getGrossPrice,
		getTotalQuantity,
		modifyQuantity,
		populate,
		subscribe,
	};

})();

export default cartService;
