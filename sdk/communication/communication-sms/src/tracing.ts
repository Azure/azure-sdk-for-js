// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient } from "@azure/core-tracing";

export const tracingClient = createTracingClient({
  namespace: "Azure.Communication",
  packageName: "@azure/communication-sms",
  packageVersion: "1.2.0-beta.2",
});
