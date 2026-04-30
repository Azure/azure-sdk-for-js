// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTracingClient } from "@azure/core-tracing";
import { SDK_VERSION, PACKAGE_NAME } from "../constants.js";

export const tracingClient = createTracingClient({
  namespace: "Microsoft.CognitiveServices",
  packageName: PACKAGE_NAME,
  packageVersion: SDK_VERSION,
});
