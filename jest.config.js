module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // (Optional) Configure testing environment setup
  moduleNameMapper: {
    '^.+\\.(css|scss)$': '<rootDir>/node_modules/identity-obj-proxy', // Mock CSS imports
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverage: true, // Optionally enable code coverage collection
  coverageReporters: ['json-summary', 'lcov'], // Optionally define coverage reporters
};
