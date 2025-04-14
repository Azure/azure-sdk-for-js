// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTracingClient } from "@azure/core-tracing";

/**
 * Creates a span using the global tracer.
 * @internal
 */
export const tracingClient = createTracingClient({
  packageName: "Azure.Communication",
  namespace: "Microsoft.Communication",
});
