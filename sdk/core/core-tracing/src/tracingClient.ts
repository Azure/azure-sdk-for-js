import {
  TracingClient,
  Tracer,
  TracingClientOptions,
  OperationTracingOptions,
  TracingSpan,
  TracingContext
} from "./interfaces";
import { tracerImplementation } from "./tracer";
import { knownContextKeys } from "./tracingContext";

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
  ): { span: TracingSpan; updatedOptions: Options } {
    let { span, tracingContext } = this._tracer.startSpan(name, {
      context: options?.tracingOptions?.context
    });
    tracingContext = tracingContext.setValue(knownContextKeys.Namespace, this._namespace);
    span.setAttribute("az.namespace", this._namespace);
    return {
      span,
      updatedOptions: {
        tracingOptions: {
          context: tracingContext
        }
      } as Options
    };
  }
  async withTrace<
    Options extends { tracingOptions?: { context?: TracingContext } },
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
    let { span, updatedOptions } = this.startSpan(name, options);
    try {
      span.setStatus({ status: "success" });
      const result = await this.withContext(
        async () => {
          return await Promise.resolve(fn.call(callbackThis, updatedOptions, span));
        },
        updatedOptions?.tracingOptions || {},
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
  withContext<Callback extends (args: Parameters<Callback>) => ReturnType<Callback>>(
    callback: Callback,
    options: OperationTracingOptions,
    callbackThis?: ThisParameterType<Callback>,
    ...callbackArgs: Parameters<Callback>
  ): ReturnType<Callback> {
    return this._tracer.withContext(callback, options, callbackThis, ...callbackArgs);
  }
}

export function createTracingClient(options?: TracingClientOptions): TracingClient {
  return new TracingClientImpl(options);
}
