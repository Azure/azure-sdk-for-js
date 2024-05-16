// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient } from "@azure/core-tracing";
import { SDK_VERSION } from "./constants";

export const tracingClient = createTracingClient({
  packageName: "@azure/ai-form-recognizer",
  packageVersion: SDK_VERSION,
  namespace: "Microsoft.CognitiveServices",
});
