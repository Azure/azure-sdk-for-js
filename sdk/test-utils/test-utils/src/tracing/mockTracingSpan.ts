// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TracingSpan,
  SpanStatus,
  TracingSpanOptions,
  TracingSpanKind,
  TracingSpanContext,
  TracingContext
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
   *
   * @param name - Name of the current span
   * @param spanContext - A unique, serializable identifier for a span {@link TracingSpanContext}
   * @param tracingContext - Existing or parent tracing context
   * @param spanOptions - Options to configure the newly created span {@link TracingSpanOptions}
   */
  constructor(
    name: string,
    spanContext: TracingSpanContext,
    tracingContext?: TracingContext,
    spanOptions?: TracingSpanOptions
  ) {
    this.name = name;
    this.spanKind = spanOptions?.spanKind;
    this.tracingContext = tracingContext;
    this._spanContext = spanContext;
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

  private _spanContext: TracingSpanContext;
  get spanContext() {
    return this._spanContext;
  }
}
