// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// This shim file simply loads ts-node and then requires the
// TypeScript file corresponding to the rollup base config

const { join } = require("path");

require("ts-node").register({
  transpileOnly: true,
  project: join(__dirname, "../tsconfig.json")
});

module.exports = require(join(__dirname, "../src/config/rollup.base.config.ts"));
