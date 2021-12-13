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

export class TestTracingSpan implements TracingSpan {
  name: string;
  spanKind: TracingSpanKind | undefined;
  /** Parent tracing context or existing */
  tracingContext: TracingContext | undefined;
  private _spanContext: TracingSpanContext;

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
  endCalled: boolean = false;
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
  // TODO: should we rename this?
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
