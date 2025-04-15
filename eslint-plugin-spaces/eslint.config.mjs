import eyeSpacing from "eslint-plugin-spaces";
import tseslint from 'typescript-eslint'
import {defineConfig} from "eslint/config"

export default defineConfig([
  {
    // ignores: [`./dist/**/*`],
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      }
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "@eye": eyeSpacing,
    },
    rules: {
      "@eye/space-in-functions-parens": ["error", "always"],
      "@eye/space-in-calls": ["error", "always"],
      "@eye/space-in-constructors": ["error", "always"],
      "@eye/space-in-loops-and-ifs": ["error", "never"],
      "@eye/double-spaces-in-for": "error",
      "@eye/space-around-jsx-children": "error",
    },
  },
]);
