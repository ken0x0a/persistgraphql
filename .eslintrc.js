/**
 * [docs](@ken0x0a/eslint-config/docs/example.md)
 */
module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  root: true,

  parserOptions: {
    project: 'tsconfig.lint.json',
  },

  /**
   * NOTE: The **order is important**, to properly override rules by later one
   */
  extends: [
    '@ken0x0a/eslint-config/base',
    '@ken0x0a/eslint-config/tslint-rules',
    '@ken0x0a/eslint-config/import',
    '@ken0x0a/eslint-config/jest',
    /**
     * if you need to use `react` related configs like following,
     * you need to install optional dependency "@ken0x0a/eslint-config-react-deps" by
     * `yarn add -D "@ken0x0a/eslint-config-react-deps"`
     */
    // '@ken0x0a/eslint-config/react',
    // '@ken0x0a/eslint-config/react-native',
    // '@ken0x0a/eslint-config/expo', // extends "./react-native"

    /**
     * '@ken0x0a/eslint-config/typescript' must be always last, to override rules
     */
    '@ken0x0a/eslint-config/typescript',
  ],
  rules: {
    /**
     * specific
     */
    'import/no-extraneous-dependencies': [
      2,
      { devDependencies: true, optionalDependencies: false, peerDependencies: false },
    ],
    '@typescript-eslint/camelcase': [2, { properties: 'never', ignoreDestructuring: false }],
  },
  overrides: [
    // https://eslint.org/docs/user-guide/configuring#example-configuration
    {
      /**
       * for React & React Native
       */
      files: ['*.tsx', '{apps,modules/*/client}/**/*.ts'],
      excludedFiles: '*.test.ts',
      extends: [
        '@ken0x0a/eslint-config/react',
        // '@ken0x0a/eslint-config/react-native',
        '@ken0x0a/eslint-config/expo',
        /**
         * '@ken0x0a/eslint-config/typescript' must be always last, to override rules
         */
        '@ken0x0a/eslint-config/typescript',
      ],
      rules: {
        'react/destructuring-assignment': 0,
        'react-native/no-color-literals': 0,
        '@typescript-eslint/camelcase': 0,
      },
    },
    {
      // for JS files
      files: ['**/*.js'],
      parserOptions: {
        project: 'tsconfig.js.json',
      },
    },
    /**
     * Dev tools & scripts ( using `devDependencies`, & ... )
     */
    {
      files: ['**/webpack.config.ts', '**/webpack/**/*.ts', '**/scripts/**/*.ts'],
      rules: {
        'import/no-default-export': 0,
        'import/no-dynamic-require': 0,
        'import/no-extraneous-dependencies': [2, { devDependencies: true }],
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/no-var-requires': 0,
      },
    },
    /**
     * Temporary Exceptions
     */
    {
      files: ['some-path/**/*.ts'],
      rules: {
        '@typescript-eslint/camelcase': 0,
      },
    },
    {
      files: ['servers/{server1,server2}/*.ts'],
      rules: {
        'no-param-reassign': [2, { props: true, ignorePropertyModificationsFor: ['ctx', 'pv'] }],
        '@typescript-eslint/camelcase': [2, { properties: 'never', ignoreDestructuring: true }],
      },
    },
  ],
  globals: {},
}
