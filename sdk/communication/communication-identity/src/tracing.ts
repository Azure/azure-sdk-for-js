// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTracingClient } from "@azure/core-tracing";
import { SDK_VERSION } from "./constants.js";

/** @internal */
export const tracingClient = createTracingClient({
  namespace: "Microsoft.Communication",
  packageName: "@azure/communication-identity",
  packageVersion: SDK_VERSION,
});
