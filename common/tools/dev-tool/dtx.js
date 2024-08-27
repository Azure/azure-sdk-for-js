#!/usr/bin/env node

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This command is an alias for `dev-tool run vendored`
 */

const path = require("path");

const engine = process.argv0;

const args = [path.resolve(__dirname, "launch.js"), "run", "vendored", ...process.argv.slice(2)];

const subProcess = require("child_process").spawn(engine, args, { stdio: "inherit" });

subProcess.on("exit", (code) => process.exit(code));
subProcess.on("error", (error) => {
  console.error(error);
  process.exit(1);
});
