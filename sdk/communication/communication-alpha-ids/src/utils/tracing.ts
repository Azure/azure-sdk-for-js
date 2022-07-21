// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient } from "@azure/core-tracing";
import { SDK_VERSION } from "./constants";

/**
 * @internal
 */
export const tracingClient = createTracingClient({
  packageName: "Azure.Communication",
  namespace: "Microsoft.Communication",
  packageVersion: SDK_VERSION,
});
