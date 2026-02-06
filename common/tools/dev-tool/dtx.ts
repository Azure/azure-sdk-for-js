#!/usr/bin/env -S node --experimental-strip-types

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This command is an alias for `dev-tool run vendored`
 */

import { spawn } from "node:child_process";
import { resolve } from "node:path";

const engine = process.argv0;

const args = [
  "--experimental-strip-types",
  resolve(import.meta.dirname, "launch.ts"),
  "run",
  "vendored",
  ...process.argv.slice(2),
];

const subProcess = spawn(engine, args, { stdio: "inherit" });

subProcess.on("exit", (code) => process.exit(code ?? 0));
subProcess.on("error", (error) => {
  console.error(error);
  process.exit(1);
});
