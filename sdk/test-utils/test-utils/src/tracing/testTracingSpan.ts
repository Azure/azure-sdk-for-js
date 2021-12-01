import { TracingSpan, SpanStatus } from "@azure/core-tracing";

export class TestTracingSpan implements TracingSpan {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  status?: SpanStatus;
  attributes: Record<string, unknown> = {};
  endCalled: boolean = false;
  exception?: string | Error;
  setStatus(status: SpanStatus): void {
    this.status = status;
  }
  setAttribute(name: string, value: unknown): void {
    this.attributes[name] = value;
  }
  end(): void {
    this.endCalled = true;
  }
  recordException(exception: string | Error): void {
    this.exception = exception;
  }
  isRecording(): boolean {
    return true;
  }
  get spanContext() {
    return {
      spanId: "",
      traceFlags: 0,
      traceId: ""
    };
  }
}
