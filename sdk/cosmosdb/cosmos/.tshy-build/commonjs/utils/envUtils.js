"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnosticLevelFromEnv = void 0;
const tslib_1 = require("tslib");
const node_process_1 = tslib_1.__importDefault(require("node:process"));
const constants_js_1 = require("../common/constants.js");
exports.diagnosticLevelFromEnv = node_process_1.default.env[constants_js_1.Constants.CosmosDbDiagnosticLevelEnvVarName];
//# sourceMappingURL=envUtils.js.map