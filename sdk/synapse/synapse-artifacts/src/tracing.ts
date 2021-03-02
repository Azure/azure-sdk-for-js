// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { createSpanFunction } from "@azure/core-tracing";

export const createSpan = createSpanFunction({
  namespace: "Azure.Synapse.Artifacts",
  packagePrefix: "Microsoft.Synapse"
});
