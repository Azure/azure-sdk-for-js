// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient } from "@azure/core-tracing";

/**
 * A tracing client to handle spans.
 * @internal
 */
export const tracingClient = createTracingClient({
  namespace: "Microsoft.Messaging.EventGrid",
  packageName: "@azure/event-grid",
  packageVersion: "4.10.0-beta.2",
});
