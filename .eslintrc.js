module.exports = {
  extends: 'airbnb-base',

  env: {
    browser: true,
    mocha: true,
  },

  rules: {
    'max-len': ['error', 120],
    'arrow-parens': ['error', 'always'],
    'consistent-return': 'off',
    'object-curly-spacing': ['error', 'never'],
    'no-console': 'off',
    'quote-props': ['error', 'consistent'],
    'import/extensions': 'off',
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
  },
};
