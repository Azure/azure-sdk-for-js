import nodeResolve from "rollup-plugin-node-resolve";
import visualizer from "rollup-plugin-visualizer";
import sourcemaps from "rollup-plugin-sourcemaps";

const banner = `/** @license @azure/core-lro
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */`;

/**
 * @type {import('rollup').RollupFileOptions}
 */
const config = {
  input: './es/src/index.js',
  external: ["@azure/core-http"],
  output: {
    file: "./dist/index.js",
    format: "umd",
    name: "Azure.Core.LRO",
    sourcemap: true,
    globals: {
      "@azure/core-http": "Azure.Core.HTTP"
    },
    banner
  },
  plugins: [
    nodeResolve({ mainFields: ['module'] }),
    sourcemaps(),
    visualizer({ filename: "dist/node-stats.html", sourcemap: true })
  ]
}

export default config; 
