// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTracingClient } from "@azure/core-tracing";
import { SDK_VERSION } from "./constants";

/**
 * Creates a span using the global tracer.
 * @internal
 */
export const tracingClient = createTracingClient({
  packageName: "@azure/storage-file-datalake",
  packageVersion: SDK_VERSION,
  namespace: "Microsoft.Storage",
});
