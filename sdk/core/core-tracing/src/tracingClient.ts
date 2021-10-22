import {
  TracingClient,
  Tracer,
  TracingClientOptions,
  OperationTracingOptions,
  TracingSpan,
  TracingContext
} from "./interfaces";
import { tracerImplementation } from "./tracer";
import { createTracingContext, knownContextKeys } from "./tracingContext";

/** @internal */
export class TracingClientImpl implements TracingClient {
  private _namespace: string;
  private _tracer: Tracer;
  constructor(options?: TracingClientOptions) {
    this._namespace = options?.namespace || "";
    this._tracer = options?.tracer || tracerImplementation;
  }
  startSpan<Options extends { tracingOptions?: OperationTracingOptions }>(
    name: string,
    options?: Options
  ): { span: TracingSpan; tracingContext: TracingContext; updatedOptions: Options } {
    let { span, tracingContext } = this._tracer.startSpan(name, {
      tracingContext: options?.tracingOptions?.tracingContext
    });
    tracingContext = tracingContext.setValue(knownContextKeys.Namespace, this._namespace);
    span.setAttribute("az.namespace", this._namespace);
    const updatedOptions = {
      ...options,
      tracingOptions: {
        tracingContext
      }
    } as Options;
    // TODO: it's nice to return the context so we don't have to do null assertions later
    // but it's also duplicating data - is it the same context? can they drift? Which one do I use?
    return {
      span,
      tracingContext,
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
    fn: Callback,
    options?: Options,
    callbackThis?: ThisParameterType<Callback>
  ): Promise<ReturnType<Callback>> {
    let { span, tracingContext, updatedOptions } = this.startSpan(name, options);
    try {
      span.setStatus({ status: "success" });
      const result = await this.withContext(
        tracingContext,
        () => Promise.resolve(fn.call(callbackThis, updatedOptions, span)),
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

export function createTracingClient(options?: TracingClientOptions): TracingClient {
  return new TracingClientImpl(options);
}
