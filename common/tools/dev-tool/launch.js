#!/usr/bin/env node

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const path = require("path");

if (process.env.DEBUG) {
  console.info("Azure SDK for JS dev-tool: bootstrapping from", __dirname);
}

// Shim to invoke true typescript source
require("ts-node").register({
  transpileOnly: true,
  project: path.join(__dirname, "tsconfig.json")
});
require(path.join(__dirname, "src", "index.ts"));
