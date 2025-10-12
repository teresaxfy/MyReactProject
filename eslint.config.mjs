// @ts-check

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint';
import { globalIgnores } from "eslint/config"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = tseslint.config(
  globalIgnores([".next"]),
  compat.extends("next/core-web-vitals", "next"),
  [
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ].map(config => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"],
  })),
  {
    ...stylistic.configs.customize({
      quotes: "double",
      semi: true,
      indent: 4,
    }),
    files: ["**/*.ts", "**/*.tsx"],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);

export default eslintConfig;