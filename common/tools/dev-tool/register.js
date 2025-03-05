// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file loads our monkey patch for module resolution in samples and
 * tests. We use this to make sure that TS/ES loading is supported and that
 * path-mapped imports work without rewriting them.
 *
 * As a forewarning to anyone who comes to this module and thinks: "Why can't
 * we rewrite this in TypeScript," keep in mind that this module is used to
 * bootstrap loading of typescript code at runtime within dev-tool. Rewriting
 * this module in TypeScript is likely possible, but challenging. In plain
 * old JavaScript, it is simple enough.
 */

const { existsSync } = require("node:fs");
const path = require("node:path");
const cwd = process.cwd();

// This is the calling module, which will be the node repl context.
const main = require.main;

// We need to know which package name to monkey patch
const { name: hostPackageName } = main.require("./package.json");

// If we're bootstrapping a dev-tool command, we need to patch the package from
// CWD instead.  This will still end up being dev-tool if we end up in a
// self-hosting situation where dev-tool calls itself from its own scripts.
const packageJsonPath = path.join(cwd, "package.json");
const packageNameToPatch =
  hostPackageName === "@azure/dev-tool"
    ? existsSync(packageJsonPath)
      ? require(packageJsonPath).name
      : hostPackageName
    : hostPackageName;

if (process.env.DEBUG) {
  console.info(
    "[dev-tool/register] patching module loader from:",
    __dirname,
    "; package:",
    packageNameToPatch,
  );
}

require("dotenv").config();

let tsconfigPath;
if (existsSync("../../../tsconfig.json")) {
  tsconfigPath = "../../../tsconfig.json";
} else {
  console.info(
    "[dev-tool/register] unable to locate tsconfig.json in repo root. This is expected in min/max tests.",
  );
}

require("tsx/esm/api").register({ tsconfig: tsconfigPath });
require("tsx/cjs/api").register({ tsconfig: tsconfigPath });
