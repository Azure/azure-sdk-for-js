// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TracingContext } from "@azure/core-tracing";

/**
 * This is the implementation of the {@link TracingContext} interface
 * Represents a tracing context
 */
export class MockContext implements TracingContext {
  /**
   * Represents a context map for the symbols to record
   */
  private contextMap: Map<symbol, unknown>;

  /**
   * Initializes the context map
   * @param parentContext - If present the context map is initialized to the contextMap of the parentContext
   */
  constructor(parentContext?: TracingContext) {
    if (parentContext && !(parentContext instanceof MockContext)) {
      throw new Error("received parent context, but it is not mock context...");
    }
    this.contextMap = new Map(parentContext?.contextMap || new Map());
  }

  setValue(key: symbol, value: unknown): TracingContext {
    const newContext = new MockContext(this);
    newContext.contextMap.set(key, value);
    return newContext;
  }

  getValue(key: symbol): unknown {
    return this.contextMap.get(key);
  }

  deleteValue(key: symbol): TracingContext {
    const newContext = new MockContext(this);
    newContext.contextMap.delete(key);
    return newContext;
  }
}

export const spanKey = Symbol.for("span");

export function createMockTracingContext(parentContext?: MockContext): TracingContext {
  return new MockContext(parentContext);
}
