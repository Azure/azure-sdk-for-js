// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Linting rules for the JavaScript/TypeScript Azure SDK
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
import tsEslint from "typescript-eslint";

import { baseConfigs } from "./configs/azure-sdk-base";
import processors from "./processors";
import rules from "./rules";

const plugin = {
  meta: {
    name: "@azure/eslint-plugin-azure-sdk",
    version: "3.0.0",
  },
  configs: {},
  rules,
  processors,
};

const configs = tsEslint.config(...tsEslint.configs.recommendedTypeChecked, {
  plugins: {
    "@azure/azure-sdk": plugin,
  },
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: process.cwd(),
    },
  },
  ...baseConfigs,
});

// assign configs here so we can reference `plugin`
Object.assign(plugin.configs, {
  baseConfigs: configs,
});

export default plugin;
