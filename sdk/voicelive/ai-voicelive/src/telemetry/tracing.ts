// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTracingClient } from "@azure/core-tracing";
import { SDK_VERSION } from "../constants.js";

/**
 * @internal
 */
export const tracingClient = createTracingClient({
  namespace: "Microsoft.CognitiveServices",
  packageName: "@azure/ai-voicelive",
  packageVersion: SDK_VERSION,
});
