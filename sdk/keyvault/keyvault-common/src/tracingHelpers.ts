// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Note that due to the keyvault common sharing of code all keyvault packages should be updated in lock-step
// in our monorepo. This should not impact versioning outside since it all gets sourced anyway
import { Span } from "@azure/core-tracing";
import { OperationOptions } from "@azure/core-http";

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
    cb: (options: TOptions, span: Span) => Promise<TReturn>
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
export function createTraceFunction(): TracedFunction {
  return async function(_operationName, options, cb) {
    return await cb(options, {} as Span);
  };
}
