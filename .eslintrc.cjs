module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    // 'comma-dangle': ['warn', 'always-multiline'],
    // 'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 0 }],
    // 'no-trailing-spaces': 'warn',
    // 'semi': ['error', 'never'],
    // 'quotes': ['error', 'single'],
    'react-refresh/only-export-components': 'warn',
    'no-undef': ['warn'],
    'no-unused-vars': ['warn'],
    // 'indent': [
    //   'warn',
    //   2,
    //   {
    //     SwitchCase: 0,
    //     FunctionDeclaration: {
    //       body: 1,
    //       parameters: 2,
    //     },
    //   },
    // ],
  },
}
