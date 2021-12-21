import path from "path";
import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import sourcemaps from "rollup-plugin-sourcemaps";

export function webworkerConfig() {
  const baseConfig = {
    input: "dist-esm/test/public/browser/webworker.js",
    output: {
      file: "dist-test/webworker.js",
      format: "iife",
      sourcemap: true,
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
          "if (isNode)": "if (false)",
        },
      }),
      nodeResolve({
        mainFields: ["module", "browser"],
        preferBuiltins: false,
      }),
      cjs(),
    ],
  };

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
