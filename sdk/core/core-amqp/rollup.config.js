// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as base from "./rollup.base.config";

const inputs = [];

if (!process.env.ONLY_BROWSER) {
  inputs.push(base.nodeConfig());
  // Node tests are run via ts-node so don't bundle tests
}

if (!process.env.ONLY_NODE) {
  inputs.push(base.browserConfig(true));
}

export default inputs;
