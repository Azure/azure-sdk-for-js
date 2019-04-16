// import multi from "rollup-plugin-multi-entry";
// import baseConfig from "./rollup.config";
// import sourcemaps from "rollup-plugin-sourcemaps";
// const [browser] = baseConfig;

// browser.input = ["dist-esm/test/*.js", "dist-esm/test/browser/*.js"];
// browser.output.sourcemap = "inline";
// browser.output.file = "dist-test/index.browser.js";
// browser.plugins.unshift(multi());
// browser.plugins.unshift(sourcemaps());
// browser.context = "null";

// export default [browser];

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as base from "./rollup.base.config";

export default [base.nodeConfig(true), base.browserConfig(true)];
