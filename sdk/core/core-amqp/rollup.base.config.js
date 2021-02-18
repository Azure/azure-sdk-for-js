// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// @ts-check

import nodeResolve from "@rollup/plugin-node-resolve";
import multiEntry from "@rollup/plugin-multi-entry";
import cjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import sourcemaps from "rollup-plugin-sourcemaps";
import inject from "@rollup/plugin-inject";
import shim from "rollup-plugin-shim";
import json from "@rollup/plugin-json";

const pkg = require("./package.json");
const depNames = Object.keys(pkg.dependencies);

const input = "dist-esm/src/index.js";
const production = process.env.NODE_ENV === "production";

export function nodeConfig(test = false) {
  const externalNodeBuiltins = [
    "os",
    "events",
    "net",
    "tls",
    "path",
    "fs",
    "url",
    "util",
    "stream",
    "punycode",
    "http",
    "https",
    "assert",
    "crypto",
    "timers",
    "string_decoder",
    "zlib",
    "dns"
  ];

  const baseConfig = {
    input: input,
    external: depNames.concat(externalNodeBuiltins),
    output: { file: "dist/index.js", format: "cjs", sourcemap: true },
    preserveSymlinks: false,
    plugins: [
      sourcemaps(),
      replace({
        delimiters: ["", ""],
        // replace dynamic checks with if (true) since this is for node only.
        // Allows rollup's dead code elimination to be more aggressive.
        "if (isNode)": "if (true)"
      }),
      nodeResolve({ preferBuiltins: true }),
      cjs(),
      json()
    ]
  };

  if (test) {
    // entry point is every test file
    baseConfig.input = ["dist-esm/test/*.spec.js", "dist-esm/test/node/*.spec.js"];
    baseConfig.plugins.unshift(multiEntry({ exports: false }));

    // different output file
    baseConfig.output.file = "test-dist/index.js";

    // mark assert as external
    baseConfig.external.push();

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
    input: input,
    output: {
      file: "dist-browser/index.js",
      format: "umd",
      name: "Azure.AMQPCommon",
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

      // dotenv doesn't work in the browser, so replace it with a no-op function
      // os and path are shimmed by bundlers (e.g. webpack, parcel) automatically,
      // but needs to be configured in rollup.
      shim({
        dotenv: `export function config() { }`,
        os: `export default { }`,
        path: `export default { }`
      }),

      nodeResolve({
        mainFields: ["module", "browser"],
        preferBuiltins: false
      }),

      cjs({
        namedExports: {
          chai: ["should", "assert"],
          assert: ["equal", "deepEqual", "notEqual"]
        }
      }),

      // rhea and rhea-promise use the Buffer global which requires
      // injection to shim properly
      inject({
        modules: {
          Buffer: ["buffer", "Buffer"],
          process: "process"
        }
      }),

      json()
    ]
  };

  if (test) {
    baseConfig.input = ["dist-esm/test/*.spec.js", "dist-esm/test/browser/*.spec.js"];
    baseConfig.plugins.unshift(multiEntry({ exports: false }));
    baseConfig.output.file = "test-browser/index.js";

    // Disable tree-shaking of test code.  In rollup-plugin-node-resolve@5.0.0, rollup started respecting
    // the "sideEffects" field in package.json.  Since our package.json sets "sideEffects=false", this also
    // applies to test code, which causes all tests to be removed by tree-shaking.
    baseConfig.treeshake = false;
  } else if (production) {
    baseConfig.plugins.push(terser());
  }

  return baseConfig;
}
