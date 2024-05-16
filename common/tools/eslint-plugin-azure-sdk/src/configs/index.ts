// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import eslint from "@eslint/js";
import typescriptEslint from "typescript-eslint";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import markdown from "eslint-plugin-markdown";

import eslintCustomized from "./eslint-customized";
import markdownCustomized from "./markdown-customized";
import azureSdkCustomized from "./azure-sdk-customized";

export default (plugin: FlatConfig.Plugin) =>
  typescriptEslint.config(
    {
      name: "azsdk-skip-generated",
      ignores: ["**/generated/**"],
    },
    eslint.configs.recommended,
    ...typescriptEslint.configs.recommended,
    typescriptEslint.configs.eslintRecommended,
    eslintConfigPrettier,
    {
      plugins: {
        "@azure/azure-sdk": plugin,
        markdown,
      },
    },
    // azure sdk customized
    eslintCustomized,
    ...markdownCustomized,
    ...azureSdkCustomized(typescriptEslint.parser),
  );
