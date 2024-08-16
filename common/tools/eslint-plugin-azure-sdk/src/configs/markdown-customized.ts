// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import typescriptEslint from "typescript-eslint";

const markdownConfigs: FlatConfig.ConfigArray = [
  {
    files: ["**/*.md"],
    processor: "markdown/markdown",
  },
  {
    name: "markdown-js-azsdk-customized",
    files: ["*.md/*.js", "*/*/*.md/*.js"],
    languageOptions: {
      parserOptions: {
        project: true,
        programs: null,
      },
    },
    ...typescriptEslint.configs.disableTypeChecked,
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-console": "off",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["*"],
              message: "Please use require instead of import.",
            },
          ],
        },
      ],
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    name: "markdown-ts-azsdk-customized",
    files: ["*.md/*.ts", "*/*/*.md/*.ts"],
    languageOptions: {
      parserOptions: {
        project: true,
        programs: null,
      },
    },
    ...typescriptEslint.configs.disableTypeChecked,
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];

export default markdownConfigs;
