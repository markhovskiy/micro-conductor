module.exports = {
  'extends': 'eslint:recommended',

  'env': {
    'browser': true,
    'es6': true,
    'mocha': true,
    'node': true,
  },

  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },

  'rules': {
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'always'],
  },
};
