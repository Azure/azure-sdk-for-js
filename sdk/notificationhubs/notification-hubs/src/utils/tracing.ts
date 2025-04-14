// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SDK_VERSION } from "./constants.js";
import { createTracingClient } from "@azure/core-tracing";

/**
 * A tracing client to handle spans.
 * @internal
 */
export const tracingClient = createTracingClient({
  namespace: "Microsoft.NotificationHubs",
  packageName: "@azure/notification-hubs",
  packageVersion: SDK_VERSION,
});
