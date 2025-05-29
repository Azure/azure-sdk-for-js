"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.tracingClient = void 0;
const core_tracing_1 = require("@azure/core-tracing");
/**
 * Creates a span using the global tracer.
 * @internal
 */
exports.tracingClient = (0, core_tracing_1.createTracingClient)({
    packageName: "Azure.Communication",
    namespace: "Microsoft.Communication",
});
//# sourceMappingURL=tracing.js.map