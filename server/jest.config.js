// // eslint-disable-next-line no-undef
// module.exports = {
//   clearMocks: true,
//   preset: "ts-jest",
//   testEnvironment: "node",
//   modulePathIgnorePatterns: ["<rootDir>/dist/"],
//   setupFiles: ["dotenv/config"],
// };

// eslint-disable-next-line no-undef
module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  setupFiles: ["<rootDir>/jest.setup.js"], // Load setup file for .env.test
};
