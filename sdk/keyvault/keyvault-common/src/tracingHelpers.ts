// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";
import { createTracingClient, TracingSpan } from "@azure/core-tracing";

/**
 * An interface representing a function that is traced.
 *
 * A traced function will automatically create and close tracing '
 * spans as needed and will handle setting the status / errors as a
 * result of calling the underlying callback.
 *
 * use {@link createTraceFunction} to add tracing to a block of code.
 *
 * @internal
 */
export interface TracedFunction {
  <TOptions extends OperationOptions, TReturn>(
    operationName: string,
    options: TOptions,
    cb: (options: TOptions, span: Omit<TracingSpan, "end">) => Promise<TReturn>
  ): Promise<TReturn>;
}

/**
 * Returns a function that can be used for tracing options.
 *
 * @param prefix - The prefix to use, likely the name of the class / client.
 *
 * @example const withTrace = createTraceFunction("Azure.KeyVault.Certificates.CertificateClient")
 *
 * @internal
 */
export function createTraceFunction(_prefix: string): TracedFunction {
  const tracingClient = createTracingClient({
    namespace: "Microsoft.KeyVault",
    packageName: "@azure/keyvault-common"
  });

  return async function(operationName, options, cb) {
    const { updatedOptions, span } = tracingClient.startSpan(operationName, options);

    try {
      // NOTE: we really do need to await on this function here so we can handle any exceptions thrown and properly
      // close the span.
      const result = await cb(updatedOptions, span);

      // otel 0.16+ needs this or else the code ends up being set as UNSET
      span.setStatus({ status: "success" });
      return result;
    } catch (err) {
      span.setStatus({ status: "error", error: err });
      throw err;
    } finally {
      span.end();
    }
  };
}
