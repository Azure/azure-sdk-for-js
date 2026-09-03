// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTracingClient } from "@azure/core-tracing";

/**
 * A tracing client to handle spans.
 * @internal
 */
export const tracingClient = createTracingClient({
  namespace: "Microsoft.Messaging.EventGrid",
  packageName: "@azure/event-grid",
  packageVersion: "5.12.2",
});
