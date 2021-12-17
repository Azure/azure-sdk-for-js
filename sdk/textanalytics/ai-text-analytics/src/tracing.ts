// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient } from "@azure/core-tracing";

export const tracingClient = createTracingClient({
  namespace: "Microsoft.CognitiveServices",
  packageName: "@azure/ai-text-analytics"
});
