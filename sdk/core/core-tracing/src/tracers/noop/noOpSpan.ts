// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Span,
  SpanContext,
  SpanAttributes,
  SpanStatus,
  TraceFlags,
  Exception,
  TimeInput
} from "@opentelemetry/api";

/**
 * A no-op implementation of Span that can safely be used without side-effects.
 */
export class NoOpSpan implements Span {
  /**
   * Returns the SpanContext associated with this Span.
   */
  context(): SpanContext {
    return {
      spanId: "",
      traceId: "",
      traceFlags: TraceFlags.NONE
    };
  }

  /**
   * Marks the end of Span execution.
   * @param _endTime - The time to use as the Span's end time. Defaults to
   * the current time.
   */
  end(_endTime?: number): void {
    /* Noop */
  }

  /**
   * Sets an attribute on the Span
   * @param _key - The attribute key
   * @param _value - The attribute value
   */
  setAttribute(_key: string, _value: unknown): this {
    return this;
  }

  /**
   * Sets attributes on the Span
   * @param _attributes - The attributes to add
   */
  setAttributes(_attributes: SpanAttributes): this {
    return this;
  }

  /**
   * Adds an event to the Span
   * @param _name - The name of the event
   * @param _attributes - The associated attributes to add for this event
   */
  addEvent(_name: string, _attributes?: SpanAttributes): this {
    return this;
  }

  /**
   * Sets a status on the span. Overrides the default of SpanStatusCode.OK.
   * @param _status - The status to set.
   */
  setStatus(_status: SpanStatus): this {
    return this;
  }

  /**
   * Updates the name of the Span
   * @param _name - the new Span name
   */
  updateName(_name: string): this {
    return this;
  }

  /**
   * Returns whether this span will be recorded
   */
  isRecording(): boolean {
    return false;
  }

  /**
   * Sets exception as a span event
   * @param exception the exception the only accepted values are string or Error
   * @param [time] the time to set as Span's event time. If not provided,
   *     use the current time.
   */
  recordException(_exception: Exception, _time?: TimeInput): void {}
}
