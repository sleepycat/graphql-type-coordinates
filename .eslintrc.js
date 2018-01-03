module.exports = {
  parser: "babel-eslint",
  extends: ["standard", "prettier", "plugin:import/recommended"],
  plugins: ["jest"],
  env: {
    "jest/globals": true,
  },
  rules: {
    "comma-dangle": ["error", "always-multiline"],
  },
}
