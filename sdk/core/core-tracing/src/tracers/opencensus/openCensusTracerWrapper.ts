// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Tracer } from "@opentelemetry/api";
import { OpenCensusSpanWrapper } from "./openCensusSpanWrapper";
import { TracerBase as OpenCensusTracer } from "@opencensus/web-types";
import { Span, SpanOptions } from "../../interfaces";

/**
 * An implementation of OpenTelemetry Tracer that wraps an OpenCensus Tracer.
 */
export class OpenCensusTracerWrapper implements Tracer {
  private _tracer: OpenCensusTracer;

  /**
   * The wrapped OpenCensus Tracer
   */
  public getWrappedTracer(): OpenCensusTracer {
    return this._tracer;
  }

  /**
   * Create a new wrapper around a given OpenCensus Tracer.
   * @param tracer - The OpenCensus Tracer to wrap.
   */
  public constructor(tracer: OpenCensusTracer) {
    this._tracer = tracer;
  }

  /**
   * Starts a new Span.
   * @param name - The name of the span.
   * @param options - The SpanOptions used during Span creation.
   */
  startSpan(name: string, options?: SpanOptions): Span {
    return new OpenCensusSpanWrapper(this, name, options);
  }

  /**
   * Returns the current Span from the current context, if available.
   */
  getCurrentSpan(): Span | undefined {
    return undefined;
  }

  /**
   * Executes the given function within the context provided by a Span.
   * @param _span - The span that provides the context.
   * @param _fn - The function to be executed.
   */
  withSpan<T extends (...args: unknown[]) => unknown>(_span: Span, _fn: T): ReturnType<T> {
    throw new Error("Method not implemented.");
  }

  /**
   * Bind a Span as the target's scope
   * @param target - An object to bind the scope.
   * @param _span - A specific Span to use. Otherwise, use the current one.
   */
  bind<T>(_target: T, _span?: Span): T {
    throw new Error("Method not implemented.");
  }
}
