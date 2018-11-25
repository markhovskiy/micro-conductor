module.exports = {
  extends: 'airbnb-base',

  env: {
    browser: true,
    mocha: true,
  },

  rules: {
    'arrow-parens': ['error', 'always'],
    'consistent-return': 'off',
    'object-curly-spacing': ['error', 'never'],
    'no-console': 'off',
    'quote-props': ['error', 'consistent'],
    'import/extensions': 'off',
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
  },
};
