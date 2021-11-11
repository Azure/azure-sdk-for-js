// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TracingClient,
  Instrumenter,
  TracingClientOptions,
  OperationTracingOptions,
  TracingSpan,
  TracingContext,
  TracingSpanOptions
} from "./interfaces";
import { instrumenterImplementation } from "./instrumenter";
import { knownContextKeys } from "./tracingContext";

/** @internal */
export class TracingClientImpl implements TracingClient {
  private _namespace: string;
  private _instrumenter: Instrumenter;
  private _packageInformation: { name: string; version?: string | undefined };

  constructor(options?: TracingClientOptions) {
    this._namespace = options?.namespace || "";
    this._instrumenter = options?.instrumenter || instrumenterImplementation;
    this._packageInformation = options?.packageInformation || {
      name: "@azure/core-tracing"
    };
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
    const startSpanResult = this._instrumenter.startSpan(name, {
      ...spanOptions,
      tracingContext: operationOptions?.tracingOptions?.tracingContext,
      packageInformation: this._packageInformation
    });
    let tracingContext = startSpanResult.tracingContext;
    const span = startSpanResult.span;
    if (!tracingContext.getValue(knownContextKeys.Namespace)) {
      // Don't stomp on existing namespace...TODO: add test
      tracingContext = tracingContext.setValue(knownContextKeys.Namespace, this._namespace);
      span.setAttribute("az.namespace", this._namespace);
    }
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
    callback: Callback,
    operationOptions?: Options,
    spanOptions?: TracingSpanOptions,
    callbackThis?: ThisParameterType<Callback>
  ): Promise<ReturnType<Callback>> {
    const { span, tracingContext, updatedOptions } = this.startSpan(
      name,
      operationOptions,
      spanOptions
    );
    try {
      span.setStatus({ status: "success" });
      const result = await this.withContext(
        tracingContext,
        () => Promise.resolve(callback.call(callbackThis, updatedOptions, span)),
        callbackThis
      );
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
    return this._instrumenter.withContext(context, callback, callbackThis, ...callbackArgs);
  }
}

/**
 * Creates a new tracing client.
 * @param options - The options to pass to the tracing client.
 * @returns - An instance of {@link TracingClient}.
 */
export function createTracingClient(options?: TracingClientOptions): TracingClient {
  return new TracingClientImpl(options);
}
