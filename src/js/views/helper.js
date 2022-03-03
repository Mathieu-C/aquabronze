const viewHelper = {
	render(target, content) {
		const domElement = document.querySelector(target);

		if (!domElement) {
			throw new Error(`Target ${target} is not a valid target`);
		}

		domElement.innerHTML = Array.isArray(content) ? content.join("") : content;
	},
};

export default viewHelper;
