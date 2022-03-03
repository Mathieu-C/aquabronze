// eslint-disable-next-line no-undef
module.exports = {
	collectCoverage: true,
	collectCoverageFrom: [
		"<rootDir>/src/js/**/*.js",
	],
	coveragePathIgnorePatterns: [
		"<rootDir>/src/js/test/fixtures/",
	],
	setupFilesAfterEnv: ["./jest.setup.js"],
	testEnvironment: "jsdom",
};
