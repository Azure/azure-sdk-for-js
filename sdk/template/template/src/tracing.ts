// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
//
import { createSpanFunction } from "@azure/core-http";

/**
 * Creates a span using the global tracer.
 *
 * @param name - The name of the operation being performed.
 * @param tracingOptions - The options for the underlying http request.
 *
 * @internal
 */
export const createSpan = createSpanFunction({
  namespace: "Microsoft.Learn",
  packagePrefix: "Azure.Learn.ApiLearn"
});
