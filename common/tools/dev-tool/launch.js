#!/usr/bin/env node

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const path = require("path");

if (process.env.DEBUG) {
  console.info("Azure SDK for JS dev-tool: bootstrapping from", __dirname);
}

require("./register");

require(path.join(__dirname, "src", "index.ts"));
