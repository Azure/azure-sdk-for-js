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
  let context: TracingContext = new TracingContextImpl(options.parentContext);
  if (options.span) {
    context = context.setValue(knownContextKeys.Span, options.span);
  }
  if (options.client) {
    context = context.setValue(knownContextKeys.Client, options.client);
  }
  if (options.namespace) {
    context = context.setValue(knownContextKeys.Namespace, options.namespace);
  }
  return context;
}

/** @internal */
export class TracingContextImpl implements TracingContext {
  private _contextMap: Map<symbol, unknown>;
  constructor(initialContext?: TracingContext) {
    this._contextMap =
      initialContext instanceof TracingContextImpl
        ? new Map<symbol, unknown>(initialContext._contextMap)
        : new Map();
  }

  setValue(key: symbol, value: unknown): TracingContext {
    const newContext = new TracingContextImpl(this);
    newContext._contextMap.set(key, value);
    return newContext;
  }

  getValue(key: symbol): unknown {
    return this._contextMap.get(key);
  }

  deleteValue(key: symbol): TracingContext {
    const newContext = new TracingContextImpl(this);
    newContext._contextMap.delete(key);
    return newContext;
  }
}
