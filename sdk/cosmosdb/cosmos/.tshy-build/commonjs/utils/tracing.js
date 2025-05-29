"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.tracingClient = void 0;
const core_tracing_1 = require("@azure/core-tracing");
const constants_js_1 = require("../common/constants.js");
/**
 * Global tracing client for this package.
 *
 * @internal
 */
exports.tracingClient = (0, core_tracing_1.createTracingClient)({
    namespace: constants_js_1.Constants.AzureNamespace,
    packageName: constants_js_1.Constants.AzurePackageName,
    packageVersion: constants_js_1.Constants.SDKVersion,
});
//# sourceMappingURL=tracing.js.map