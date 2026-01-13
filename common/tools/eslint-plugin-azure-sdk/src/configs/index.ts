// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import typescriptEslint from "typescript-eslint";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import promise from "eslint-plugin-promise";

import eslintCustomized from "./eslint-customized.js";
import azureSdkCustomized from "./azure-sdk-customized.js";

// Type assertion helper to work around type incompatibilities between
// typescript-eslint's FlatConfig types and ESLint core's defineConfig types
// See: https://github.com/typescript-eslint/typescript-eslint/issues/10899
/**
 * Wraps a configuration object to be used as a config argument.
 *
 * @typeParam T - The type of the configuration object
 * @param config - The configuration object to wrap
 * @returns The configuration cast as `never`
 *
 * @remarks
 * The cast to `never` is used as a workaround for type incompatibilities between
 * different versions of ESLint config types or between flat config and legacy config formats.
 * Since `never` is the bottom type in TypeScript (assignable to any type), casting to `never`
 * effectively bypasses the type checker, allowing the config to be passed to functions
 * that may expect slightly different type signatures without causing compilation errors.
 */
function asConfigArg<T>(config: T) {
  return config as never;
}

function recommended(plugin: FlatConfig.Plugin, options: { typeChecked: boolean }) {
  return defineConfig(
    {
      ignores: ["**/generated/**", "**/*.config.{js,cjs,mjs,ts,cts,mts}"],
    },
    eslint.configs.recommended,
    ...(options.typeChecked
      ? typescriptEslint.configs.recommendedTypeChecked
      : typescriptEslint.configs.recommended),
    typescriptEslint.configs.eslintRecommended,
    asConfigArg(eslintConfigPrettier),
    {
      plugins: {
        "@azure/azure-sdk": asConfigArg(plugin),
        promise: asConfigArg(promise),
      },
    },

    asConfigArg(promise.configs["flat/recommended"]),

    // azure sdk customized
    eslintCustomized,
    ...azureSdkCustomized(typescriptEslint.parser).map(asConfigArg),
  );
}

export default (plugin: FlatConfig.Plugin) => ({
  recommended: recommended(plugin, { typeChecked: false }),
  recommendedTypeChecked: recommended(plugin, { typeChecked: true }),
  internal: defineConfig(
    {
      ignores: ["**/generated/**", "**/*.config.{js,cjs,mjs,ts,cts,mts}"],
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
    asConfigArg(eslintConfigPrettier),
    {
      plugins: {
        "@azure/azure-sdk": asConfigArg(plugin),
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
