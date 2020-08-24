import path from "path";
import nodeResolve from "@rollup/plugin-node-resolve";
import multiEntry from "@rollup/plugin-multi-entry";
import cjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import sourcemaps from "rollup-plugin-sourcemaps";
import viz from "rollup-plugin-visualizer";
import shim from "rollup-plugin-shim";
import inject from "@rollup/plugin-inject";

const pkg = require("./package.json");
const depNames = Object.keys(pkg.dependencies);
const devDepNames = Object.keys(pkg.devDependencies);
const input = "dist-esm/src/index.js";
const production = process.env.NODE_ENV === "production";
const testModes = ["unit", "integration"];

export function nodeConfig() {
  const externalNodeBuiltins = ["crypto", "url"];
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
      cjs()
    ]
  };

  if (production) {
    baseConfig.plugins.push(terser());
  }

  return baseConfig;
}

export function browserConfig() {
  const baseConfig = {
    input: input,
    external: ["fs-extra", "nock", "path"],
    output: {
      file: "dist-browser/data-tables.js",
      format: "umd",
      name: "Azure.Tables",
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
      // os is not used by the browser bundle, so just shim it
      shim({
        fs: `export default {}`,
        path: `export function join() {}`,
        stream: `export default {}`,
        dotenv: `export function config() { }`,
        os: `
          export function arch() { return "javascript" }
          export function type() { return "Browser" }
          export function release() { typeof navigator === 'undefined' ? '' : navigator.appVersion }
        `,
        constants: `export default {}`
      }),
      nodeResolve({
        mainFields: ["module", "browser"],
        preferBuiltins: false
      }),
      cjs({
        namedExports: {
          chai: ["assert"],
          "@opentelemetry/api": ["CanonicalCode", "SpanKind", "TraceFlags"]
        }
      }),
      inject({
        modules: {
          process: "process"
        },
        exclude: ["./**/package.json"]
      }),
      viz({ filename: "dist-browser/browser-stats.html", sourcemap: false })
    ]
  };

  return baseConfig;
}

export function nodeTestConfig(testMode) {
  if (!testModes.includes(testMode)) {
    throw new Error(`Unknown test mode ${testMode}. Supported modes ${testModes.join(",")}`);
  }

  const baseConfig = nodeConfig();

  const input =
    testMode === "unit"
      ? [
          // common tests
          "dist-esm/test/unit/*.spec.js",
          // node specific tests
          "dist-esm/test/unit/node/*.spec.js"
        ]
      : [
          // common tests
          "dist-esm/test/integration/*.spec.js",
          // node specific tests
          "dist-esm/test/integration/node/*.spec.js"
        ];

  // Entry points - test files under the `test` folder(common for both browser and node), node specific test files
  baseConfig.input = input;
  baseConfig.plugins.unshift(multiEntry({ exports: false }));

  // different output file
  baseConfig.output.file = `dist-test/${testMode}.index.node.js`;

  // mark devdeps as external
  baseConfig.external.push(...devDepNames);

  // Disable tree-shaking of test code.  In rollup-plugin-node-resolve@5.0.0, rollup started respecting
  // the "sideEffects" field in package.json.  Since our package.json sets "sideEffects=false", this also
  // applies to test code, which causes all tests to be removed by tree-shaking.
  baseConfig.treeshake = false;

  return baseConfig;
}

export function browserTestConfig(testMode) {
  if (!testModes.includes(testMode)) {
    throw new Error(`Unknown test mode ${testMode}. Supported modes ${testModes.join(",")}`);
  }

  const baseConfig = browserConfig();

  const input =
    testMode === "unit"
      ? [
          // common tests
          "dist-esm/test/unit/*.spec.js",
          // browser specific tests
          "dist-esm/test/unit/browser/*.spec.js"
        ]
      : [
          // common tests
          "dist-esm/test/integration/*.spec.js",
          // browser specific tests
          "dist-esm/test/integration/browser/*.spec.js"
        ];

  // Entry points - test files under the `test` folder(common for both browser and node), browser specific test files
  baseConfig.input = input;
  baseConfig.plugins.unshift(multiEntry({ exports: false }));
  baseConfig.output.file = `dist-test/${testMode}.index.browser.js`;
  // mark fs-extra as external
  baseConfig.external = ["fs-extra"];

  baseConfig.context = "null";

  baseConfig.onwarn = (warning) => {
    if (
      warning.code === "CIRCULAR_DEPENDENCY" &&
      warning.importer.indexOf(path.normalize("node_modules/chai/lib") === 0)
    ) {
      // Chai contains circular references, but they are not fatal and can be ignored.
      return;
    }

    console.error(`(!) ${warning.message}`);
  };

  // Disable tree-shaking of test code.  In rollup-plugin-node-resolve@5.0.0, rollup started respecting
  // the "sideEffects" field in package.json.  Since our package.json sets "sideEffects=false", this also
  // applies to test code, which causes all tests to be removed by tree-shaking.
  baseConfig.treeshake = false;

  return baseConfig;
}
