// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient } from "@azure/core-tracing";

/**
 * A tracing client that can be used to manage spans.
 * @internal
 */
export const tracingClient = createTracingClient({
  namespace: "Microsoft.Data.Tables",
  packageName: "@azure/data-tables",
  packageVersion: "13.1.3",
});
