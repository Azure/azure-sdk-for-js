// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import nodeResolve from "@rollup/plugin-node-resolve";
import multiEntry from "@rollup/plugin-multi-entry";
import cjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import sourcemaps from "rollup-plugin-sourcemaps";
import shim from "rollup-plugin-shim";
// import visualizer from "rollup-plugin-visualizer";

const version = require("./package.json").version;
const banner = [
  "/*!",
  ` * Azure Storage SDK for JavaScript - Blob, ${version}`,
  " * Copyright (c) Microsoft and contributors. All rights reserved.",
  " */"
].join("\n");

const pkg = require("./package.json");
const depNames = Object.keys(pkg.dependencies);
const production = process.env.NODE_ENV === "production";

export function nodeConfig(test = false) {
  const externalNodeBuiltins = [
    "@azure/core-http",
    "crypto",
    "fs",
    "events",
    "os",
    "stream",
    "util"
  ];
  const baseConfig = {
    input: "dist-esm/storage-blob/src/index.js",
    external: depNames.concat(externalNodeBuiltins),
    output: {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true
    },
    preserveSymlinks: false,
    plugins: [
      sourcemaps(),
      replace({
        delimiters: ["", ""],
        // replace dynamic checks with if (true) since this is for node only.
        // Allows rollup's dead code elimination to be more aggressive.
        "if (isNode)": "if (true)",
        "if (!isNode)": "if (false)"
      }),
      nodeResolve({ preferBuiltins: true }),
      cjs()
    ],
    onwarn(warning, warn) {
      if (warning.code === "CIRCULAR_DEPENDENCY") {
        throw new Error(warning.message);
      }
      warn(warning);
    }
  };

  if (test) {
    // entry point is every test file
    baseConfig.input = [
      "dist-esm/storage-blob/test/*.spec.js",
      "dist-esm/storage-blob/test/node/*.spec.js",
      "dist-esm/storage-blob/src/index.js"
    ];
    baseConfig.plugins.unshift(multiEntry());

    // different output file
    baseConfig.output.file = "dist-test/index.node.js";

    // mark assert as external
    baseConfig.external.push("assert", "fs", "path", "buffer", "zlib");

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
    input: "dist-esm/storage-blob/src/index.browser.js",
    output: {
      file: "dist-browser/azure-storage-blob.js",
      banner: banner,
      format: "umd",
      name: "azblob",
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
        "if (isNode)": "if (false)",
        "if (!isNode)": "if (true)"
      }),
      // fs and os are not used by the browser bundle, so just shim it
      // dotenv doesn't work in the browser, so replace it with a no-op function
      shim({
        dotenv: `export function config() { }`,
        fs: `
          export function stat() { }
          export function createReadStream() { }
          export function createWriteStream() { }
        `,
        os: `
          export const type = 1;
          export const release = 1;
        `,
        util: `
          export function promisify() { }
        `
      }),
      nodeResolve({
        mainFields: ["module", "browser"],
        preferBuiltins: false
      }),
      cjs({
        namedExports: {
          events: ["EventEmitter"],
          assert: [
            "ok",
            "deepEqual",
            "equal",
            "fail",
            "strictEqual",
            "deepStrictEqual",
            "notDeepEqual",
            "notDeepStrictEqual"
          ],
          "@opentelemetry/api": ["CanonicalCode", "SpanKind", "TraceFlags"]
        }
      })
    ],
    onwarn(warning, warn) {
      if (warning.code === "CIRCULAR_DEPENDENCY") {
        throw new Error(warning.message);
      }
      warn(warning);
    }
  };

  if (test) {
    baseConfig.input = [
      "dist-esm/storage-blob/test/*.spec.js",
      "dist-esm/storage-blob/test/browser/*.spec.js"
    ];
    baseConfig.plugins.unshift(multiEntry({ exports: false }));
    baseConfig.output.file = "dist-test/index.browser.js";
    // mark fs-extra as external
    baseConfig.external = ["fs-extra"];

    baseConfig.context = "null";

    // Disable tree-shaking of test code.  In rollup-plugin-node-resolve@5.0.0, rollup started respecting
    // the "sideEffects" field in package.json.  Since our package.json sets "sideEffects=false", this also
    // applies to test code, which causes all tests to be removed by tree-shaking.
    baseConfig.treeshake = false;
  }

  return baseConfig;
}
