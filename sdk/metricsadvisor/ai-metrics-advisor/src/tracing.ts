// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTracingClient } from "@azure/core-tracing";
import { SDK_VERSION } from "./constants";

export const tracingClient = createTracingClient({
  namespace: "Microsoft.CognitiveServices",
  packageName: "@azure/ai-metrics-advisor",
  packageVersion: SDK_VERSION,
});
