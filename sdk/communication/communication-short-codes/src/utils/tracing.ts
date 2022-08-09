// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient } from "@azure/core-tracing";

export const tracingClient = createTracingClient({
  namespace: "Azure.Communication",
  packageName: "@azure/communication-short-codes",
  packageVersion: "1.0.0-beta.5",
});
