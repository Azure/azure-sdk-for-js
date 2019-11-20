// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { BinaryFormat, HttpTextFormat, Tracer, Span, SpanOptions } from "@opentelemetry/types";
import { OpenCensusSpanWrapper } from "./openCensusSpanWrapper";
import { TracerBase as OpenCensusTracer } from "@opencensus/web-types";

/**
 * An implementation of OpenTelemetry Tracer that wraps an OpenCensus Tracer.
 */
export class OpenCensusTracerWrapper implements Tracer {
  private _tracer: OpenCensusTracer;

  /**
   * The wrapped OpenCensus Tracer
   */
  public getWrappedTracer() {
    return this._tracer;
  }

  /**
   * Create a new wrapper around a given OpenCensus Tracer.
   * @param tracer The OpenCensus Tracer to wrap.
   */
  public constructor(tracer: OpenCensusTracer) {
    this._tracer = tracer;
  }

  /**
   * Starts a new Span.
   * @param name The name of the span.
   * @param options The SpanOptions used during Span creation.
   */
  startSpan(name: string, options?: SpanOptions): Span {
    return new OpenCensusSpanWrapper(this, name, options);
  }

  /**
   * Returns the current Span from the current context, if available.
   */
  getCurrentSpan(): Span | null {
    return null;
  }

  /**
   * Executes the given function within the context provided by a Span.
   * @param _span The span that provides the context.
   * @param _fn The function to be executed.
   */
  withSpan<T extends (...args: unknown[]) => unknown>(_span: Span, _fn: T): ReturnType<T> {
    throw new Error("Method not implemented.");
  }

  /**
   * Bind a Span as the target's scope
   * @param target An object to bind the scope.
   * @param _span A specific Span to use. Otherwise, use the current one.
   */
  bind<T>(_target: T, _span?: Span): T {
    throw new Error("Method not implemented.");
  }

  /**
   * Send a pre-populated Span object to the exporter.
   * @param _span The span to pass along.
   */
  recordSpanData(_span: Span): void {
    throw new Error("Method not implemented.");
  }

  /**
   * Returns the BinaryFormat interface for serializing/deserializing Spans.
   */
  getBinaryFormat(): BinaryFormat {
    throw new Error("Method not implemented.");
  }

  /**
   * Returns the HttpTextFormat interface for injecting/extracting Spans.
   */
  getHttpTextFormat(): HttpTextFormat {
    throw new Error("Method not implemented.");
  }
}
