// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TracingSpan,
  SpanStatus,
  TracingSpanOptions,
  TracingSpanKind,
  TracingContext,
  TracingSpanContext
} from "@azure/core-tracing";

/**
 * Represents an implementation of a mock tracing span {@link TracingSpan} used for tests
 */
export class TestTracingSpan implements TracingSpan {
  /**
   * Name of the current span
   */
  name: string;
  /**
   * Kind of the current span {@link TracingSpanKind}
   */
  spanKind: TracingSpanKind | undefined;
  /**
   * Existing or parent tracing context
   */
  tracingContext: TracingContext | undefined;
  /**
   * A unique, serializable identifier for a span {@link TracingSpanContext}
   */
  private _spanContext: TracingSpanContext;

  /**
   *
   * @param name - Name of the current span
   * @param tracingContext - Existing or parent tracing context
   * @param spanOptions - Options to configure the newly created span {@link TracingSpanOptions}
   * @param spanContext - A unique, serializable identifier for a span {@link TracingSpanContext}
   */
  constructor(
    name: string,
    tracingContext?: TracingContext,
    spanOptions?: TracingSpanOptions,
    spanContext?: TracingSpanContext
  ) {
    this.name = name;
    this.spanKind = spanOptions?.spanKind;
    this.tracingContext = tracingContext;
    this._spanContext = spanContext!;
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

  parentSpan(): TestTracingSpan | undefined {
    return this.tracingContext?.getValue(Symbol.for("span")) as TestTracingSpan;
  }
  get spanContext() {
    return this._spanContext;
  }
}
