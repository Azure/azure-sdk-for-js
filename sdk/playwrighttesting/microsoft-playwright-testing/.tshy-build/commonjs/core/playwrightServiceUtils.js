"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalTeardownPath = exports.globalSetupPath = void 0;
const tslib_1 = require("tslib");
const node_path_1 = tslib_1.__importDefault(require("node:path"));
exports.globalSetupPath = node_path_1.default.join(__dirname, "./global/playwright-service-global-setup.js");
exports.globalTeardownPath = node_path_1.default.join(__dirname, "./global/playwright-service-global-teardown.js");
//# sourceMappingURL=playwrightServiceUtils-cjs.cjs.map