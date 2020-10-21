// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ReadableSpan, SpanExporter, SpanProcessor } from "@opentelemetry/tracing";

/**
 * Span Processor that only exports spans on flush
 */
export class FlushSpanProcessor implements SpanProcessor {
  private _spans: ReadableSpan[] = [];
  constructor(public exporter: SpanExporter) {}

  forceFlush(callback: () => void): void {
    this.exporter.export(this._spans, () => {
      this._spans = [];
      callback();
    });
  }

  onStart(): void {
    // no op
  }
  onEnd(span: ReadableSpan): void {
    this._spans.push(span);
  }
  shutdown(): void {
    // no op
  }
}
