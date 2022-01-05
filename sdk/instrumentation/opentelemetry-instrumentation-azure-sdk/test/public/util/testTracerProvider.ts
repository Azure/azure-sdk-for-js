// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TracerProvider, trace } from "@opentelemetry/api";
import { TestTracer } from "./testTracer";

export class TestTracerProvider implements TracerProvider {
  private tracer = new TestTracer();

  getTracer(): TestTracer {
    return this.tracer;
  }

  register(): boolean {
    return trace.setGlobalTracerProvider(this);
  }

  disable(): void {
    trace.disable();
  }

  setTracer(tracer: TestTracer): void {
    this.tracer = tracer;
  }
}

let tracerProvider: TestTracerProvider;

export function setTracer(tracer?: TestTracer): TestTracer {
  resetTracer();
  tracerProvider = new TestTracerProvider();
  tracerProvider.register();
  if (tracer) {
    tracerProvider.setTracer(tracer);
  }
  return tracerProvider.getTracer();
}

export function resetTracer(): void {
  tracerProvider?.disable();
}
