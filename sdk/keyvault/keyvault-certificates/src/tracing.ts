// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient } from "@azure/core-tracing";
import { SDK_VERSION } from "./constants";

export const tracingClient = createTracingClient({
  namespace: "Microsoft.KeyVault",
  packageName: "@azure/keyvault-certificates",
  packageVersion: SDK_VERSION,
});
