// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import nodeResolve from "rollup-plugin-node-resolve";
import multiEntry from "rollup-plugin-multi-entry";
import cjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import { uglify } from "rollup-plugin-uglify";
import sourcemaps from "rollup-plugin-sourcemaps";
import shim from "rollup-plugin-shim";
// import visualizer from "rollup-plugin-visualizer";

const version = require("./package.json").version;
const banner = [
  "/*!",
  ` * Azure Storage SDK for JavaScript - File, ${version}`,
  " * Copyright (c) Microsoft and contributors. All rights reserved.",
  " */"
].join("\n");

const pkg = require("./package.json");
const depNames = Object.keys(pkg.dependencies);
const production = process.env.NODE_ENV === "production";

export function nodeConfig(test = false) {
  const externalNodeBuiltins = ["@azure/core-http", "crypto", "fs", "events", "os", "stream"];
  const baseConfig = {
    input: "dist-esm/src/index.js",
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
        values: {
          // replace dynamic checks with if (true) since this is for node only.
          // Allows rollup's dead code elimination to be more aggressive.
          "if (isNode)": "if (true)"
        }
      }),
      nodeResolve({ preferBuiltins: true }),
      cjs()
    ]
  };

  if (test) {
    // entry point is every test file
    baseConfig.input = ["dist-esm/test/*.spec.js", "dist-esm/test/node/*.spec.js"];
    baseConfig.plugins.unshift(multiEntry({ exports: false }));

    // different output file
    baseConfig.output.file = "dist-test/index.node.js";

    // mark assert as external
    baseConfig.external.push("assert", "fs", "path");

    baseConfig.context = "null";
  } else if (production) {
    baseConfig.plugins.push(uglify());
  }

  return baseConfig;
}

export function browserConfig(test = false, production = false) {
  const baseConfig = {
    input: "dist-esm/src/index.browser.js",
    output: {
      file: "browser/azure-storage-file.js",
      banner: banner,
      format: "umd",
      name: "azfile",
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
      // fs and os are not used by the browser bundle, so just shim it
      // dotenv doesn't work in the browser, so replace it with a no-op function
      shim({
        dotenv: `export function config() { }`,
        fs: `
          export function statSync() { }
          export function createReadStream() { }
        `,
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
          events: ["EventEmitter"],
          assert: [
            "ok",
            "deepEqual",
            "equal",
            "fail",
            "deepStrictEqual",
            "notDeepStrictEqual",
            "notDeepEqual",
            "notEqual"
          ]
        }
      })
    ]
  };

  if (test) {
    baseConfig.input = ["dist-esm/test/*.spec.js", "dist-esm/test/browser/*.spec.js"];
    baseConfig.plugins.unshift(multiEntry({ exports: false }));
    baseConfig.output.file = "dist-test/index.browser.js";
    // mark fs-extra as external
    baseConfig.external = ["fs-extra"];

    baseConfig.context = "null";
  } else if (production) {
    baseConfig.output.file = "browser/azure-storage-file.min.js";
    baseConfig.plugins.push(
      uglify({
        output: {
          preamble: banner
        }
      })
      // Comment visualizer because it only works on Node.js 8+; Uncomment it to get bundle analysis report
      // visualizer({
      //   filename: "./statistics.html",
      //   sourcemap: true
      // })
    );
  }

  return baseConfig;
}
