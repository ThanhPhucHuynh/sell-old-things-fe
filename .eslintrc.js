module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'airbnb/hooks',
  ],
  plugins: ['prettier', 'import'],
  rules: {
    'prettier/prettier': ['error'],
    'import/no-unresolved': 'error', // turn on errors for missing imports
    'react/jsx-filename-extension': [0, { extensions: ['.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': [
      0,
      { html: 'ignore', custom: 'ignore', explicitSpread: 'ignore' },
    ],
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 2,
    'import/order': [
      2,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
    'import/newline-after-import': 1,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.tsx', '**/*.spec.js'],
      },
    ],
    'import/extensions': [
      'error',
      'always',
      {
        pattern: {
          '': 'never',
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      },
    ],
  },
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.eslint.json',
      },
    },
  },
};
