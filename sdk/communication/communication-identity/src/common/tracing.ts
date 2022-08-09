// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient } from "@azure/core-tracing";

export const tracingClient = createTracingClient({
  namespace: "Azure.Communication",
  packageName: "@azure/communication-identity",
  packageVersion: "1.1.2",
});
