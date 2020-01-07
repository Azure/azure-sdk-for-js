import cjs from "rollup-plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "rollup-plugin-node-resolve";
import sourcemaps from "rollup-plugin-sourcemaps";
import visualizer from "rollup-plugin-visualizer";

const pkg = require("./package.json");
const depNames = Object.keys(pkg.dependencies);
const input = "./es/src/coreHttp.js";
const production = process.env.NODE_ENV === "production";

const banner = `/** @license @azure/core-http
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License. See License.txt and ThirdPartyNotices.txt in the project root for license information.
  */`;

export function nodeConfig(test = false) {
  const externalNodeBuiltins = ["crypto", "http", "https", "os", "stream", "util"];
  const baseConfig = {
    input,
    external: depNames.concat(externalNodeBuiltins),
    output: {
      file: "./dist/coreHttp.node.js",
      format: "cjs",
      sourcemap: true,
      banner
    },
    preserveSymlinks: false,
    plugins: [
      sourcemaps(),
      json(),
      nodeResolve({
        mainFields: ["module", "main"],
        preferBuiltins: true
      }),
      cjs(),
      visualizer({
        filename: "dist/node-stats.html",
        sourcemap: true
      })
    ]
  };

  if (test) {
    // entry point is every test file
    baseConfig.input = "dist-esm/test/**/*.spec.js";
    baseConfig.plugins.unshift(multiEntry({ exports: false }));

    // different output file
    baseConfig.output.file = "test-dist/index.js";

    // mark assert as external
    baseConfig.external.push("assert");

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
      file: "./dist/coreHttp.browser.js",
      format: "umd",
      name: "Azure.Core.HTTP",
      sourcemap: true,
      banner
    },
    preserveSymlinks: false,
    plugins: [
      sourcemaps(),
      nodeResolve({
        mainFields: ["module", "browser"]
      }),
      cjs({
        namedExports: {
          "@opentelemetry/types": ["CanonicalCode", "SpanKind", "TraceFlags"]
        }
      }),
      visualizer({ filename: "dist/browser-stats.html", sourcemap: true })
    ]
  };

  if (test) {
    baseConfig.input = "es/test/**/*.spec.js";
    baseConfig.plugins.unshift(multiEntry({ exports: false }));
    baseConfig.output.file = "test-browser/index.js";

    // Disable tree-shaking of test code.  In rollup-plugin-node-resolve@5.0.0, rollup started respecting
    // the "sideEffects" field in package.json.  Since our package.json sets "sideEffects=false", this also
    // applies to test code, which causes all tests to be removed by tree-shaking.
    baseConfig.treeshake = false;
  }

  return baseConfig;
}
