#!/usr/bin/env node

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This command is an alias for `dev-tool run vendored`
 */

import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const engine = process.argv0;

const args = [resolve(__dirname, "launch.mjs"), "run", "vendored", ...process.argv.slice(2)];

const childProcess = await import("node:child_process");
const subProcess = childProcess.spawn(engine, args, { stdio: "inherit" });

subProcess.on("exit", (code) => process.exit(code));
subProcess.on("error", (error) => {
  console.error(error);
  process.exit(1);
});
