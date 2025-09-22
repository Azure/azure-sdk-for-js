// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import processors from "./processors/index.js";
import rules from "./rules/index.js";
import * as constants from "./utils/constants.js";
import azsdkConfigs from "./configs/index.js";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

const plugin: Omit<FlatConfig.Plugin, "configs"> = {
  meta: {
    name: constants.SDK_NAME,
    version: constants.SDK_VERSION,
  },
  processors,
  rules,
};

// assign configs here so we can reference `plugin`
const configs = azsdkConfigs(plugin);

function config(customConfigs?: FlatConfig.ConfigArray) {
  return [
    ...configs.recommended,
    ...(customConfigs ?? []),
    {
      ignores: ["**/test/snippets.spec.ts", "**/test/stress", "**/test/perf"],
    },
  ];
}

export default {
  ...plugin,
  configs,
  config,
};
