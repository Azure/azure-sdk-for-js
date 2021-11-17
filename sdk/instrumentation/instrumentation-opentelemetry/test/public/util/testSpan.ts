// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TimeInput,
  SpanKind,
  SpanStatus,
  SpanContext,
  SpanAttributes,
  SpanStatusCode,
  SpanAttributeValue,
  Span,
  SpanOptions,
  Exception
} from "@opentelemetry/api";

/**
 * A mock span useful for testing.
 */
export class TestSpan implements Span {
  /**
   * The Span's current name
   */
  name: string;

  /**
   * The Span's current status
   */
  status: SpanStatus;

  /**
   * The Span's kind
   */
  kind: SpanKind;

  /**
   * True if end() has been called on the Span
   */
  endCalled: boolean;

  /**
   * The start time of the Span
   */
  readonly startTime: TimeInput;

  /**
   * Known attributes, if any.
   */
  readonly attributes: SpanAttributes;

  private _context: SpanContext;

  /**
   * The exception that was recorded, if any.
   */
  private _exception?: Exception;

  /**
   * Starts a new Span.
   * @param name - The name of the span.
   * @param context - The SpanContext this span belongs to
   * @param kind - The SpanKind of this Span
   * @param startTime - The startTime of the event (defaults to now)
   */
  constructor(name: string, context: SpanContext, options?: SpanOptions) {
    this.name = name;
    this.kind = options?.kind || SpanKind.INTERNAL;
    this.startTime = options?.startTime || Date.now();
    this.attributes = options?.attributes || {};
    this.status = {
      code: SpanStatusCode.UNSET
    };
    this.endCalled = false;
    this._context = context;
  }

  /**
   * Returns the SpanContext associated with this Span.
   */
  spanContext(): SpanContext {
    return this._context;
  }

  /**
   * Marks the end of Span execution.
   * @param _endTime - The time to use as the Span's end time. Defaults to
   * the current time.
   */
  end(_endTime?: number): void {
    this.endCalled = true;
  }

  /**
   * Sets a status on the span. Overrides the default of SpanStatusCode.OK.
   * @param status - The status to set.
   */
  setStatus(status: SpanStatus): this {
    this.status = status;
    return this;
  }

  /**
   * Returns whether this span will be recorded
   */
  isRecording(): boolean {
    return true;
  }

  /**
   * Sets an attribute on the Span
   * @param key - The attribute key
   * @param value - The attribute value
   */
  setAttribute(key: string, value: SpanAttributeValue): this {
    this.attributes[key] = value;
    return this;
  }

  /**
   * Sets attributes on the Span
   * @param attributes - The attributes to add
   */
  setAttributes(attributes: SpanAttributes): this {
    for (const key of Object.keys(attributes)) {
      this.attributes[key] = attributes[key];
    }
    return this;
  }

  addEvent(): this {
    throw new Error("Method not implemented.");
  }
  recordException(exception: Exception): void {
    this._exception = exception;
  }
  updateName(): this {
    throw new Error("Method not implemented.");
  }

  public get exception(): Exception | undefined {
    return this._exception;
  }
}
