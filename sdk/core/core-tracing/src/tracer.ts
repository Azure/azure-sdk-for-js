import { createTracingContext } from ".";

export interface TracerCreateSpanOptions {
  context?: TracingContext;
}
export interface Tracer {
  startSpan(
    name: string,
    options: TracerCreateSpanOptions
  ): { span: TracingSpan; tracingContext: TracingContext };
  // withTrace<
  //   Callback extends (
  //     context: TracingContext,
  //     span: Omit<TracingSpan, "end">
  //   ) => ReturnType<Callback>
  // >(
  //   name: string,
  //   callback: Callback,
  //   options: TracingSpanOptions,
  //   callbackThis?: ThisParameterType<Callback>
  // ): Promise<ReturnType<Callback>>;
  withContext<Callback extends (args: Parameters<Callback>) => ReturnType<Callback>>(
    callback: Callback,
    options: TracerCreateSpanOptions,
    callbackThis?: ThisParameterType<Callback>,
    ...callbackArgs: Parameters<Callback>
  ): ReturnType<Callback>;
}

export type SpanStatus =
  | {
      status: "success";
    }
  | {
      status: "error";
      error: Error | string;
    };

export interface TracingSpan {
  setStatus(status: SpanStatus): void;
  setAttribute(name: string, value: unknown): void;
  end(): void;
  unwrap(): unknown;
}

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
export class NoOpSpan implements TracingSpan {
  setStatus(): void {}
  setAttribute(): void {}
  end(): void {}
  unwrap(): unknown {
    return undefined;
  }
}

export interface TracingContext {
  setValue(key: symbol, value: unknown): TracingContext;
  getValue(key: symbol): unknown;
  deleteValue(key: symbol): TracingContext;
}

export class TracingContextImpl implements TracingContext {
  private _contextMap: Map<symbol, unknown>;
  constructor(initialContext: Map<symbol, unknown>) {
    this._contextMap = new Map<symbol, unknown>(initialContext);
  }

  setValue(key: symbol, value: unknown): TracingContext {
    const newContextMap = new Map<symbol, unknown>(this._contextMap);
    newContextMap.set(key, value);
    return new TracingContextImpl(newContextMap);
  }

  getValue(key: symbol): unknown {
    return this._contextMap.get(key);
  }

  deleteValue(key: symbol): TracingContext {
    const newContextMap = new Map<symbol, unknown>(this._contextMap);
    newContextMap.delete(key);
    return new TracingContextImpl(newContextMap);
  }
}

export let tracerImplementation: Tracer = new NoOpTracer();

export function useTracer(tracer: Tracer): void {
  tracerImplementation = tracer;
}
