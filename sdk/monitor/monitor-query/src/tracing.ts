// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
//
import { createTracingClient } from "@azure/core-tracing";
import { SDK_VERSION } from "./constants";

/**
 * Creates a span using the global tracer.
 *
 * @param name - The name of the operation being performed.
 * @param tracingOptions - The options for the underlying http request.
 *
 * @internal
 */
export const tracingClient = createTracingClient({
  namespace: "Microsoft.Monitor",
  packageName: "@azure/monitor-query",
  packageVersion: SDK_VERSION,
});
