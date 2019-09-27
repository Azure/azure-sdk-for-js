// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Span } from "../../interfaces/span";
import { SpanContext } from "../../interfaces/span_context";
import { Attributes } from "../../interfaces/attributes";
import { Status } from "../../interfaces/status";
import { OpenCensusTraceStateWrapper } from "./openCensusTraceStateWrapper";
import { SpanOptions } from "../../interfaces/SpanOptions";
import { OpenCensusTracerWrapper } from "./openCensusTracerWrapper";
import { Attributes as OpenCensusAttributes, Span as OpenCensusSpan, LinkType } from "@opencensus/web-types";

function isWrappedSpan(span?: Span | SpanContext): span is OpenCensusSpanWrapper {
  return !!span && (span as OpenCensusSpanWrapper).getWrappedSpan !== undefined;
}

/**
 * An implementation of OpenTelemetry Span that wraps an OpenCensus Span.
 */
export class OpenCensusSpanWrapper implements Span {
  private _span: OpenCensusSpan;

  /**
   * The underlying OpenCensus Span
   */
  public getWrappedSpan() {
    return this._span;
  }

  /**
   * Create a new OpenCensus span and wrap it.
   * @param tracer The OpenCensus tracer that has been wrapped in OpenCensusTracerWrapper
   * @param name The name of the Span
   * @param options Options for the Span
   */
  constructor(tracer: OpenCensusTracerWrapper, name: string, options: SpanOptions = {}) {
    const parent = isWrappedSpan(options.parent) ? options.parent.getWrappedSpan() : undefined;

    this._span = tracer.getWrappedTracer().startChildSpan({
      name,
      childOf: parent
    });
    this._span.start();
  }

  /**
   * Marks the end of Span execution.
   * @param endTime The time to use as the Span's end time. Defaults to
   * the current time.
   */
  end(_endTime?: number): void {
    this._span.end();
  }

  /**
   * Returns the SpanContext associated with this Span.
   */
  context(): SpanContext {
    const openCensusSpanContext = this._span.spanContext;

    return {
      spanId: openCensusSpanContext.spanId,
      traceId: openCensusSpanContext.traceId,
      traceFlags: openCensusSpanContext.options,
      traceState: new OpenCensusTraceStateWrapper(openCensusSpanContext.traceState)
    };
  }

  /**
   * Sets an attribute on the Span
   * @param key the attribute key
   * @param value the attribute value
   */
  setAttribute(key: string, value: unknown): this {
    this._span.addAttribute(key, value as any);
    return this;
  }

  /**
   * Sets attributes on the Span
   * @param attributes the attributes to add
   */
  setAttributes(attributes: Attributes): this {
    this._span.attributes = attributes as OpenCensusAttributes;
    return this;
  }

  /**
   * Adds an event to the Span
   * @param name The name of the event
   * @param attributes The associated attributes to add for this event
   */
  addEvent(name: string, attributes?: Attributes): this {
    throw new Error("Method not implemented.");
  }

  /**
   * Adds a link to the Span.
   * @param spanContext the context of the linked span
   * @param attributes attributes to be added that are associated with the link
   */
  addLink(spanContext: SpanContext, attributes?: Attributes): this {
    // Since there is no way to specify the link relationship,
    // it is set as Unspecified.
    this._span.addLink(spanContext.traceId, spanContext.spanId, 0 /* LinkType.UNSPECIFIED */, attributes as OpenCensusAttributes);
    return this;
  }

  /**
   * Sets a status on the span. Overrides the default of CanonicalCode.OK.
   * @param status The status to set.
   */
  setStatus(status: Status): this {
    this._span.setStatus(status.code, status.message);
    return this;
  }

  /**
   * Updates the name of the Span
   * @param name the new Span name
   */
  updateName(name: string): this {
    this._span.name = name;
    return this;
  }

  /**
   * Returns whether this span will be recorded
   */
  isRecordingEvents(): boolean {
    // NoRecordSpans have an empty traceId
    return !!this._span.traceId;
  }
}
