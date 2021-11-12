// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CreateTracingContextOptions, TracingContext } from "./interfaces";

/** @internal */
export const knownContextKeys = {
  Span: Symbol.for("@azure/core-tracing span"),
  Namespace: Symbol.for("@azure/core-tracing namespace"),
  Client: Symbol.for("@azure/core-tracing client"),
  ParentContext: Symbol.for("@azure/core-tracing parent context")
};

/**
 * Creates a new {@link TracingContext} with the given options.
 * @param options - A set of known keys that may be set on the context.
 * @returns A new {@link TracingContext} with the given options.
 */
export function createTracingContext(options: CreateTracingContextOptions = {}): TracingContext {
  const newContextMap = new Map<symbol, unknown>();
  if (options.span) {
    newContextMap.set(knownContextKeys.Span, options.span);
  }
  if (options.client) {
    newContextMap.set(knownContextKeys.Client, options.client);
  }
  if (options.parentContext) {
    newContextMap.set(knownContextKeys.ParentContext, options.parentContext);
  }
  if (options.namespace) {
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
    if (this._contextMap.has(key)) {
      return this._contextMap.get(key);
    }
    const parent = this._contextMap.get(knownContextKeys.ParentContext);
    if (parent instanceof TracingContextImpl) {
      return parent.getValue(key);
    }
    return undefined;
  }

  deleteValue(key: symbol): TracingContext {
    const newContextMap = new Map<symbol, unknown>(this._contextMap);
    newContextMap.delete(key);
    const parent = this._contextMap.get(knownContextKeys.ParentContext);
    if (parent instanceof TracingContextImpl) {
      this._contextMap.set(knownContextKeys.ParentContext, parent.deleteValue(key));
    }
    return new TracingContextImpl(newContextMap);
  }
}
