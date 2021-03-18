module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    "mocha/globals": true,
  },
  extends: ["standard", "plugin:json/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "comma-dangle": "off",
    "space-before-function-paren": "off",
  },
};
