// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Span, SpanContext, Attributes, Status } from "@opentelemetry/types";

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
      traceId: ""
    };
  }

  /**
   * Marks the end of Span execution.
   * @param _endTime The time to use as the Span's end time. Defaults to
   * the current time.
   */
  end(_endTime?: number): void {
    /* Noop */
  }

  /**
   * Sets an attribute on the Span
   * @param _key the attribute key
   * @param _value the attribute value
   */
  setAttribute(_key: string, _value: unknown): this {
    return this;
  }

  /**
   * Sets attributes on the Span
   * @param _attributes the attributes to add
   */
  setAttributes(_attributes: Attributes): this {
    return this;
  }

  /**
   * Adds an event to the Span
   * @param _name The name of the event
   * @param _attributes The associated attributes to add for this event
   */
  addEvent(_name: string, _attributes?: Attributes): this {
    return this;
  }

  /**
   * Sets a status on the span. Overrides the default of CanonicalCode.OK.
   * @param _status The status to set.
   */
  setStatus(_status: Status): this {
    return this;
  }

  /**
   * Updates the name of the Span
   * @param _name the new Span name
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
}
