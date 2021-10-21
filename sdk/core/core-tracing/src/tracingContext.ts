import { CreateTracingContextOptions, TracingContext } from "./interfaces";

/** @internal */
export const knownContextKeys = {
  Span: Symbol.for("@azure/core-tracing span"),
  Namespace: Symbol.for("@azure/core-tracing namespace"),
  Client: Symbol.for("@azure/core-tracing client"),
  ProviderContext: Symbol.for("@azure/core-tracing provider context")
};

export function createTracingContext(options: CreateTracingContextOptions = {}): TracingContext {
  // TODO: untested
  if (options.providerContext) {
    let newContext = options.providerContext;
    newContext = newContext.setValue(knownContextKeys.ProviderContext, options.providerContext);
    if (options?.span) {
      newContext = newContext.setValue(knownContextKeys.Span, options.span);
    }

    if (options?.client) {
      newContext = newContext.setValue(knownContextKeys.Client, options.client);
    }

    if (options?.namespace) {
      newContext = newContext.setValue(knownContextKeys.Namespace, options.namespace);
    }
    return newContext;
  }

  const newContextMap = new Map<symbol, unknown>();
  if (options?.span) {
    newContextMap.set(knownContextKeys.Span, options.span);
  }

  if (options?.client) {
    newContextMap.set(knownContextKeys.Client, options.client);
  }

  if (options?.namespace) {
    newContextMap.set(knownContextKeys.Namespace, options.namespace);
  }

  return new TracingContextImpl(newContextMap);
}

/** @internal */
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
