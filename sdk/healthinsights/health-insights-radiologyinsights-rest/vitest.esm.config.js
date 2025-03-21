"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("vitest/config");
var vitest_esm_shared_config_ts_1 = require("../../../vitest.esm.shared.config.ts");
var vitest_config_ts_1 = require("./vitest.config.ts");
exports.default = (0, config_1.mergeConfig)(vitest_config_ts_1.default, vitest_esm_shared_config_ts_1.default);
