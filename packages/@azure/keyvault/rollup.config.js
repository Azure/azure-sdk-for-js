import nodeResolve from "rollup-plugin-node-resolve";
/**
 * @type {import('rollup').RollupFileOptions}
 */

const version = require("./package.json").version;
const banner = [
  "/*!",
  " * Copyright (c) Microsoft and contributors. All rights reserved.",
  " * Licensed under the MIT License. See License.txt in the project root for",
  " * license information.",
  " * ",
  ` * Azure KeyVault SDK for JavaScript - ${version}`,
  " */"
].join("\n");

const config = {
  input: './dist-esm/lib/index.js',
  external: ["@azure/ms-rest-js", "@azure/ms-rest-azure-js", "url", "util"],
  output: {
    file: "./dist/index.js",
    format: "umd",
    name: "Azure.Keyvault",
    sourcemap: true,
    globals: {
      "@azure/ms-rest-js": "msRest",
      "@azure/ms-rest-azure-js": "msRestAzure",
      "url": "url",
      "util": "util"
    },
    banner: banner
  },
  plugins: [
    nodeResolve({ module: true })
  ]
};
export default config;
