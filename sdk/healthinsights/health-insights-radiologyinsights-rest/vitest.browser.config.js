"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("vitest/config");
var vitest_browser_shared_config_ts_1 = require("../../../vitest.browser.shared.config.ts");
exports.default = (0, config_1.mergeConfig)(vitest_browser_shared_config_ts_1.default, (0, config_1.defineConfig)({
    test: {
        include: ["dist-test/browser/test/**/*.spec.js"],
        testTimeout: 1200000,
        hookTimeout: 1200000,
    },
}));
