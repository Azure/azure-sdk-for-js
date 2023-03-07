// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient } from "@azure/core-tracing";

export const tracingClient = createTracingClient({
  namespace: "Microsoft.Communication",
  packageName: "@azure/communication-phone-numbers",
  packageVersion: "1.0.0-beta.1",
});
