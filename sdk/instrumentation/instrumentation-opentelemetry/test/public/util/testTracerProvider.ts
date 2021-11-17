import { TracerProvider, trace } from "@opentelemetry/api";
import { TestTracer } from "./testTracer";

export class TestTracerProvider implements TracerProvider {
  private tracer = new TestTracer();

  getTracer(): TestTracer {
    return this.tracer;
  }

  register() {
    trace.setGlobalTracerProvider(this);
  }

  disable() {
    trace.disable();
  }

  setTracer(tracer: TestTracer) {
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
