module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': 'off',
    'no-return-assign': 'off',
    'no-unused-vars': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'react/self-closing-comp': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'import/prefer-default-export': 'off',
    'no-await-in-loop': 'off',
    'no-constant-condition': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
  },
};
