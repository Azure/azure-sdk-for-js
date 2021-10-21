import { Tracer, TracerCreateSpanOptions, TracingSpan, TracingContext } from "./interfaces";
import { createTracingContext } from "./tracingContext";

/** @internal */
export class NoOpTracer implements Tracer {
  startSpan(
    _name?: string,
    options?: TracerCreateSpanOptions
  ): { span: TracingSpan; tracingContext: TracingContext } {
    return {
      span: new NoOpSpan(),
      tracingContext: createTracingContext({ providerContext: options?.context })
    };
  }
  withTrace<
    Callback extends (
      context: TracingContext,
      span: Omit<TracingSpan, "end">
    ) => ReturnType<Callback>
  >(
    _name: string,
    fn: Callback,
    _options: TracerCreateSpanOptions,
    callbackThis?: ThisParameterType<Callback>
  ): Promise<ReturnType<Callback>> {
    const { span, tracingContext } = this.startSpan();
    return Promise.resolve(fn.call(callbackThis, tracingContext, span));
  }
  withContext<Callback extends (args: Parameters<Callback>) => ReturnType<Callback>>(
    callback: Callback,
    _options: TracerCreateSpanOptions,
    callbackThis?: ThisParameterType<Callback>,
    ...callbackArgs: Parameters<Callback>
  ): ReturnType<Callback> {
    return callback.apply(callbackThis, callbackArgs);
  }
}
/** @internal */
export class NoOpSpan implements TracingSpan {
  setStatus(): void {}
  setAttribute(): void {}
  end(): void {}
  unwrap(): unknown {
    return undefined;
  }
}

/** @internal */
export let tracerImplementation: Tracer = new NoOpTracer();

export function useTracer(tracer: Tracer): void {
  tracerImplementation = tracer;
}
