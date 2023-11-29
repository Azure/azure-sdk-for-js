#!/usr/bin/env node

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { join } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = fileURLToPath(new URL(".", import.meta.url));

if (process.env.DEBUG) {
  console.info("Azure SDK for JS dev-tool: bootstrapping from", __dirname);
}

import "./register.js";

await import(join(__dirname, "src", "index.ts"));
