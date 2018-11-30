module.exports = {
  extends: 'airbnb-base',

  env: {
    browser: true,
    mocha: true,
  },

  rules: {
    'arrow-parens': ['error', 'always'],
    'consistent-return': 'off',
    'func-names': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': ['error', {'devDependencies': true}],
    'max-len': ['error', 120],
    'no-console': 'off',
    'no-multi-spaces': 'off',
    'object-curly-spacing': ['error', 'never'],
    'quote-props': ['error', 'consistent'],
  },
};
