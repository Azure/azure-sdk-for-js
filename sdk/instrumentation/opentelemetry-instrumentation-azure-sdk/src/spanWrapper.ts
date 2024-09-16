// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Span, AttributeValue, SpanStatusCode, SpanAttributes, TimeInput } from "@opentelemetry/api";
import { SpanStatus, TracingSpan } from "@azure/core-tracing";

export class OpenTelemetrySpanWrapper implements TracingSpan {
  private _span: Span;

  constructor(span: Span) {
    this._span = span;
  }

  setStatus(status: SpanStatus): void {
    if (status.status === "error") {
      if (status.error) {
        this._span.setStatus({ code: SpanStatusCode.ERROR, message: status.error.toString() });
        this.recordException(status.error);
      } else {
        this._span.setStatus({ code: SpanStatusCode.ERROR });
      }
    } else if (status.status === "success") {
      this._span.setStatus({ code: SpanStatusCode.OK });
    }
  }

  setAttribute(name: string, value: unknown): void {
    if (value !== null && value !== undefined) {
      this._span.setAttribute(name, value as AttributeValue);
    }
  }

  addEvent(name: string, attributesOrStartTime?: unknown, startTime?: unknown): void {
    this._span.addEvent(name, attributesOrStartTime as SpanAttributes | TimeInput, startTime as TimeInput);
  }

  end(): void {
    this._span.end();
  }

  recordException(exception: string | Error): void {
    this._span.recordException(exception);
  }

  isRecording(): boolean {
    return this._span.isRecording();
  }

  /**
   * Allows getting the wrapped span as needed.
   * @internal
   *
   * @returns The underlying span
   */
  unwrap(): Span {
    return this._span;
  }
}
