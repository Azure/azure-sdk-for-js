// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import multiEntry from "@rollup/plugin-multi-entry";
import json from "@rollup/plugin-json";
import * as path from "path";

import nodeBuiltins from "builtin-modules";

import * as openaiPkg from "./package.json" assert { type: "json" };

// #endregion

export function makeBrowserTestConfig(pkg) {
  const module = pkg["module"] ?? "dist-esm/src/index.js";
  const basePath = path.dirname(path.parse(module).dir);

  const config = {
    input: path.join(basePath, "test", "**", "*.spec.js"),
    output: {
      file: `dist-test/index.browser.js`,
      format: "umd",
      sourcemap: true,
    },
    preserveSymlinks: false,
    plugins: [
      multiEntry({ exports: false, exclude: ["**/test/**/node/*.js"] }),
      nodeResolve({
        mainFields: ["module", "browser"],
        preferBuiltins: false,
        browser: true,
      }),
      cjs(),
      json(),
    ],
    // Disable tree-shaking of test code.  In rollup-plugin-node-resolve@5.0.0,
    // rollup started respecting the "sideEffects" field in package.json.  Since
    // our package.json sets "sideEffects=false", this also applies to test
    // code, which causes all tests to be removed by tree-shaking.
    treeshake: false,
  };

  return config;
}

const defaultConfigurationOptions = {
  disableBrowserBundle: false,
};

export function makeConfig(pkg, options) {
  options = {
    ...defaultConfigurationOptions,
    ...(options ?? {}),
  };

  const baseConfig = {
    // Use the package's module field if it has one
    input: pkg["module"] ?? "dist-esm/src/index.js",
    external: [
      ...nodeBuiltins,
      ...Object.keys(pkg.dependencies),
      ...Object.keys(pkg.devDependencies),
    ],
    output: { file: "dist/index.cjs", format: "cjs", sourcemap: true, exports: "named" },
    preserveSymlinks: false,
    plugins: [nodeResolve(), cjs(), json()],
  };

  const config = [baseConfig];

  if (!options.disableBrowserBundle) {
    config.push(makeBrowserTestConfig(pkg));
  }

  return config;
}

export default makeConfig(openaiPkg.default);
