// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// Custom configuration for the browser test that addresses the following issues:
// - add cjs namedExports for openTelemetryCommonJs()

import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import multiEntry from "@rollup/plugin-multi-entry";
import replace from "@rollup/plugin-replace";
import sourcemaps from "rollup-plugin-sourcemaps";
import shim from "rollup-plugin-shim";
import { makeBrowserTestConfig } from "@azure/dev-tool/shared-config/rollup";

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
    }),
    shim({
      fs: `export default {}`,
      path: `export default {}`,
    }),
    nodeResolve({
      mainFields: ["module", "browser"],
      preferBuiltins: false,
    }),
    json(),
    cjs(),
  ];

  return config;
}

export default makeBrowserTestConfigPatch();
