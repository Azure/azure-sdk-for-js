// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TracingContext, TracingSpan } from "./interfaces";

/** @internal */
export const knownContextKeys = {
  span: Symbol.for("@typespec/ts-http-runtime span"),
  namespace: Symbol.for("@typespec/ts-http-runtime namespace"),
};

/**
 * Creates a new {@link TracingContext} with the given options.
 * @param options - A set of known keys that may be set on the context.
 * @returns A new {@link TracingContext} with the given options.
 *
 * @internal
 */
export function createTracingContext(options: CreateTracingContextOptions = {}): TracingContext {
  let context: TracingContext = new TracingContextImpl(options.parentContext);
  if (options.span) {
    context = context.setValue(knownContextKeys.span, options.span);
  }
  if (options.namespace) {
    context = context.setValue(knownContextKeys.namespace, options.namespace);
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

/**
 * Represents a set of items that can be set when creating a new {@link TracingContext}.
 */
export interface CreateTracingContextOptions {
  /** The {@link parentContext} - the newly created context will contain all the values of the parent context unless overridden. */
  parentContext?: TracingContext;
  /** An initial span to set on the context. */
  span?: TracingSpan;
  /** The namespace to set on any child spans. */
  namespace?: string;
}
