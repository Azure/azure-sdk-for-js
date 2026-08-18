// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTracingClient } from "@azure/core-tracing";
import { packageVersion } from "./constants.js";

/** @internal */
export const tracingClient = createTracingClient({
  namespace: "Microsoft.AppConfiguration",
  packageName: "@azure/app-configuration",
  packageVersion,
});
