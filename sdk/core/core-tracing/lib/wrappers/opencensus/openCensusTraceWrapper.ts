// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Tracer } from "../../interfaces/tracer";
import { SpanOptions } from "../../interfaces/SpanOptions";
import { Span } from "../../interfaces/span";
import { OpenCensusSpanWrapper } from "./openCensusSpanWrapper";
import { BinaryFormat } from "../../interfaces/BinaryFormat";
import { HttpTextFormat } from "../../interfaces/HttpTextFormat";
import { Tracer as OpenCensusTracer } from "../../interfaces/OpenCensus/model";

export class OpenCensusTraceWrapper implements Tracer {
  private _tracer: OpenCensusTracer;

  public getWrappedTracer() {
    return this._tracer;
  }

  public constructor(tracer: OpenCensusTracer) {
    this._tracer = tracer;
  }

  startSpan(name: string, options?: SpanOptions): Span {
    return new OpenCensusSpanWrapper(this, name, options);
  }

  getCurrentSpan(): Span {
    throw new Error("Method not implemented.");
  }

  withSpan<T extends (...args: unknown[]) => unknown>(span: Span, fn: T): ReturnType<T> {
    throw new Error("Method not implemented.");
  }
  bind<T>(target: T, span?: Span): T {
    throw new Error("Method not implemented.");
  }
  recordSpanData(span: Span): void {
    throw new Error("Method not implemented.");
  }
  getBinaryFormat(): BinaryFormat {
    throw new Error("Method not implemented.");
  }
  getHttpTextFormat(): HttpTextFormat {
    throw new Error("Method not implemented.");
  }
}
