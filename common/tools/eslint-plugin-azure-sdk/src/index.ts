// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { globalIgnores } from "eslint/config";
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
    globalIgnores(["**/test/snippets.spec.ts", "**/test/stress"]),
  ];
}

/**
 * Convenience helper mirroring {@link config}, but based on the
 * **non-type-checked** `recommendedStrict` preset. Type-aware rules from
 * `recommendedStrictTypeChecked` are intentionally not included — spread
 * `configs.recommendedStrictTypeChecked` directly if you need those.
 */
function configStrict(customConfigs?: FlatConfig.ConfigArray) {
  return [
    ...configs.recommendedStrict,
    ...(customConfigs ?? []),
    globalIgnores(["**/test/snippets.spec.ts", "**/test/stress"]),
  ];
}

export default {
  ...plugin,
  configs,
  config,
  configStrict,
};
