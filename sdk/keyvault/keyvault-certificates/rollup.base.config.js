// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import nodeResolve from "@rollup/plugin-node-resolve";
import multiEntry from "@rollup/plugin-multi-entry";
import cjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import sourcemaps from "rollup-plugin-sourcemaps";
import shim from "rollup-plugin-shim";
import json from "@rollup/plugin-json";

/**
 * @type {import('rollup').RollupFileOptions}
 */

const pkg = require("./package.json");
const version = pkg.version;
const banner = [
  "/*!",
  " * Copyright (c) Microsoft and contributors. All rights reserved.",
  " * Licensed under the MIT License. See License.txt in the project root for",
  " * license information.",
  " * ",
  ` * Azure KeyVault Certificates SDK for JavaScript - ${version}`,
  " */"
].join("\n");

const depNames = Object.keys(pkg.dependencies);
const production = process.env.NODE_ENV === "production";

export function nodeConfig(test = false) {
  const externalNodeBuiltins = ["crypto", "fs", "os", "url", "assert"];
  const additionalExternals = ["keytar"];
  const baseConfig = {
    input: "dist-esm/keyvault-certificates/src/index.js",
    external: depNames.concat(externalNodeBuiltins, additionalExternals),
    output: {
      file: "dist/index.js",
      format: "cjs",
      name: "azurekeyvaultcertificates",
      sourcemap: true,
      banner: banner
    },
    plugins: [
      sourcemaps(),
      replace({
        delimiters: ["", ""],
        // replace dynamic checks with if (true) since this is for node only.
        // Allows rollup's dead code elimination to be more aggressive.
        "if (isNode)": "if (true)"
      }),
      nodeResolve({ preferBuiltins: true }),
      cjs()
    ]
  };

  if (test) {
    // entry point is every test file
    baseConfig.input = ["dist-esm/**/*.spec.js"];
    baseConfig.plugins.unshift(
      multiEntry({ exports: false }),
      json() // This allows us to import/require the package.json file, to get the version and test it against the user agent.
    );

    // different output file
    baseConfig.output.file = "dist-test/index.node.js";

    baseConfig.external.push("assert", "fs", "os", "path");

    baseConfig.context = "null";

    // Disable tree-shaking of test code.  In rollup-plugin-node-resolve@5.0.0, rollup started respecting
    // the "sideEffects" field in package.json.  Since our package.json sets "sideEffects=false", this also
    // applies to test code, which causes all tests to be removed by tree-shaking.
    baseConfig.treeshake = false;
  } else if (production) {
    baseConfig.plugins.push(terser());
  }

  return baseConfig;
}

export function browserConfig(test = false) {
  const baseConfig = {
    input: "dist-esm/keyvault-certificates/src/index.js",
    output: {
      file: "dist-browser/azure-keyvault-certificates.js",
      banner: banner,
      format: "umd",
      name: "azurekeyvaultcertificates",
      globals: {
        "@azure/core-http": "Azure.Core.HTTP",
        "@azure/core-arm": "Azure.Core.ARM",
        "@azure/keyvault-keys": "Azure.KeyVault.Keys",
        "@azure/keyvault-secrets": "Azure.KeyVault.Secrets"
      },
      sourcemap: true
    },
    preserveSymlinks: false,
    plugins: [
      sourcemaps(),
      replace({
        delimiters: ["", ""],
        // replace dynamic checks with if (false) since this is for
        // browser only. Rollup's dead code elimination will remove
        // any code guarded by if (isNode) { ... }
        "if (isNode)": "if (false)"
      }),
      // os is not used by the browser bundle, so just shim it
      shim({
        dotenv: `export function config() { }`,
        os: `
          export const type = 1;
          export const release = 1;
        `
      }),
      nodeResolve({
        mainFields: ["module", "browser"],
        preferBuiltins: false
      }),
      cjs({
        namedExports: {
          assert: ["ok", "equal", "strictEqual", "deepEqual"],
          "@opentelemetry/api": ["CanonicalCode", "SpanKind", "TraceFlags"]
        }
      })
    ]
  };

  baseConfig.external = ["fs", "fs-extra", "child_process", "path", "crypto", "constants"];
  if (test) {
    baseConfig.external.push("os");
    baseConfig.input = ["dist-esm/**/*.spec.js"];
    baseConfig.plugins.unshift(
      multiEntry({ exports: false }),
      json() // This allows us to import/require the package.json file, to get the version and test it against the user agent.
    );
    baseConfig.output.file = "dist-test/index.browser.js";
    baseConfig.context = "null";

    // Disable tree-shaking of test code.  In rollup-plugin-node-resolve@5.0.0, rollup started respecting
    // the "sideEffects" field in package.json.  Since our package.json sets "sideEffects=false", this also
    // applies to test code, which causes all tests to be removed by tree-shaking.
    baseConfig.treeshake = false;
  }

  return baseConfig;
}
