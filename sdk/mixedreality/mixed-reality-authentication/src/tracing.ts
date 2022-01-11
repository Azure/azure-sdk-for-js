// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createSpanFunction } from "@azure/core-tracing";

/**
 * Creates a span using the global tracer.
 * @internal
 */
export const createSpan = createSpanFunction({
  packagePrefix: "Azure.MixedReality",
  // TODO: oddly enough the createSpan here was actually the attribute named
  // 'Microsoft.MixedReality', not 'az.namespace'. Might have been a bug.
  namespace: "Microsoft.MixedReality",
});
