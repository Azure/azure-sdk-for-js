// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Span, SpanStatusCode } from "@azure/core-tracing";

import { RestError } from "@azure/core-rest-pipeline";
import { createSpanFunction } from "@azure/core-tracing";
import { AppConfigurationClient } from "../appConfigurationClient";
import { OperationOptions } from "@azure/core-client";

/** @internal */
export const createSpan = createSpanFunction({
  namespace: "Microsoft.AppConfiguration",
  packagePrefix: "Azure.Data.AppConfiguration",
});

/**
 * Traces an operation and properly handles reporting start, end and errors for a given span
 *
 * @param operationName - Name of a method in the TClient type
 * @param options - An options class, typically derived from \@azure/core-http/RequestOptionsBase
 * @param fn - The function to call with an options class that properly propagates the span context
 *
 * @internal
 */
export async function trace<ReturnT>(
  operationName: keyof AppConfigurationClient,
  options: OperationOptions,
  fn: (options: OperationOptions, span: Span) => Promise<ReturnT>,
  createSpanFn = createSpan
): Promise<ReturnT> {
  const { updatedOptions, span } = createSpanFn(operationName, options);

  try {
    // NOTE: we really do need to await on this function here so we can handle any exceptions thrown and properly
    // close the span.
    const result = await fn(updatedOptions, span);

    span.setStatus({
      code: SpanStatusCode.OK,
    });
    return result;
  } catch (err) {
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: (err as { message: string }).message,
    });
    throw err;
  } finally {
    span.end();
  }
}

/** @internal */
export function isRestError(err: Error): err is RestError {
  return err instanceof RestError;
}
