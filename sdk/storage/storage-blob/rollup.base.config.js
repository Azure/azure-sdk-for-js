// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import nodeResolve from "rollup-plugin-node-resolve";
import multiEntry from "rollup-plugin-multi-entry";
import cjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import replace from "rollup-plugin-replace";
import { uglify } from "rollup-plugin-uglify";
import sourcemaps from "rollup-plugin-sourcemaps";
import shim from "rollup-plugin-shim";
// import visualizer from "rollup-plugin-visualizer";

import path from "path";

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
    "@azure/ms-rest-js",
    "crypto",
    "fs",
    "events",
    "os",
    "stream"
  ];
  const baseConfig = {
    input: "dist-esm/src/index.js",
    external: depNames.concat(externalNodeBuiltins),
    output: {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true
    },
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
    baseConfig.input = [
      "dist-esm/test/node/*.spec.js",
      "dist-esm/test/*.spec.js"
    ];
    baseConfig.plugins.unshift(multiEntry({ exports: false }));

    // different output file
    baseConfig.output.file = "test-dist/index.js";

    // mark assert as external
    baseConfig.external.push("assert", "fs", "path");

    baseConfig.onwarn = warning => {
      if (warning.code === "THIS_IS_UNDEFINED") {
        // This error happens frequently due to TypeScript emitting `this` at the
        // top-level of a module. In this case its fine if it gets rewritten to
        // undefined, so ignore this error.
        return;
      }

      if (
        warning.code === "CIRCULAR_DEPENDENCY" &&
        warning.importer.indexOf(path.normalize("node_modules/chai/lib") === 0)
      ) {
        // Chai contains circular references, but they are not fatal and can be ignored.
        return;
      }

      console.error(`(!) ${warning.message}`);
    };
  } else if (production) {
    baseConfig.plugins.push(uglify());
  }

  return baseConfig;
}

export function browserConfig(test = false) {
  const baseConfig = {
    input: "dist-esm/src/index.browser.js",
    external: ["ms-rest-js"],
    output: {
      file: "browser/index.js",
      banner: banner,
      format: "umd",
      name: "azblob",
      sourcemap: true
    },
    plugins: [
      sourcemaps(),
      replace(
        // ms-rest-js is externalized so users must include it prior to using this bundle.
        {
          delimiters: ["", ""],
          values: {
            // replace dynamic checks with if (false) since this is for
            // browser only. Rollup's dead code elimination will remove
            // any code guarded by if (isNode) { ... }
            "if (isNode)": "if (false)"
          }
        }
      ),
      // os is not used by the browser bundle, so just shim it
      shim({
        dotenv: `export function config() { }`,
        os: `
          export const type = 1;
          export const release = 1;
        `
      }),
      nodeResolve({
        module: true,
        browser: true,
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
            "notDeepEqual"
          ]
        }
      }),
      json()
    ]
  };

  if (test) {
    baseConfig.input = [
      "dist-esm/test/browser/*.spec.js",
      "dist-esm/test/*.spec.js"
    ];
    baseConfig.plugins.unshift(multiEntry({ exports: false }));
    baseConfig.output.file = "dist-test/index.browser.js";
    baseConfig.onwarn = warning => {
      if (warning.code === "THIS_IS_UNDEFINED") {
        // This error happens frequently due to TypeScript emitting `this` at the
        // top-level of a module. In this case its fine if it gets rewritten to
        // undefined, so ignore this error.
        return;
      }

      if (
        warning.code === "CIRCULAR_DEPENDENCY" &&
        warning.importer.indexOf(path.normalize("node_modules/chai/lib") === 0)
      ) {
        // Chai contains circular references, but they are not fatal and can be ignored.
        return;
      }

      console.error(`(!) ${warning.message}`);
    };
  } else if (production) {
    baseConfig.plugins.push(uglify());
  }

  return baseConfig;
}
