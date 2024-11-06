// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import processors from "./processors";
import rules from "./rules";
import { name, version } from "../package.json";

import azsdkConfigs from "./configs/index";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

const plugin: Omit<FlatConfig.Plugin, "configs"> = {
  meta: {
    name,
    version,
  },
  processors,
  rules,
};

// assign configs here so we can reference `plugin`
const configs = azsdkConfigs(plugin);

export = {
  ...plugin,
  configs,
};
