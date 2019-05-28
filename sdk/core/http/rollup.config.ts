/// <reference path=".typings/rollup-plugin-alias.d.ts" />
/// <reference path=".typings/rollup-plugin-commonjs.d.ts" />
/// <reference path=".typings/rollup-plugin-json.d.ts" />
/// <reference path=".typings/rollup-plugin-node-resolve.d.ts" />
/// <reference path=".typings/rollup-plugin-sourcemaps.d.ts" />
/// <reference path=".typings/rollup-plugin-visualizer.d.ts" />

import alias from "rollup-plugin-alias";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import nodeResolve from "rollup-plugin-node-resolve";
import sourcemaps from "rollup-plugin-sourcemaps";
import visualizer from "rollup-plugin-visualizer";

const banner = `/** @license @azure/core-http
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License. See License.txt and ThirdPartyNotices.txt in the project root for license information.
  */`;

/**
 * @type {import('rollup').RollupFileOptions}
 */
const nodeConfig = {
  input: "./es/lib/coreHttp.js",
  external: [
    "axios",
    "form-data",
    "os",
    "stream",
    "tough-cookie",
    "tslib",
    "tunnel",
    "uuid/v4",
    "xml2js",
  ],
  output: {
    file: "./dist/coreHttp.node.js",
    format: "cjs",
    sourcemap: true,
    banner
  },
  plugins: [
    nodeResolve({
      mainFields: ['module']
    }),
    commonjs(),
    sourcemaps(),
    json(),
    visualizer({
      filename: "dist/node-stats.html",
      sourcemap: true
    })
  ]
};

/**
 * @type {import('rollup').RollupFileOptions}
 */
const browserConfig = {
  input: "./es/lib/coreHttp.js",
  external: [],
  output: {
    file: "./dist/coreHttp.browser.js",
    format: "umd",
    name: "coreHttp",
    sourcemap: true,
    banner
  },
  plugins: [
    alias({
      "./defaultHttpClient": "./defaultHttpClient.browser",
      "./policies/msRestUserAgentPolicy": "./policies/msRestUserAgentPolicy.browser",
      "./policies/proxyPolicy": "./policies/proxyPolicy.browser",
      "./util/xml": "./util/xml.browser",
      "./util/base64": "./util/base64.browser",
    }),
    nodeResolve({
      mainFields: ['module'],
      browser: true
    }),
    commonjs(),
    sourcemaps(),
    visualizer({
      filename: "dist/browser-stats.html",
      sourcemap: true
    })
  ]
};

export default [nodeConfig, browserConfig];
