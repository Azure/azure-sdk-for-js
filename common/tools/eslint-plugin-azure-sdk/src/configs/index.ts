// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import eslint from "@eslint/js";
import typescriptEslint from "typescript-eslint";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import promise from "eslint-plugin-promise";

import eslintCustomized from "./eslint-customized.js";
import azureSdkCustomized from "./azure-sdk-customized.js";

function recommended(plugin: FlatConfig.Plugin, options: { typeChecked: boolean }) {
  return typescriptEslint.config(
    {
      ignores: ["**/generated/**", "**/*.config.{js,cjs,mjs,ts,cts,mts}", "**/test/perf/**"],
    },
    eslint.configs.recommended,
    ...(options.typeChecked
      ? typescriptEslint.configs.recommendedTypeChecked
      : typescriptEslint.configs.recommended),
    typescriptEslint.configs.eslintRecommended,
    eslintConfigPrettier,
    {
      plugins: {
        "@azure/azure-sdk": plugin,
        promise,
      },
    },

    promise.configs["flat/recommended"],

    // azure sdk customized
    eslintCustomized,
    ...azureSdkCustomized(typescriptEslint.parser),
  );
}

export default (plugin: FlatConfig.Plugin) => ({
  recommended: recommended(plugin, { typeChecked: false }),
  recommendedTypeChecked: recommended(plugin, { typeChecked: true }),
  internal: typescriptEslint.config(
    {
      ignores: ["**/generated/**", "**/*.config.{js,cjs,mjs,ts,cts,mts}", "**/test/perf/**"],
    },
    {
      languageOptions: {
        parser: typescriptEslint.parser,
        parserOptions: {
          projectService: true,
        },
      },
    },
    eslint.configs.recommended,
    ...typescriptEslint.configs.recommended,
    typescriptEslint.configs.eslintRecommended,
    eslintConfigPrettier,
    {
      plugins: {
        "@azure/azure-sdk": plugin,
      },
    },
    {
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "@azure/azure-sdk/github-source-headers": "warn",
        "@azure/azure-sdk/ts-apisurface-standardized-verbs": "off",
        "@azure/azure-sdk/ts-apisurface-supportcancellation": "off",
        "@azure/azure-sdk/ts-doc-internal": "off",
        "@azure/azure-sdk/ts-doc-internal-private-member": "off",
        "@azure/azure-sdk/ts-error-handling": "off",
        "@azure/azure-sdk/ts-modules-only-named": "off",
        "@azure/azure-sdk/ts-naming-drop-noun": "off",
        "@azure/azure-sdk/ts-naming-options": "off",
        "@azure/azure-sdk/ts-naming-subclients": "off",
        "@azure/azure-sdk/ts-no-const-enums": "off",
        "@azure/azure-sdk/ts-no-window": "warn",
        "@azure/azure-sdk/ts-pagination-list": "off",
        "@azure/azure-sdk/ts-use-interface-parameters": "off",
        "@azure/azure-sdk/ts-use-promises": "warn",
        "@azure/azure-sdk/ts-versioning-semver": "off",
      },
    },
  ),
});
