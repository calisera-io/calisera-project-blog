module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleNameMapper: {
    '^remark$': '<rootDir>/src/__mocks__/remark.ts',
    '^remark-html$': '<rootDir>/src/__mocks__/remark-html.ts'
  }
}