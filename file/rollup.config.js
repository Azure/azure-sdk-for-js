import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import shim from "rollup-plugin-shim";
import { uglify } from "rollup-plugin-uglify";
import visualizer from "rollup-plugin-visualizer";

const version = require("./package.json").version;
const banner = [
  "/*!",
  ` * Azure Storage SDK for JavaScript - File, ${version}`,
  " * Copyright (c) Microsoft and contributors. All rights reserved.",
  " */"
].join("\n");

const nodeRollupConfigFactory = () => {
  return {
    external: ["ms-rest-js", "crypto", "fs", "events", "os", "stream"],
    input: "dist-esm/lib/index.js",
    output: {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true
    },
    plugins: [nodeResolve(), uglify()]
  };
};

const browserRollupConfigFactory = isProduction => {
  const browserRollupConfig = {
    input: "dist-esm/lib/index.browser.js",
    output: {
      file: "browser/azure-storage.file.js",
      banner: banner,
      format: "umd",
      name: "azfile",
      sourcemap: true
    },
    plugins: [
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
      commonjs({
        namedExports: {
          events: ["EventEmitter"],
          assert: [
            "ok",
            "deepEqual",
            "equal",
            "fail",
            "deepStrictEqual",
            "notEqual",
            "notDeepEqual",
            "notDeepStrictEqual"
          ]
        }
      })
    ]
  };

  if (isProduction) {
    browserRollupConfig.output.file = "browser/azure-storage.file.min.js";
    browserRollupConfig.plugins.push(
      uglify({
        output: {
          preamble: banner
        }
      }),
      visualizer({
        filename: "./statistics.html",
        sourcemap: true
      })
    );
  }

  return browserRollupConfig;
};

export default [
  nodeRollupConfigFactory(),
  browserRollupConfigFactory(false),
  browserRollupConfigFactory(true)
];
