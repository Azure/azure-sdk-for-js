// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import markdown from "eslint-plugin-markdown";
import typescriptEslint from "typescript-eslint";

const markdownConfigs: FlatConfig.ConfigArray = [
  {
    plugins: {
      markdown,
      "@typescript-eslint": typescriptEslint.plugin,
    },
  },
  {
    files: ["**/*.md"],
    processor: "markdown/markdown",
  },
  {
    files: ["*.md/*.js"],
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
    },
  },
  {
    files: ["*.md/*.ts"],
    ...typescriptEslint.configs.disableTypeChecked,
  },
];

export default markdownConfigs;
