import { TracerProvider, trace } from "@opentelemetry/api";
import { TestTracer } from "./testTracer";

// This must be the same as the default tracer name supplied from @azure/core-tracing.
const TRACER_NAME = "azure/core-tracing";

export class TestTracerProvider implements TracerProvider {
  private tracerCache: Map<string, TestTracer> = new Map();

  getTracer(name: string, _version?: string): TestTracer {
    if (!this.tracerCache.has(name)) {
      this.tracerCache.set(name, new TestTracer(name, name));
    }
    return this.tracerCache.get(name)!;
  }

  register() {
    trace.setGlobalTracerProvider(this);
  }

  disable() {
    trace.disable();
  }

  setTracer(tracer: TestTracer) {
    this.tracerCache.set(TRACER_NAME, tracer);
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
  return tracerProvider.getTracer(TRACER_NAME);
}

export function resetTracer(): void {
  tracerProvider?.disable();
}
