module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@ecommerce/types(.*)$': '<rootDir>/../../packages/types/src$1',
    '^@ecommerce/shared(.*)$': '<rootDir>/../../packages/shared/src$1',
    '^@ecommerce/ui(.*)$': '<rootDir>/../../packages/ui/src$1',
  },
};
