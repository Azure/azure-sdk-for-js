#!/usr/bin/env node

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "dotenv/config";
import { ensureCoreProcessBuilt } from "./src/bootstrapCoreProcess.ts";

if (process.env.DEBUG) {
  console.info("Azure SDK for JS dev-tool: bootstrapping from", import.meta.dirname);
}

await ensureCoreProcessBuilt();
await import("./src/index.ts");
