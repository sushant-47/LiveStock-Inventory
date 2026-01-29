export default {
    displayName: 'catalog',
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    coverageDirectory: './coverage/catalog',
    // resolve tsconfig paths imports.
    moduleNameMapper: {
        // '@lib/(.*)': '<rootDir>/src/libs/$1/index.ts',
        "@lib/accordion": ["<rootDir>/src/libs/accordion/index.ts"],
        "@lib/form": ["<rootDir>/src/libs/form/index.ts"],
        "@lib/table": ["<rootDir>/src/libs/table/index.ts"],
        "@lib/types": ["<rootDir>/src/libs/types/index.ts"],
        "@lib/utils": ["<rootDir>/src/libs/utils/index.ts"],
    },
    testMatch: [
        // '<rootDir>/src/**/__tests__/**/*.[jt]s?(x)',
        '<rootDir>/src/**/*.(spec|test).[jt]s?(x)?',
        // '<rootDir>/src/**/accordion.(spec|test).[jt]s?(x)?',
    ],
};
