// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import nodeResolve from "@rollup/plugin-node-resolve";
import multiEntry from "@rollup/plugin-multi-entry";
import cjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import sourcemaps from "rollup-plugin-sourcemaps";
import shim from "rollup-plugin-shim";
import * as path from "path";
// import visualizer from "rollup-plugin-visualizer";
import { openTelemetryCommonJs } from "@azure/dev-tool/shared-config/rollup";

const version = require("./package.json").version;
const banner = [
  "/*!",
  ` * Azure Storage SDK for JavaScript - Blob, ${version}`,
  " * Copyright (c) Microsoft and contributors. All rights reserved.",
  " */"
].join("\n");

export function browserConfig(test = false) {
  const baseConfig = {
    input: "dist-esm/src/index.js",
    output: {
      file: "dist-browser/azure-testing-recorder-new.js",
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
          ...openTelemetryCommonJs()
        }
      })
    ],
    onwarn(warning, warn) {
      if (
        warning.code === "CIRCULAR_DEPENDENCY" &&
        warning.importer.indexOf(path.normalize("node_modules/@opentelemetry/api")) >= 0
      ) {
        // opentelemetry contains circular references but it doesn't cause issues.
        return;
      }

      if (
        warning.code === "CIRCULAR_DEPENDENCY" ||
        warning.code === "UNRESOLVED_IMPORT"
        // Unresolved imports in the browser may break apps with frameworks such as angular.
        // Shim the modules with dummy src files for browser to avoid regressions.
      ) {
        throw new Error(warning.message);
      }
      warn(warning);
    }
  };

  if (test) {
    baseConfig.input = ["dist-esm/test/*.spec.js"];
    baseConfig.plugins.unshift(multiEntry({ exports: false }));
    baseConfig.output.file = "dist-test/index.browser.js";

    baseConfig.external = [];

    baseConfig.context = "null";

    // Disable tree-shaking of test code.  In rollup-plugin-node-resolve@5.0.0, rollup started respecting
    // the "sideEffects" field in package.json.  Since our package.json sets "sideEffects=false", this also
    // applies to test code, which causes all tests to be removed by tree-shaking.
    baseConfig.treeshake = false;
  }

  return baseConfig;
}
