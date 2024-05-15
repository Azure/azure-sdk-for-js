// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import processors from "./processors";
import rules from "./rules";
import { name, version } from "../package.json";

import customized from "./configs/index";

const plugin = {
  meta: {
    name,
    version,
  },
  configs: {},
  rules,
  processors,
};

// assign configs here so we can reference `plugin`
Object.assign(plugin.configs, {
  recommended: customized(plugin),
});

export default plugin;
