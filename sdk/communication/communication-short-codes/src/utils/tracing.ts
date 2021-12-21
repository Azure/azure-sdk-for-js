// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createSpanFunction } from "@azure/core-tracing";

/**
 * Creates a span using the global tracer.
 * @internal
 * @param name - The name of the operation being performed.
 * @param tracingOptions - The options for the underlying http request.
 */
export const createSpan = createSpanFunction({
  packagePrefix: "Azure.Communication",
  namespace: "Microsoft.Communication",
});
