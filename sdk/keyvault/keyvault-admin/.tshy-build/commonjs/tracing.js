"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.tracingClient = void 0;
const constants_js_1 = require("./constants.js");
const core_tracing_1 = require("@azure/core-tracing");
exports.tracingClient = (0, core_tracing_1.createTracingClient)({
    namespace: "Microsoft.KeyVault",
    packageName: "@azure/keyvault-admin",
    packageVersion: constants_js_1.SDK_VERSION,
});
//# sourceMappingURL=tracing.js.map