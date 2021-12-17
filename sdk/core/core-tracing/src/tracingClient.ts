// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TracingClient,
  OperationTracingOptions,
  TracingSpan,
  TracingContext,
  TracingSpanOptions,
  TracingSpanContext,
  TracingClientOptions,
  Instrumenter
} from "./interfaces";
import { getInstrumenter } from "./instrumenter";
import { knownContextKeys } from "./tracingContext";

/** @internal */
export class TracingClientImpl implements TracingClient {
  private _namespace: string;
  private _packageName: string;
  private _packageVersion?: string;

  constructor(options: TracingClientOptions) {
    this._namespace = options.namespace;
    this._packageName = options.packageName;
    this._packageVersion = options.packageVersion;
  }
  startSpan<Options extends { tracingOptions?: OperationTracingOptions }>(
    name: string,
    operationOptions?: Options,
    spanOptions?: TracingSpanOptions
  ): {
    span: TracingSpan;
    tracingContext: TracingContext;
    updatedOptions: Options;
  } {
    const startSpanResult = this.getInstrumenter().startSpan(name, {
      ...spanOptions,
      packageName: this._packageName,
      packageVersion: this._packageVersion,
      tracingContext: operationOptions?.tracingOptions?.tracingContext
    });
    let tracingContext = startSpanResult.tracingContext;
    const span = startSpanResult.span;
    if (!tracingContext.getValue(knownContextKeys.Namespace)) {
      tracingContext = tracingContext.setValue(knownContextKeys.Namespace, this._namespace);
    }
    span.setAttribute("az.namespace", tracingContext.getValue(knownContextKeys.Namespace));
    const updatedOptions = {
      ...operationOptions,
      tracingOptions: {
        tracingContext: tracingContext
      }
    } as Options;
    return {
      span,
      tracingContext: tracingContext,
      updatedOptions
    };
  }
  async withSpan<
    Options extends { tracingOptions?: { tracingContext?: TracingContext } },
    Callback extends (
      updatedOptions: Options,
      span: Omit<TracingSpan, "end">
    ) => ReturnType<Callback>
  >(
    name: string,
    operationOptions: Options,
    callback: Callback,
    spanOptions?: TracingSpanOptions,
    callbackThis?: ThisParameterType<Callback>
  ): Promise<ReturnType<Callback>> {
    const { span, tracingContext, updatedOptions } = this.startSpan(
      name,
      operationOptions,
      spanOptions
    );
    try {
      const result = await this.withContext(
        tracingContext,
        () => Promise.resolve(callback.call(callbackThis, updatedOptions, span)),
        callbackThis
      );
      span.setStatus({ status: "success" });
      return result;
    } catch (err) {
      span.setStatus({ status: "error", error: err });
      throw err;
    } finally {
      span.end();
    }
  }
  withContext<
    CallbackArgs extends unknown[],
    Callback extends (...args: CallbackArgs) => ReturnType<Callback>
  >(
    context: TracingContext,
    callback: Callback,
    callbackThis?: ThisParameterType<Callback>,
    ...callbackArgs: CallbackArgs
  ): ReturnType<Callback> {
    return this.getInstrumenter().withContext(context, callback, callbackThis, ...callbackArgs);
  }
  /**
   * Parses a traceparent header value into a span identifier.
   *
   * @param traceparentHeader - The traceparent header to parse.
   * @returns An implementation-specific identifier for the span.
   */
  parseTraceparentHeader(traceparentHeader: string): TracingSpanContext | undefined {
    return this.getInstrumenter().parseTraceparentHeader(traceparentHeader);
  }

  /**
   * Creates a set of request headers to propagate tracing information to a backend.
   *
   * @param spanContext - The span identifier to serialize.
   * @returns The set of headers to add to a request.
   */
  createRequestHeaders(spanContext: TracingSpanContext): Record<string, string> {
    return this.getInstrumenter().createRequestHeaders(spanContext);
  }

  private _instrumenter?: Instrumenter;
  private getInstrumenter(): Instrumenter {
    if (!this._instrumenter) {
      this._instrumenter = getInstrumenter();
    }
    return this._instrumenter;
  }
}

/**
 * Creates a new tracing client.
 *
 * @param options - Options used to configure the tracing client.
 * @returns - An instance of {@link TracingClient}.
 */
export function createTracingClient(options: TracingClientOptions): TracingClient {
  return new TracingClientImpl(options);
}
