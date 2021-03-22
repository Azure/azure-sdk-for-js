// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Span, CanonicalCode } from "@opentelemetry/api";

import { OperationOptions } from "@azure/core-http";
import { createSpanFunction } from "@azure/core-tracing";

/**
 * Returns a function that can be used for tracing options.
 *
 * @param packagePrefix - The package prefix
 *
 * @internal
 */
export function trace(packagePrefix: string) {
  const createSpan = createSpanFunction({
    namespace: "Microsoft.KeyVault",
    packagePrefix: packagePrefix
  });

  return async function<TOptions extends OperationOptions, TReturn>(
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
  };
}
