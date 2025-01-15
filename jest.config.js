// module.exports = {
//     transform: {
//         '^.+\\.[t|j]sx?$': 'babel-jest',
//     },
//     testEnvironment: 'jsdom',
// };

module.exports = {
    testEnvironment: "jsdom",
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: ['/node_modules/(?!(foo|bar)/)', '/bar/'],
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
};