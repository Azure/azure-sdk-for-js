// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { NoOpSpan } from "../noop/noOpSpan";
import {
  TimeInput,
  Tracer,
  SpanKind,
  Status,
  SpanContext,
  CanonicalCode
} from "@opentelemetry/types";
import { TestTracer } from "./testTracer";

/**
 * A mock span useful for testing.
 */
export class TestSpan extends NoOpSpan {
  /**
   * The Span's current name
   */
  name: string;

  /**
   * The Span's current status
   */
  status: Status;

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
   * The id of the parent Span, if any.
   */
  readonly parentSpanId?: string;

  private _context: SpanContext;
  private readonly _tracer: Tracer;

  /**
   * Starts a new Span.
   * @param parentTracer The tracer that created this Span
   * @param name The name of the span.
   * @param context The SpanContext this span belongs to
   * @param kind The SpanKind of this Span
   * @param parentSpanId The identifier of the parent Span
   * @param startTime The startTime of the event (defaults to now)
   */
  constructor(
    parentTracer: TestTracer,
    name: string,
    context: SpanContext,
    kind: SpanKind,
    parentSpanId?: string,
    startTime: TimeInput = Date.now()
  ) {
    super();
    this._tracer = parentTracer;
    this.name = name;
    this.kind = kind;
    this.startTime = startTime;
    this.parentSpanId = parentSpanId;
    this.status = {
      code: CanonicalCode.OK
    };
    this.endCalled = false;
    this._context = context;
  }

  /**
   * Returns the Tracer that created this Span
   */
  tracer(): Tracer {
    return this._tracer;
  }

  /**
   * Returns the SpanContext associated with this Span.
   */
  context(): SpanContext {
    return this._context;
  }

  /**
   * Marks the end of Span execution.
   * @param _endTime The time to use as the Span's end time. Defaults to
   * the current time.
   */
  end(_endTime?: number): void {
    this.endCalled = true;
  }

  /**
   * Sets a status on the span. Overrides the default of CanonicalCode.OK.
   * @param status The status to set.
   */
  setStatus(status: Status): this {
    this.status = status;
    return this;
  }

  /**
   * Returns whether this span will be recorded
   */
  isRecording(): boolean {
    return true;
  }
}
