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

 const banner = `/** @license ms-rest-js
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License. See License.txt and ThirdPartyNotices.txt in the project root for license information.
  */`;

 /**
  * @type {import('rollup').RollupFileOptions}
  */
 const nodeConfig = {
   input: "./es/lib/msRest.js",
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
     file: "./dist/msRest.node.js",
     format: "cjs",
     sourcemap: true,
     banner
   },
   plugins: [
     nodeResolve({
       module: true
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
   input: "./es/lib/msRest.js",
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
       "./msRestUserAgentPolicy": "./msRestUserAgentPolicy.browser",
       "./util/xml": "./util/xml.browser",
       "./util/base64": "./util/base64.browser",
     }),
     nodeResolve({
       module: true,
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
