import playwright from "eslint-plugin-playwright";
import tsParser from "@typescript-eslint/parser";
import tseslint from "typescript-eslint";

export default [
  ...tseslint.configs.recommended,
  {
    ignores: ["**/*.js"],
  },
  {
    ...playwright.configs["flat/recommended"],
    files: ["**/*.ts"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      "playwright/expect-expect": "off",
    },
  },
];
