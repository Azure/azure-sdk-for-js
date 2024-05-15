// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import markdown from "eslint-plugin-markdown";
import typescriptEslint from "typescript-eslint";

const markdownConfigs: FlatConfig.ConfigArray = [
    {
    files: ["**/*.md"],
    processor: "markdown/markdown",
  },
  {
    plugins: {
      markdown,
      "@typescript-eslint": typescriptEslint.plugin,
    },
  },
  {
    name: "markdown-azsdk-customized",
    files: ["*.md/*.{js,javascript}"],
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
    files: ["*.md/*.{ts,typescript}"],
    ...typescriptEslint.configs.disableTypeChecked,
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    }
  },
];

export default markdownConfigs;
