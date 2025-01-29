// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Span } from "@opentelemetry/api";
import { SpanStatusCode } from "@opentelemetry/api";
import type { SpanStatus, TracingSpan, AddEventOptions } from "@azure/core-tracing";
import { isAttributeValue, sanitizeAttributes } from "@opentelemetry/core";
import { logger } from "./logger.js";

export class OpenTelemetrySpanWrapper implements TracingSpan {
  private _span: Span;

  constructor(span: Span) {
    this._span = span;
  }

  setStatus(status: SpanStatus): void {
    if (status.status === "error" && isRecordableError(status.error)) {
      if (status.error) {
        this._span.setStatus({ code: SpanStatusCode.ERROR, message: status.error.toString() });
        this.recordException(status.error);
      } else {
        this._span.setStatus({ code: SpanStatusCode.ERROR });
      }
    } else if (status.status === "success") {
      logger.verbose("Leaving span with status UNSET per OpenTelemetry spec.");
    }
  }

  setAttribute(name: string, value: unknown): void {
    if (value !== null && value !== undefined && isAttributeValue(value)) {
      this._span.setAttribute(name, value);
    }
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

  addEvent(name: string, options: AddEventOptions = {}): void {
    this._span.addEvent(name, sanitizeAttributes(options.attributes), options.startTime);
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

/**
 * Determines if an error should be recorded on the span.
 *
 * By default, all errors will mark the span status as error
 * except for {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304} which is expected
 * when the cached resource is still valid in a conditional request.
 */
function isRecordableError(error: string | Error | undefined): boolean {
  if (error !== null && typeof error === "object" && "statusCode" in error) {
    return error.statusCode !== 304;
  }

  // we do not have enough information to determine if this error is recordable so we assume it is
  return true;
}
