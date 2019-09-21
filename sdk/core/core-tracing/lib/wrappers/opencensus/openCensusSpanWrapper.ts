// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Span } from "../../interfaces/span";
import { SpanContext } from "../../interfaces/span_context";
import { Attributes } from "../../interfaces/attributes";
import { Status } from "../../interfaces/status";
import { OpenCensusTraceStateWrapper } from "./openCensusTraceStateWrapper";
import { SpanOptions } from "../../interfaces/SpanOptions";
import { OpenCensusTraceWrapper } from "./openCensusTraceWrapper";
import { Attributes as OpenCensusAttributes, Span as OpenCensusSpan, LinkType } from "../../interfaces/OpenCensus/model";

function isWrappedSpan(span?: Span | SpanContext): span is OpenCensusSpanWrapper {
  return !!span && (span as OpenCensusSpanWrapper).getWrappedSpan !== undefined;
}

export class OpenCensusSpanWrapper implements Span {
  private _span: OpenCensusSpan;

  public getWrappedSpan() {
    return this._span;
  }

  constructor(tracer: OpenCensusTraceWrapper, name: string, options: SpanOptions = {}) {
    const parent = isWrappedSpan(options.parent) ? options.parent.getWrappedSpan() : undefined;

    this._span = tracer.getWrappedTracer().startChildSpan({
      name,
      childOf: parent
    });
    this._span.start();
  }

  end(_endTime?: number): void {
    this._span.end();
  }

  context(): SpanContext {
    const openCensusSpanContext = this._span.spanContext;

    return {
      spanId: openCensusSpanContext.spanId,
      traceId: openCensusSpanContext.traceId,
      traceFlags: openCensusSpanContext.options,
      traceState: new OpenCensusTraceStateWrapper(openCensusSpanContext.traceState)
    };
  }

  setAttribute(key: string, value: unknown): this {
    this._span.addAttribute(key, value as any);
    return this;
  }

  setAttributes(attributes: Attributes): this {
    this._span.attributes = attributes as OpenCensusAttributes;
    return this;
  }

  addEvent(name: string, attributes?: Attributes): this {
    throw new Error("Method not implemented.");
  }

  addLink(spanContext: SpanContext, attributes?: Attributes): this {
    // Since there is no way to specify the link relationship
    // It is set as Unspecified = 0
    this._span.addLink(spanContext.traceId, spanContext.spanId, LinkType.UNSPECIFIED, attributes as OpenCensusAttributes);
    return this;
  }

  setStatus(status: Status): this {
    this._span.setStatus(status.code, status.message);
    return this;
  }

  updateName(name: string): this {
    this._span.name = name;
    return this;
  }

  isRecordingEvents(): boolean {
    // NoRecordSpans have an empty traceId
    return !!this._span.traceId;
  }
}
