// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as base from "./rollup.base.config";

const inputs = [];

if (!process.env.ONLY_BROWSER) {
  inputs.push(base.nodeConfig());
}

if (!process.env.ONLY_NODE) {
  inputs.push(base.browserConfig());
  inputs.push(base.browserConfig({ production: true }));
}

if (process.env.BROWSER_TEST) {
  inputs.push(base.browserConfig({ test: true }));
}

export default inputs;
