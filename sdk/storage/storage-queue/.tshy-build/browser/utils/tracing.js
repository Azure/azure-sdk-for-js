// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createTracingClient } from "@azure/core-tracing";
import { SDK_VERSION } from "./constants.js";
/**
 * Creates a span using the global tracer.
 * @internal
 */
export const tracingClient = createTracingClient({
    packageName: "@azure/storage-queue",
    packageVersion: SDK_VERSION,
    namespace: "Microsoft.Storage",
});
//# sourceMappingURL=tracing.js.map