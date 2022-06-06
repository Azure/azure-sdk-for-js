// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient } from "@azure/core-tracing";

/**
 * A tracing client to handle spans.
 * @internal
 */
export const tracingClient = createTracingClient({
  namespace: "Microsoft.NotificationHubs",
  packageName: "@azure/notification-hubs",
  packageVersion: "1.0.0",
});
