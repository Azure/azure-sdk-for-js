// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// @ts-check

import nodeResolve from "rollup-plugin-node-resolve";
import multiEntry from "rollup-plugin-multi-entry";
import cjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import { uglify } from "rollup-plugin-uglify";
import sourcemaps from "rollup-plugin-sourcemaps";
import inject from "rollup-plugin-inject";
import shim from "rollup-plugin-shim";
import json from "rollup-plugin-json";

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
        values: {
          // replace dynamic checks with if (true) since this is for node only.
          // Allows rollup's dead code elimination to be more aggressive.
          "if (isNode)": "if (true)"
        }
      }),
      nodeResolve({ preferBuiltins: true }),
      cjs(),
      json()
    ]
  };

  if (test) {
    // entry point is every test file
    baseConfig.input = "dist-esm/test/**/*.spec.js";
    baseConfig.plugins.unshift(multiEntry({ exports: false }));

    // different output file
    baseConfig.output.file = "test-dist/index.js";

    // mark assert as external
    baseConfig.external.push();
  } else if (production) {
    baseConfig.plugins.push(uglify());
  }

  return baseConfig;
}

export function browserConfig(test = false) {
  const baseConfig = {
    input: input,
    output: {
      file: "browser/index.js",
      format: "umd",
      name: "Azure.AMQPCommon",
      sourcemap: true
    },
    preserveSymlinks: false,
    plugins: [
      sourcemaps(),

      replace({
        delimiters: ["", ""],
        values: {
          // replace dynamic checks with if (false) since this is for
          // browser only. Rollup's dead code elimination will remove
          // any code guarded by if (isNode) { ... }
          "if (isNode)": "if (false)"
        }
      }),

      // fs, net, and tls are used by rhea and need to be shimmed
      // TODO: get these into rhea's pkg.browser field
      // dotenv doesn't work in the browser, so replace it with a no-op function
      shim({
        dotenv: `export function config() { }`,
        os: `
          export function arch() { return "javascript" }
          export function type() { return "Browser" }
          export function release() { typeof navigator === 'undefined' ? '' : navigator.appVersion }
        `,
        path: `export default {}`
      }),

      nodeResolve({
        mainFields: ["module", "browser"],
        preferBuiltins: false
      }),

      cjs({
        namedExports: {
          chai: ["should"],
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
    baseConfig.input = "dist-esm/test/*.spec.js";
    baseConfig.plugins.unshift(multiEntry({ exports: false }));
    baseConfig.output.file = "test-browser/index.js";
  } else if (production) {
    baseConfig.plugins.push(uglify());
  }

  return baseConfig;
}
