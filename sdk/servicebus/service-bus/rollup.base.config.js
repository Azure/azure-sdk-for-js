// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import nodeResolve from "rollup-plugin-node-resolve";
import multiEntry from "rollup-plugin-multi-entry";
import cjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
import sourcemaps from "rollup-plugin-sourcemaps";
import shim from "rollup-plugin-shim";
import path from "path";
import inject from "rollup-plugin-inject";

const pkg = require("./package.json");
const depNames = Object.keys(pkg.dependencies);
const input = "dist-esm/src/index.js";

const version = require("./package.json").version;
const banner = [
  "/*!",
  ` * Azure Service Bus SDK for JavaScript, ${version}`,
  " * Copyright (c) Microsoft and contributors. All rights reserved.",
  " */"
].join("\n");

const ignoreKnownWarnings = (warning) => {
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

export function nodeConfig({ test = false, production = false } = {}) {
  const externalNodeBuiltins = ["events", "util", "os"];
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
          "if (isNode)": "if (true)",
          "if (!isNode)": "if (false)"
        }
      }),
      nodeResolve({ preferBuiltins: true }),
      cjs(),
      json()
    ]
  };

  if (test) {
    // entry point is every test file
    baseConfig.input = "dist-esm/test/*.spec.js";
    baseConfig.plugins.unshift(multiEntry({ exports: false }));

    // different output file
    baseConfig.output.file = "test-dist/index.js";

    // mark assert as external
    baseConfig.external.push(
      "assert",
      "fs",
      "path",
      "@azure/arm-servicebus",
      "@azure/ms-rest-nodeauth"
    );

    baseConfig.onwarn = ignoreKnownWarnings;

    // Disable tree-shaking of test code.  In rollup-plugin-node-resolve@5.0.0, rollup started respecting
    // the "sideEffects" field in package.json.  Since our package.json sets "sideEffects=false", this also
    // applies to test code, which causes all tests to be removed by tree-shaking.
    baseConfig.treeshake = false;
  } else if (production) {
    baseConfig.plugins.push(terser());
  }

  return baseConfig;
}

export function browserConfig({ test = false, production = false } = {}) {
  const baseConfig = {
    input: input,
    external: [],
    output: {
      file: "browser/service-bus.js",
      format: "umd",
      name: "Azure.Messaging.ServiceBus",
      sourcemap: true
    },
    preserveSymlinks: false,
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
            "if (isNode)": "if (false)",
            "if (!isNode)": "if (true)"
          }
        }
      ),
      // fs, net, and tls are used by rhea and need to be shimmed
      // dotenv doesn't work in the browser, so replace it with a no-op function
      shim({
        fs: `export default {}`,
        net: `export default {}`,
        tls: `export default {}`,
        dotenv: `export function config() { }`,
        os: `
          export function arch() { return "javascript" }
          export function type() { return "Browser" }
          export function release() { typeof navigator === 'undefined' ? '' : navigator.appVersion }
        `,
        path: `export default {}`,
        dns: `export function resolve() { }`
      }),

      nodeResolve({
        mainFields: ["module", "browser"],
        preferBuiltins: false,
        dedupe: ["buffer"]
      }),
      cjs({
        namedExports: { events: ["EventEmitter"], long: ["ZERO"] }
      }),

      // rhea and rhea-promise use the Buffer global which requires
      // injection to shim properly
      inject({
        modules: {
          Buffer: ["buffer", "Buffer"],
          process: "process"
        },
        exclude: ["./**/package.json"]
      }),

      json()
    ]
  };

  baseConfig.onwarn = ignoreKnownWarnings;

  if (test) {
    baseConfig.input = "dist-esm/test/*.spec.js";
    baseConfig.plugins.unshift(multiEntry({ exports: false }));
    baseConfig.output.file = "test-browser/index.js";

    // Disable tree-shaking of test code.  In rollup-plugin-node-resolve@5.0.0, rollup started respecting
    // the "sideEffects" field in package.json.  Since our package.json sets "sideEffects=false", this also
    // applies to test code, which causes all tests to be removed by tree-shaking.
    baseConfig.treeshake = false;
  } else if (production) {
    baseConfig.output.file = "browser/service-bus.min.js";
    baseConfig.plugins.push(
      terser({
        output: {
          preamble: banner
        }
      })
    );
  }

  return baseConfig;
}
