// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient } from "@azure/core-tracing";

/**
 * Creates a tracing client using the global tracer.
 * @internal
 */
export const tracingClient = createTracingClient({
  namespace: "Microsoft.Search",
  packageName: "Azure.Search",
});

export const createSpan = tracingClient.startSpan;
