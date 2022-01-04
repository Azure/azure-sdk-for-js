import cjs from "@rollup/plugin-commonjs";
import inject from "@rollup/plugin-inject";
import json from "@rollup/plugin-json";
import multiEntry from "@rollup/plugin-multi-entry";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import shim from "rollup-plugin-shim";
import sourcemaps from "rollup-plugin-sourcemaps";
import { makeConfig, makeBrowserTestConfig } from "@azure/dev-tool/shared-config/rollup";

const inputs = makeConfig(require("./package.json"));

if (!process.env.ONLY_NODE) {
  // service-bus has many dependencies that we do not
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
    }),
    // fs, net, and tls are used by rhea and need to be shimmed
    shim({
      os: `export default { }`,
      path: `export default { }`,
    }),
    nodeResolve({
      mainFields: ["module", "browser"],
      preferBuiltins: false,
    }),
    cjs({
      namedExports: {
        chai: ["should", "assert"],
        assert: ["equal", "deepEqual", "notEqual"],
      },
    }),
    // rhea and rhea-promise use the Buffer global which requires
    // injection to shim properly
    inject({
      modules: {
        Buffer: ["buffer", "Buffer"],
        process: "process",
      },
      exclude: ["./**/package.json"],
    }),
    json(),
  ];

  return config;
}

export default inputs;
