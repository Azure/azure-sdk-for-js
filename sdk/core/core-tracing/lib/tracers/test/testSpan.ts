// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { NoOpSpan } from "../noop/noOpSpan";
import { SpanOptions } from "../../interfaces/SpanOptions";
import { Status, CanonicalCode } from "../../interfaces/status";
import { SpanContext } from "../../interfaces/span_context";

/**
 * A mock span useful for testing.
 */
export class TestSpan extends NoOpSpan {

  /**
   * The Span's current name
   */
  public name: string;
  /**
   * The SpanOptions used to create the Span
   */
  public options: SpanOptions;
  /**
   * The Span's current status
   */
  public status: Status;
  /**
   * True if end() has been called on the Span
   */
  public endCalled: boolean;

  private _context: SpanContext;

  /**
   * Starts a new Span.
   * @param name The name of the span.
   * @param context The SpanContext this span belongs to
   * @param options The SpanOptions used during Span creation.
   */
  constructor(name: string, context: SpanContext, options: SpanOptions = {}) {
    super();
    this.name = name;
    this.options = options;
    this.status = {
      code: CanonicalCode.OK
    };
    this.endCalled = false;
    this._context = context;
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
  isRecordingEvents(): boolean {
    return true;
  }
}
