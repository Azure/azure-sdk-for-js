// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient } from "@azure/core-tracing";
import { SDK_VERSION } from "./constants";

/**
 * Global tracing client used by this package.
 *
 * @internal
 */
export const tracingClient = createTracingClient({
  namespace: "Microsoft.Monitor",
  packageName: "@azure/monitor-query",
  packageVersion: SDK_VERSION,
});
