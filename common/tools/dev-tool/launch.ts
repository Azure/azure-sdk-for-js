#!/usr/bin/env -S node --experimental-strip-types

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "dotenv/config";

if (process.env.DEBUG) {
  console.info("Azure SDK for JS dev-tool: bootstrapping from", import.meta.dirname);
}

await import("./src/index.ts");
