// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as base from "./rollup.base.config";

const inputs = [];

if (!process.env.ONLY_BROWSER) {
  inputs.push(base.nodeConfig({ test: true }));
}

if (!process.env.ONLY_NODE) {
  inputs.push(base.browserConfig({ test: true }));
}

export default inputs;
