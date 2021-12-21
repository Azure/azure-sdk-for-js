// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createSpanFunction, SpanStatusCode, Span } from "@azure/core-tracing";
import { OperationOptions } from "@azure/core-client";

/**
 * Creates a span using the global tracer.
 * @internal
 */
export const createSpan = createSpanFunction({
  packagePrefix: "",
  namespace: "Microsoft.AAD",
});

/**
 * From: https://github.com/Azure/azure-sdk-for-js/blob/46139daa3317a0d12e8b55b02b9d9cdf1b2e762a/sdk/appconfiguration/app-configuration/src/internal/tracingHelpers.ts
 * Traces an operation and properly handles reporting start, end and errors for a given span
 *
 * @param operationName - Name of a method in the TClient type
 * @param options - An options class, typically derived from \@azure/core-rest-pipeline/RequestOptionsBase
 * @param fn - The function to call with an options class that properly propagates the span context
 *
 * @internal
 */
export async function trace<ReturnT>(
  operationName: string,
  options: OperationOptions,
  fn: (options: OperationOptions, span: Span) => Promise<ReturnT>,
  createSpanFn = createSpan
): Promise<ReturnT> {
  const { updatedOptions, span } = createSpanFn(operationName, options);

  try {
    // NOTE: we really do need to await on this function here so we can handle any exceptions thrown and properly
    // close the span.
    const result = await fn(updatedOptions, span);

    // otel 0.16+ needs this or else the code ends up being set as UNSET
    span.setStatus({
      code: SpanStatusCode.OK,
    });
    return result;
  } catch (err) {
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: err.message,
    });
    throw err;
  } finally {
    span.end();
  }
}
