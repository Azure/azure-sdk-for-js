// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import nodeResolve from "rollup-plugin-node-resolve";
import cjs from "rollup-plugin-commonjs";

/**
 * @type {import('rollup').RollupFileOptions}
 */

const pkg = require("./package.json");
const version = pkg.version;
const banner = [
  "/*!",
  " * Copyright (c) Microsoft and contributors. All rights reserved.",
  " * Licensed under the MIT License. See License.txt in the project root for",
  " * license information.",
  " * ",
  ` * Azure KeyVault Keys SDK for JavaScript - ${version}`,
  " */"
].join("\n");

const depNames = Object.keys(pkg.dependencies);
const input = "esm/index.js";

function nodeConfig(test = false) {
  const externalNodeBuiltins = ["url"];
  const baseConfig = {
    input: input,
    external: depNames.concat(externalNodeBuiltins),
    output: {
      file: "dist/index.js",
      format: "cjs",
      name: "Azure.Keyvault.Keys",
      sourcemap: true,
      banner: banner
    },
    plugins: [
      nodeResolve({ preferBuiltins: true }),
      cjs()
    ]
  };

  return baseConfig;
}

function browserConfig(test = false) {
  const baseConfig = {
    input: input,
    external: ["ms-rest-js", "ms-rest-azure-js"],
    output: {
      file: "browser/index.js",
      format: "umd",
      name: "Azure.Keyvault.Keys",
      sourcemap: true,
      globals: {
        "@azure/ms-rest-js": "msRest",
        "@azure/ms-rest-azure-js": "msRestAzure"
      },
      banner: banner
    },
    plugins: [
      nodeResolve({
        preferBuiltins: false,
        browser: true,
        module: true
      }),
      cjs()
    ]
  };

  return baseConfig;
}

const inputs = [];

if (!process.env.ONLY_BROWSER) {
  inputs.push(nodeConfig());
}

if (!process.env.ONLY_NODE) {
  inputs.push(browserConfig());
}

export default inputs;
