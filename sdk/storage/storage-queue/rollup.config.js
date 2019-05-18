import nodeResolve from "rollup-plugin-node-resolve";
import { uglify } from "rollup-plugin-uglify";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import shim from "rollup-plugin-shim";
//import visualizer from "rollup-plugin-visualizer";

const version = require("./package.json").version;
const banner = [
  "/*!",
  ` * Azure Storage SDK for JavaScript - Queue, ${version}`,
  " * Copyright (c) Microsoft and contributors. All rights reserved.",
  " */"
].join("\n");

const nodeRollupConfigFactory = () => {
  return {
    external: ["@azure/ms-rest-js", "crypto", "fs", "os"],
    input: "dist-esm/src/index.js",
    output: {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true
    },
    preserveSymlinks: false,
    plugins: [nodeResolve(), uglify()]
  };
};

const browserRollupConfigFactory = (isProduction) => {
  const browserRollupConfig = {
    input: "dist-esm/src/index.browser.js",
    output: {
      file: "browser/azure-storage.queue.js",
      banner: banner,
      format: "umd",
      name: "azqueue",
      sourcemap: true
    },
    preserveSymlinks: false,
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
        dotenv: `export function config() { }`,
        os: `
          export const type = 1;
          export const release = 1;
        `
      }),
      nodeResolve({
        mainFields: ["module", "browser"],
        preferBuiltins: false
      }),
      commonjs({
        namedExports: {
          assert: ["ok", "deepEqual", "equal", "fail", "deepStrictEqual"]
        }
      })
    ]
  };

  if (isProduction) {
    browserRollupConfig.output.file = "browser/azure-storage.queue.min.js";
    browserRollupConfig.plugins.push(
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

  return browserRollupConfig;
};

export default [
  browserRollupConfigFactory(false),
  browserRollupConfigFactory(true),
  nodeRollupConfigFactory()
];
