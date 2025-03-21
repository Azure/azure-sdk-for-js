"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("vitest/config");
var vitest_shared_config_ts_1 = require("../../../vitest.shared.config.ts");
exports.default = (0, config_1.mergeConfig)(vitest_shared_config_ts_1.default, (0, config_1.defineConfig)({
    test: {
        testTimeout: 1200000,
        hookTimeout: 1200000,
        reporters: ['default', 'junit'],
        outputFile: './test-results/results.xml',
    },
}));
