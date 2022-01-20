import cjs from "@rollup/plugin-commonjs";
import inject from "@rollup/plugin-inject";
import json from "@rollup/plugin-json";
import multiEntry from "@rollup/plugin-multi-entry";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import sourcemaps from "rollup-plugin-sourcemaps";
import { makeConfig, makeBrowserTestConfig } from "@azure/dev-tool/shared-config/rollup";

const inputs = makeConfig(require("./package.json"));

if (!process.env.ONLY_NODE) {
  // event-hubs has many dependencies that we do not
  // want to bring into the shared rollup config, so
  // replace the original test config with a patched one
  inputs[1] = makeBrowserTestConfigPatch();
}

function makeBrowserTestConfigPatch() {
  const config = { ...makeBrowserTestConfig(require("./package.json")) };
  config.plugins = [
    multiEntry({ exports: false }),
    sourcemaps(),
    replace({
      delimiters: ["", ""],
      // replace dynamic checks with if (false) since this is for
      // browser only. Rollup's dead code elimination will remove
      // any code guarded by if (isNode) { ... }
      "if (isNode)": "if (false)",
      "if (!isNode)": "if (true)",
    }),
    nodeResolve({
      mainFields: ["module", "browser"],
      preferBuiltins: false,
    }),
    cjs({
      namedExports: {
        chai: ["should", "assert"],
      },
    }),
    // rhea and rhea-promise use the Buffer global which requires
    // injection to shim properly
    inject({
      modules: {
        Buffer: ["buffer", "Buffer"],
      },
      exclude: ["./**/package.json"],
    }),
    json(),
  ];

  return config;
}

export default inputs;
