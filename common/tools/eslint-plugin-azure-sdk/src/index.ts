// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

import processors from "./processors/index.js";
import rules from "./rules/index.js";
import azsdkConfigs from "./configs/index.js";

const plugin: Omit<FlatConfig.Plugin, "configs"> = {
  meta: {
    name: "@azure/eslint-plugin-azure-sdk",
    version: "3.1.0",
  },
  processors,
  rules,
};

// assign configs here so we can reference `plugin`
const configs = azsdkConfigs(plugin);

export default {
  ...plugin,
  configs,
};
