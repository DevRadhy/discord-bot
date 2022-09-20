module.exports = {
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "indent": ["error", 2],
    "semi": ["error", "always"],
    "arrow-parens": ["error", "always"],
    "arrow-spacing": "error",
    "no-duplicate-imports": "error",
    "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "varsIgnorePattern": "^_" }],
  }
};
