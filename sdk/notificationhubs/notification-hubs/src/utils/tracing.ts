// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient } from "@azure/core-tracing";
import { SDK_VERSION } from "./constants.js";

/**
 * A tracing client to handle spans.
 * @internal
 */
export const tracingClient = createTracingClient({
  namespace: "Microsoft.NotificationHubs",
  packageName: "@azure/notification-hubs",
  packageVersion: SDK_VERSION,
});
