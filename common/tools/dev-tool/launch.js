#!/usr/bin/env node

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const path = require("path");

// Shim to invoke true typescript source
require("ts-node").register({
  transpileOnly: true,
  project: path.join(__dirname, "tsconfig.json")
});
require("@azure/dev-tool/src/index.ts");

