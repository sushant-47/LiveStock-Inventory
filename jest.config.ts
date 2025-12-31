export default {
    displayName: 'catalog',
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    coverageDirectory: './coverage/catalog',
    // resolve tsconfig paths imports.
    moduleNameMapper: {
        '@lib/(.*)': '<rootDir>/src/libs/$1/index.ts',
    },
    // testMatch: [
    //     '<rootDir>/src/**/__tests__/**/*.[jt]s?(x)',
    //     '<rootDir>/src/**/*(*.)@(spec|test).[jt]s?(x)',
    // ],
};
