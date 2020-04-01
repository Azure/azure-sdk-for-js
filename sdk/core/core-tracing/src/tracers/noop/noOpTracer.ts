// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { NoOpSpan } from "./noOpSpan";
import { BinaryFormat, HttpTextFormat, Tracer, Span, SpanOptions } from "@opentelemetry/types";
import { NoOpBinaryFormat } from "./noOpBinaryFormat";
import { NoOpHttpTextFormat } from "./noOpHttpTextFormat";

/**
 * A no-op implementation of Tracer that can be used when tracing
 * is disabled.
 */
export class NoOpTracer implements Tracer {
  /**
   * Starts a new Span.
   * @param _name The name of the span.
   * @param _options The SpanOptions used during Span creation.
   */
  startSpan(_name: string, _options?: SpanOptions): Span {
    return new NoOpSpan();
  }

  /**
   * Returns the current Span from the current context, if available.
   */
  getCurrentSpan(): Span {
    return new NoOpSpan();
  }

  /**
   * Executes the given function within the context provided by a Span.
   * @param _span The span that provides the context.
   * @param fn The function to be executed.
   */
  withSpan<T extends (...args: unknown[]) => ReturnType<T>>(_span: Span, fn: T): ReturnType<T> {
    return fn();
  }

  /**
   * Bind a Span as the target's scope
   * @param target An object to bind the scope.
   * @param _span A specific Span to use. Otherwise, use the current one.
   */
  bind<T>(target: T, _span?: Span): T {
    return target;
  }

  /**
   * Send a pre-populated Span object to the exporter.
   * @param _span The span to pass along.
   */
  recordSpanData(_span: Span): void {
    /* NOOP */
  }

  /**
   * Returns the BinaryFormat interface for serializing/deserializing Spans.
   */
  getBinaryFormat(): BinaryFormat {
    return new NoOpBinaryFormat();
  }

  /**
   * Returns the HttpTextFormat interface for injecting/extracting Spans.
   */
  getHttpTextFormat(): HttpTextFormat {
    return new NoOpHttpTextFormat();
  }
}
