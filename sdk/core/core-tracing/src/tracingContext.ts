import { CreateTracingContextOptions, TracingContext } from "./interfaces";

/** @internal */
export const knownContextKeys = {
  Span: Symbol.for("@azure/core-tracing span"),
  Namespace: Symbol.for("@azure/core-tracing namespace"),
  Client: Symbol.for("@azure/core-tracing client"),
  ProviderContext: Symbol.for("@azure/core-tracing provider context")
};

export function createTracingContext(options: CreateTracingContextOptions = {}): TracingContext {
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

  if (options?.providerContext) {
    newContextMap.set(knownContextKeys.ProviderContext, options.providerContext);
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
    if (this._contextMap.has(key)) {
      return this._contextMap.get(key);
    } else if (this._contextMap.has(knownContextKeys.ProviderContext)) {
      const parent = this._contextMap.get(knownContextKeys.ProviderContext) as TracingContext;
      return parent.getValue(key);
    } else {
      return undefined;
    }
  }

  deleteValue(key: symbol): TracingContext {
    const newContextMap = new Map<symbol, unknown>(this._contextMap);
    newContextMap.delete(key);
    const parent = this._contextMap.get(knownContextKeys.ProviderContext) as TracingContext;
    if (parent) {
      this._contextMap.set(knownContextKeys.ProviderContext, parent.deleteValue(key));
    }
    return new TracingContextImpl(newContextMap);
  }
}
