module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    '^remark$': '<rootDir>/src/__mocks__/remark.js',
    '^remark-html$': '<rootDir>/src/__mocks__/remark-html.js'
  }
}