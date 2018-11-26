import alias from "rollup-plugin-alias";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import visualizer from "rollup-plugin-visualizer";
import json from "rollup-plugin-json";
import sourcemaps from "rollup-plugin-sourcemaps";

const banner = `/** @license ms-rest-js
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt and ThirdPartyNotices.txt in the project root for license information.
 */`;

/**
 * @type {import('rollup').RollupFileOptions}
 */
const nodeConfig = {
  input: './es/lib/msRest.js',
  external: [
    "axios",
    "xml2js",
    "tough-cookie",
    "uuid/v4",
    "tslib",
    "form-data",
    "stream",
    "os"
  ],
  output: {
    file: "./dist/msRest.node.js",
    format: "cjs",
    sourcemap: true,
    banner
  },
  plugins: [
    nodeResolve({ module: true }),
    commonjs(),
    sourcemaps(),
    json(),
    visualizer({ filename: "dist/node-stats.html", sourcemap: true })
  ]
}

/**
 * @type {import('rollup').RollupFileOptions}
 */
const browserConfig = {
  input: './es/lib/msRest.js',
  external: [],
  output: {
    file: "./dist/msRest.browser.js",
    format: "umd",
    name: "msRest",
    sourcemap: true,
    banner
  },
  plugins: [
    alias({
      "./defaultHttpClient": "./defaultHttpClient.browser",
      "./msRestUserAgentPolicy": "./msRestUserAgentPolicy.browser"
    }),
    nodeResolve({ module: true, browser: true }),
    commonjs(),
    sourcemaps(),
    visualizer({ filename: "dist/browser-stats.html", sourcemap: true })
  ]
};

export default [nodeConfig, browserConfig];
