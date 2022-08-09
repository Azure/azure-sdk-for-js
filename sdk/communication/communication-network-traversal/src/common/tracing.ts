// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient } from "@azure/core-tracing";

export const tracingClient = createTracingClient({
  namespace: "Azure.Communication",
  packageName: "@azure/communication-network-traversal",
  packageVersion: "1.1.0-beta.3",
});
