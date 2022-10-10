// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SDK_VERSION } from "../constants";
import { createTracingClient } from "@azure/core-tracing";

/**
 * Creates a span using the global tracer.
 * @internal
 */
export const tracingClient = createTracingClient({
  namespace: "Microsoft.AAD",
  packageName: "@azure/identity",
  packageVersion: SDK_VERSION,
});
