// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TracingContext } from "@azure/core-tracing";
export class ContextImpl implements TracingContext {
  private contextMap: Map<symbol, unknown>;

  constructor(parentContext?: TracingContext) {
    if (parentContext && !(parentContext instanceof ContextImpl)) {
      throw new Error("received parent context, but it is not mock context...");
    }
    this.contextMap = new Map(parentContext?.contextMap || new Map());
  }

  setValue(key: symbol, value: unknown): TracingContext {
    const newContext = new ContextImpl(this);
    newContext.contextMap.set(key, value);
    return newContext;
  }
  getValue(key: symbol): unknown {
    return this.contextMap.get(key);
  }
  deleteValue(key: symbol): TracingContext {
    const newContext = new ContextImpl(this);
    newContext.contextMap.delete(key);
    return newContext;
  }
}
