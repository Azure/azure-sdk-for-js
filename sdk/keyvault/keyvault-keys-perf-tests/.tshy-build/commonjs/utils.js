"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyVaultUri = exports.credential = void 0;
const identity_1 = require("@azure/identity");
const test_perf_1 = require("@azure-tools/test-perf");
require("dotenv/config");
exports.credential = new identity_1.ClientSecretCredential((0, test_perf_1.getEnvVar)("AZURE_TENANT_ID"), (0, test_perf_1.getEnvVar)("AZURE_CLIENT_ID"), (0, test_perf_1.getEnvVar)("AZURE_CLIENT_SECRET"));
exports.keyVaultUri = (0, test_perf_1.getEnvVar)("KEYVAULT_URI");
//# sourceMappingURL=utils.js.map