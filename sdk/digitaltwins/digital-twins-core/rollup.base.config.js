import nodeResolve from "@rollup/plugin-node-resolve";
import multiEntry from "@rollup/plugin-multi-entry";
import cjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import sourcemaps from "rollup-plugin-sourcemaps";
import shim from "rollup-plugin-shim";
import json from "@rollup/plugin-json";
import * as path from "path";
import inject from "@rollup/plugin-inject";
import { openTelemetryCommonJs } from "@azure/dev-tool/shared-config/rollup";

const pkg = require("./package.json");
const depNames = Object.keys(pkg.dependencies);
const devDepNames = Object.keys(pkg.devDependencies);
const input = "dist-esm/src/index.js";
const production = process.env.NODE_ENV === "production";

const ignoreKnownWarnings = (warning) => {
  if (
    warning.code === "CIRCULAR_DEPENDENCY" &&
    warning.importer.indexOf(path.normalize("node_modules/chai/lib") === 0)
  ) {
    // Chai contains circular references, but they are not fatal and can be ignored.
    return;
  }

  console.error(`(!) ${warning.message}`);
};

export function nodeConfig(test = false) {
  const externalNodeBuiltins = ["events", "path"];
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
      cjs()
    ]
  };

  if (test) {
    // Entry points - test files under the `test` folder(common for both browser and node), node specific test files
    baseConfig.input = [
      "dist-esm/test/*.spec.js",
      "dist-esm/test/unit/*.spec.js",
      "dist-esm/test/public/*.spec.js"
    ];
    baseConfig.plugins.unshift(multiEntry({ exports: false }));

    // different output file
    baseConfig.output.file = "dist-test/index.node.js";

    // mark devdeps as external
    baseConfig.external.push(...devDepNames);

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
      file: "dist-browser/digital-twins-core.js",
      format: "umd",
      name: "Azure.DigitialTwins",
      globals: {
        "@azure/core-http": "Azure.Core.HTTP"
      },
      sourcemap: true
    },
    external: ["nock", "fs-extra"],
    preserveSymlinks: false,
    plugins: [
      sourcemaps(),
      replace({
        delimiters: ["", ""]
      }),

      nodeResolve({
        mainFields: ["module", "browser"],
        preferBuiltins: false
      }),
      cjs({
        namedExports: {
          chai: ["assert", "expect", "use"],
          assert: ["ok", "equal", "strictEqual", "deepEqual", "fail", "throws", "notEqual"],
          events: ["EventEmitter"],
          ...openTelemetryCommonJs()
        }
      }),

      inject({
        modules: {
          process: "process"
        },
        exclude: ["./**/package.json"]
      }),

      json()
    ]
  };

  baseConfig.onwarn = ignoreKnownWarnings;

  if (test) {
    baseConfig.input = [
      "dist-esm/test/*.spec.js",
      "dist-esm/test/unit/*.spec.js",
      "dist-esm/test/public/*.spec.js"
    ];

    baseConfig.external.unshift(...["process"]);

    baseConfig.output.globals = {
      ...baseConfig.output.globals,
      nock: "nock",
      fs: "fs-extra",
      "fs-extra": "fs",
      process: "process",
      path: "path"
    };

    baseConfig.plugins.unshift(multiEntry({ exports: false }));
    baseConfig.plugins.unshift(
      ...[shim({ path: `export function join() {}`, dotenv: `export function config() { }` })]
    );

    baseConfig.output.file = "dist-test/index.browser.js";

    // Disable tree-shaking of test code.  In rollup-plugin-node-resolve@5.0.0, rollup started respecting
    // the "sideEffects" field in package.json.  Since our package.json sets "sideEffects=false", this also
    // applies to test code, which causes all tests to be removed by tree-shaking.
    baseConfig.treeshake = false;
  }

  return baseConfig;
}
