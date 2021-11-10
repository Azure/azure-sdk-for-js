// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TracingClient,
  Tracer,
  TracingClientOptions,
  OperationTracingOptions,
  TracingSpan,
  TracingContext,
  TracingSpanOptions
} from "./interfaces";
import { tracerImplementation } from "./tracer";
import { knownContextKeys } from "./tracingContext";

/** @internal */
export class TracingClientImpl implements TracingClient {
  private _namespace: string;
  private _tracer: Tracer;
  private _packageInformation: { name: string; version?: string | undefined };

  constructor(options?: TracingClientOptions) {
    this._namespace = options?.namespace || "";
    this._tracer = options?.tracer || tracerImplementation;
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
    let { span, tracingContext } = this._tracer.startSpan(name, {
      ...spanOptions,
      tracingContext: operationOptions?.tracingOptions?.tracingContext,
      packageInformation: this._packageInformation
    });
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
    // TODO: it's nice to return the context so we don't have to do null assertions later
    // but it's also duplicating data - is it the same context? can they drift? Which one do I use?
    return {
      span,
      tracingContext: tracingContext,
      updatedOptions
    };
  }
  async withTrace<
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
    return this._tracer.withContext(context, callback, callbackThis, ...callbackArgs);
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
