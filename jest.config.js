module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(scss|css)$': 'identity-obj-proxy', // Bỏ qua các file SCSS và CSS
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '<rootDir>/src/index.tsx',
    '<rootDir>/src/setupTests.ts'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', 
    '!src/**/*.d.ts',
    '!src/index.tsx', // Bỏ qua index.tsx trong độ phủ mã
    '!src/setupTests.ts' // Bỏ qua setupTests.ts trong độ phủ mã
  ],
  coverageDirectory: 'coverage',
};
