// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ReadableSpan, SpanExporter, SpanProcessor } from "@opentelemetry/sdk-trace-base";

/**
 * Span Processor that only exports spans on flush
 */
export class FlushSpanProcessor implements SpanProcessor {
  private _spans: ReadableSpan[] = [];
  constructor(public exporter: SpanExporter) {}

  forceFlush(): Promise<void> {
    return new Promise((resolve) => {
      this.exporter.export(this._spans, () => {
        this._spans = [];
        resolve();
      });
    });
  }

  onStart(): void {
    // no op
  }
  onEnd(span: ReadableSpan): void {
    this._spans.push(span);
  }
  shutdown(): Promise<void> {
    return Promise.resolve();
  }
}
