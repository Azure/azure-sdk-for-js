// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
//
import { createSpanFunction } from "@azure/core-tracing";

/**
 * Creates a span using the global tracer.
 *
 * @param name - The name of the operation being performed.
 * @param tracingOptions - The options for the underlying http request.
 *
 * @internal
 */
export const createSpan = createSpanFunction({
  namespace: "Azure.Security.Attestation",
  packagePrefix: "Azure.Security.Attestation",
});
