// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

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
  // app-configuration has dependencies that we do not
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
    shim({
      path: `export default { }`,
    }),
    nodeResolve({
      mainFields: ["module", "browser"],
      preferBuiltins: false,
    }),
    cjs({
      namedExports: {
        chai: ["assert", "expect", "use"],
        events: ["EventEmitter"],
      },
    }),
    inject({
      modules: {
        process: "process",
      },
      exclude: ["./**/package.json"],
    }),
    json(),
  ];

  config.external = ["nock", "process"];
  config.output.globals = {
    ...config.output.globals,
    nock: "nock",
    process: "process",
  };
  return config;
}

export default inputs;
