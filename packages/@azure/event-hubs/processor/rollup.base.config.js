// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import nodeResolve from "rollup-plugin-node-resolve";
import multiEntry from "rollup-plugin-multi-entry";
import cjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import replace from "rollup-plugin-replace";
import { uglify } from "rollup-plugin-uglify";
import sourcemaps from "rollup-plugin-sourcemaps";

import path from "path";

const pkg = require("./package.json");
const depNames = Object.keys(pkg.dependencies);
const input = "dist-esm/lib/index.js";
const production = process.env.NODE_ENV === "production";

export function nodeConfig(test = false) {
  const externalNodeBuiltins = ["events", "util"];
  const baseConfig = {
    input: input,
    external: depNames.concat(externalNodeBuiltins),
    output: { file: "dist/index.js", format: "cjs", sourcemap: true },
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

  baseConfig.external.push("crypto");

  if (test) {
    // entry point is every test file
    baseConfig.input = "dist-esm/tests/**/*.spec.js";
    baseConfig.plugins.unshift(multiEntry({ exports: false }));

    // different output file
    baseConfig.output.file = "test-dist/index.js";

    // mark assert as external
    baseConfig.external.push("assert", "fs", "path", "os", "tty", "child_process");

    baseConfig.onwarn = (warning) => {
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
    input: input,
    external: ["ms-rest-js"],
    output: {
      file: "browser/index.js",
      format: "umd",
      name: "ExampleClient",
      sourcemap: true,
      globals: { "ms-rest-js": "msRest" }
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
      nodeResolve({
        preferBuiltins: false,
        browser: true
      }),
      cjs({
        namedExports: { events: ["EventEmitter"] }
      }),
      json()
    ]
  };

  if (test) {
    baseConfig.input = "dist-esm/tests/**/*.spec.js";
    baseConfig.plugins.unshift(multiEntry({ exports: false }));
    baseConfig.output.file = "test-browser/index.js";
  } else if (production) {
    baseConfig.plugins.push(uglify());
  }

  return baseConfig;
}
