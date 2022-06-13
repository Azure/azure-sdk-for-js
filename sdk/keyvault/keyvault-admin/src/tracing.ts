// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SDK_VERSION } from "./constants";
import { createTracingClient } from "@azure/core-tracing";

export const tracingClient = createTracingClient({
  namespace: "Microsoft.KeyVault",
  packageName: "@azure/keyvault-admin",
  packageVersion: SDK_VERSION,
});
