// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintCustomized from "./eslint-customized";
import typescriptEslintCustomized from "./typescript-eslint-customized";
import markdownCustomized from "./markdown-customized";
import azureSdkCustomized from "./azure-sdk-customized";

export default (plugin: FlatConfig.Plugin) =>
  tsEslint.config(
    {
      name: "azsdk-skip-generated",
      ignores: ["**/generated/**"],
    },
    eslint.configs.recommended,
    ...tsEslint.configs.recommended,
    tsEslint.configs.eslintRecommended,
    eslintCustomized,
    typescriptEslintCustomized,
    eslintConfigPrettier,
    ...azureSdkCustomized(plugin, tsEslint.parser),
    ...markdownCustomized,
  );
