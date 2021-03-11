// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Context as OTContext,
  context as otContext,
  SpanContext,
  Span,
  SpanOptions,
  SpanAttributes,
  SpanStatus,
  TraceFlags,
  Exception,
  TimeInput,
  SpanStatusCode,
  getSpan
} from "@opentelemetry/api";
import { OpenCensusTraceStateWrapper } from "./openCensusTraceStateWrapper";
import { OpenCensusTracerWrapper } from "./openCensusTracerWrapper";
import { Attributes as OpenCensusAttributes, Span as OpenCensusSpan } from "@opencensus/web-types";

/** An enumeration of canonical status codes. */
enum CanonicalCode {
  /**
   * Not an error; returned on success
   */
  OK = 0,
  /**
   * Internal errors.  Means some invariants expected by underlying
   * system has been broken.  If you see one of these errors,
   * something is very broken.
   */
  INTERNAL = 13
}

function isWrappedSpan(span?: Span | SpanContext | null): span is OpenCensusSpanWrapper {
  return !!span && (span as OpenCensusSpanWrapper).getWrappedSpan !== undefined;
}

function isTracer(
  tracerOrSpan: OpenCensusTracerWrapper | OpenCensusSpan
): tracerOrSpan is OpenCensusTracerWrapper {
  return (tracerOrSpan as OpenCensusTracerWrapper).getWrappedTracer !== undefined;
}

/**
 * An implementation of OpenTelemetry Span that wraps an OpenCensus Span.
 */
export class OpenCensusSpanWrapper implements Span {
  private _span: OpenCensusSpan;

  /**
   * The underlying OpenCensus Span
   */
  public getWrappedSpan(): OpenCensusSpan {
    return this._span;
  }

  /**
   * Wraps an existing OpenCensus Span
   * @param span - A Span or RootSpan from OpenCensus
   */
  constructor(span: OpenCensusSpan);
  /**
   * Create a new OpenCensus Span and wrap it.
   * @param tracer - The OpenCensus tracer that has been wrapped in OpenCensusTracerWrapper
   * @param name - The name of the Span
   * @param options - Options for the Span
   * @param context - The context for the Span.
   */
  constructor(
    tracer: OpenCensusTracerWrapper,
    name: string,
    options?: SpanOptions,
    context?: OTContext
  );
  constructor(
    tracerOrSpan: OpenCensusTracerWrapper | OpenCensusSpan,
    name: string = "",
    options: SpanOptions = {},
    context?: OTContext
  ) {
    if (isTracer(tracerOrSpan)) {
      const span = getSpan(context ?? otContext.active());
      const parent = isWrappedSpan(span) ? span.getWrappedSpan() : undefined;
      this._span = tracerOrSpan.getWrappedTracer().startChildSpan({
        name,
        childOf: parent
      });
      this._span.start();
      if (options.links) {
        for (const link of options.links) {
          // Since there is no way to set the link relationship, leave it as Unspecified.
          this._span.addLink(
            link.context.traceId,
            link.context.spanId,
            0 /* LinkType.UNSPECIFIED */,
            link.attributes as OpenCensusAttributes
          );
        }
      }
    } else {
      this._span = tracerOrSpan;
    }
  }

  /**
   * Marks the end of Span execution.
   * @param endTime - The time to use as the Span's end time. Defaults to
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
      traceFlags: openCensusSpanContext.options as TraceFlags,
      traceState: new OpenCensusTraceStateWrapper(openCensusSpanContext.traceState)
    };
  }

  /**
   * Sets an attribute on the Span
   * @param key - The attribute key
   * @param value - The attribute value
   */
  setAttribute(key: string, value: unknown): this {
    this._span.addAttribute(key, value as any);
    return this;
  }

  /**
   * Sets attributes on the Span
   * @param attributes - The attributes to add
   */
  setAttributes(attributes: SpanAttributes): this {
    this._span.attributes = attributes as OpenCensusAttributes;
    return this;
  }

  /**
   * Adds an event to the Span
   * @param name - The name of the event
   * @param attributes - The associated attributes to add for this event
   */
  addEvent(_name: string, _attributes?: SpanAttributes): this {
    throw new Error("Method not implemented.");
  }

  /**
   * Sets a status on the span. Overrides the default of SpanStatusCode.OK.
   * @param status - The status to set.
   */
  setStatus(status: SpanStatus): this {
    switch (status.code) {
      case SpanStatusCode.ERROR: {
        this._span.setStatus(CanonicalCode.INTERNAL, status.message);
        break;
      }
      case SpanStatusCode.OK: {
        this._span.setStatus(CanonicalCode.OK, status.message);
        break;
      }
      case SpanStatusCode.UNSET: {
        break;
      }
    }

    return this;
  }

  /**
   * Updates the name of the Span
   * @param name - The new Span name
   */
  updateName(name: string): this {
    this._span.name = name;
    return this;
  }

  /**
   * Returns whether this span will be recorded
   */
  isRecording(): boolean {
    // NoRecordSpans have an empty traceId
    return !!this._span.traceId;
  }

  /**
   * Sets exception as a span event
   * @param exception the exception the only accepted values are string or Error
   * @param [time] the time to set as Span's event time. If not provided,
   *     use the current time.
   */
  recordException(_exception: Exception, _time?: TimeInput): void {
    throw new Error("Method not implemented");
  }
}
