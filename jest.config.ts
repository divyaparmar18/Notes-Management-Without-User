/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node", // Ensure this is set to 'node' for backend testing
  setupFilesAfterEnv: ["<rootDir>/test/integration/setupTests.ts"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/?(*.)+(spec|test).ts"],
  coverageDirectory: "coverage",
};
