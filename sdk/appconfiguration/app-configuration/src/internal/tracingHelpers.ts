// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Span, StatusCode } from "@opentelemetry/api";

import { RestError, OperationOptions } from "@azure/core-http";
import { createSpanFunctionForOperationOptions } from "@azure/core-tracing";
import { AppConfigurationClient } from "../appConfigurationClient";

/** @internal */
export const createSpan = createSpanFunctionForOperationOptions({
  namespace: "Microsoft.AppConfiguration",
  packagePrefix: "Azure.Data.AppConfiguration"
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
  const { updatedOptions, span } = createSpanFn(
    operationName,
    options,
    options.tracingOptions?.context
  );

  try {
    // NOTE: we really do need to await on this function here so we can handle any exceptions thrown and properly
    // close the span.
    return await fn(updatedOptions, span);
  } catch (err) {
    span.setStatus({
      code: StatusCode.ERROR,
      message: err.message
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
