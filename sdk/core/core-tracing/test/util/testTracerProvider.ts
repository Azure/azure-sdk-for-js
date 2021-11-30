// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Tracer, TracerProvider, trace } from "@opentelemetry/api";
import { TestTracer } from "./testTracer";

export class TestTracerProvider implements TracerProvider {
  private tracerCache: Map<string, TestTracer> = new Map();

  getTracer(name: string, version?: string): Tracer {
    const tracerKey = `${name}${version}`;
    if (!this.tracerCache.has(tracerKey)) {
      this.tracerCache.set(tracerKey, new TestTracer(name, version));
    }
    return this.tracerCache.get(tracerKey)!;
  }

  register(): boolean {
    return trace.setGlobalTracerProvider(this);
  }

  disable(): void {
    trace.disable();
  }
}
