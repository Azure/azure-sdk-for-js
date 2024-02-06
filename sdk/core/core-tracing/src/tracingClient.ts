// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OperationTracingOptions,
  OptionsWithTracingContext,
  Resolved,
  TracingClient,
  TracingClientOptions,
  TracingContext,
  TracingSpan,
  TracingSpanOptions,
} from "./interfaces";
import { getInstrumenter } from "./instrumenter";
import { knownContextKeys } from "./tracingContext";

/**
 * Creates a new tracing client.
 *
 * @param options - Options used to configure the tracing client.
 * @returns - An instance of {@link TracingClient}.
 */
export function createTracingClient(options: TracingClientOptions): TracingClient {
  const { namespace, packageName, packageVersion } = options;

  function startSpan<Options extends { tracingOptions?: OperationTracingOptions }>(
    name: string,
    operationOptions?: Options,
    spanOptions?: TracingSpanOptions
  ): {
    span: TracingSpan;
    updatedOptions: OptionsWithTracingContext<Options>;
  } {
    const startSpanResult = getInstrumenter().startSpan(name, {
      ...spanOptions,
      packageName: packageName,
      packageVersion: packageVersion,
      tracingContext: operationOptions?.tracingOptions?.tracingContext,
    });
    let tracingContext = startSpanResult.tracingContext;
    const span = startSpanResult.span;
    if (!tracingContext.getValue(knownContextKeys.namespace)) {
      tracingContext = tracingContext.setValue(knownContextKeys.namespace, namespace);
    }
    span.setAttribute("az.namespace", tracingContext.getValue(knownContextKeys.namespace));
    const updatedOptions: OptionsWithTracingContext<Options> = Object.assign({}, operationOptions, {
      tracingOptions: { ...operationOptions?.tracingOptions, tracingContext },
    });

    return {
      span,
      updatedOptions,
    };
  }

  async function withSpan<
    Options extends { tracingOptions?: OperationTracingOptions },
    Callback extends (
      updatedOptions: Options,
      span: Omit<TracingSpan, "end">
    ) => ReturnType<Callback>
  >(
    name: string,
    operationOptions: Options,
    callback: Callback,
    spanOptions?: TracingSpanOptions
  ): Promise<Resolved<ReturnType<Callback>>> {
    const { span, updatedOptions } = startSpan(name, operationOptions, spanOptions);
    try {
      const result = await withContext(updatedOptions.tracingOptions.tracingContext, () =>
        Promise.resolve(callback(updatedOptions, span))
      );
      span.setStatus({ status: "success" });
      return result as ReturnType<typeof withSpan>;
    } catch (err: any) {
      span.setStatus({ status: "error", error: err });
      throw err;
    } finally {
      span.end();
    }
  }

  function withContext<
    CallbackArgs extends unknown[],
    Callback extends (...args: CallbackArgs) => ReturnType<Callback>
  >(
    context: TracingContext,
    callback: Callback,
    ...callbackArgs: CallbackArgs
  ): ReturnType<Callback> {
    return getInstrumenter().withContext(context, callback, ...callbackArgs);
  }

  /**
   * Parses a traceparent header value into a span identifier.
   *
   * @param traceparentHeader - The traceparent header to parse.
   * @returns An implementation-specific identifier for the span.
   */
  function parseTraceparentHeader(traceparentHeader: string): TracingContext | undefined {
    return getInstrumenter().parseTraceparentHeader(traceparentHeader);
  }

  /**
   * Creates a set of request headers to propagate tracing information to a backend.
   *
   * @param tracingContext - The context containing the span to serialize.
   * @returns The set of headers to add to a request.
   */
  function createRequestHeaders(tracingContext?: TracingContext): Record<string, string> {
    return getInstrumenter().createRequestHeaders(tracingContext);
  }

  return {
    startSpan,
    withSpan,
    withContext,
    parseTraceparentHeader,
    createRequestHeaders,
  };
}
