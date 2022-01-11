// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TracingSpan,
  SpanStatus,
  TracingSpanOptions,
  TracingSpanKind,
  TracingContext,
} from "@azure/core-tracing";
import { spanKey } from "./mockContext";

/**
 * Represents an implementation of a mock tracing span {@link TracingSpan} used for tests
 */
export class MockTracingSpan implements TracingSpan {
  /**
   * Name of the current span
   */
  name: string;
  /**
   * Kind of the current span {@link TracingSpanKind}
   */
  spanKind?: TracingSpanKind;
  /**
   * Existing or parent tracing context
   */
  tracingContext?: TracingContext;

  /**
   * The generated ID of the span within a given trace
   */
  spanId: string;

  /**
   * The ID of the trace this span belongs to
   */
  traceId: string;

  /**
   *
   * @param name - Name of the current span
   * @param spanContext - A unique, serializable identifier for a span
   * @param tracingContext - Existing or parent tracing context
   * @param spanOptions - Options to configure the newly created span {@link TracingSpanOptions}
   */
  constructor(
    name: string,
    traceId: string,
    spanId: string,
    tracingContext?: TracingContext,
    spanOptions?: TracingSpanOptions
  ) {
    this.name = name;
    this.spanKind = spanOptions?.spanKind;
    this.tracingContext = tracingContext;
    this.traceId = traceId;
    this.spanId = spanId;
  }

  spanStatus?: SpanStatus;
  attributes: Record<string, unknown> = {};
  endCalled = false;
  exception?: string | Error;
  setStatus(status: SpanStatus): void {
    this.spanStatus = status;
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

  parentSpan(): MockTracingSpan | undefined {
    return this.tracingContext?.getValue(spanKey) as MockTracingSpan;
  }
}
