import viewHelper from "../../views/helper";

describe("view helper", () => {
	describe("render", () => {
		it("renders the element to the target", () => {
			const content = "<h4>Element to render</h4>";
			viewHelper.render("#render-target", content);

			const domNode = document.querySelector("#render-target");
			expect(domNode.innerHTML).toBe(content);
		});

		it("renders element from array to the target", () => {
			const content = ["<p>element</p>", "<p>element 2</p>"];
			viewHelper.render("#render-target", content);

			const domNode = document.querySelector("#render-target");
			expect(domNode.innerHTML).toBe("<p>element</p><p>element 2</p>");
		});

		it("throws when the target is not found", () => {
			expect(() => viewHelper.render("#invalid-target", "content")).toThrow();
		});
	});
});
