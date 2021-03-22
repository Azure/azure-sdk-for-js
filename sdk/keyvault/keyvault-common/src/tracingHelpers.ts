// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Span, CanonicalCode } from "@opentelemetry/api";

import { RestError, OperationOptions } from "@azure/core-http";
import { createSpanFunction } from "@azure/core-tracing";

/** @internal */
export const createSpan = createSpanFunction({
  namespace: "Microsoft.KeyVault",
  packagePrefix: "Azure.KeyVault.Keys" // todo: this should be configurable
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
export async function withTrace<TOptions extends OperationOptions, TReturn>(
  operationName: string,
  options: TOptions,
  fn: (options: TOptions, span: Span) => Promise<TReturn>,
  createSpanFn = createSpan
): Promise<TReturn> {
  const { updatedOptions, span } = createSpanFn(operationName, options);

  try {
    // NOTE: we really do need to await on this function here so we can handle any exceptions thrown and properly
    // close the span.
    const result = await fn(updatedOptions, span);

    // otel 0.16+ needs this or else the code ends up being set as UNSET
    span.setStatus({
      code: CanonicalCode.OK
    });
    return result;
  } catch (err) {
    span.setStatus({
      code: CanonicalCode.INTERNAL, // TODO: StatusCode.ERROR in otel 0.16+
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
