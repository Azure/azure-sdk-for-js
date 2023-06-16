// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "@opentelemetry/api";
import { ReadableSpan, Span, SpanProcessor } from "@opentelemetry/sdk-trace-base";
import { MetricHandler } from "../metrics";

/**
 * Azure Monitor Span Processor.
 * @internal
 */
export class AzureMonitorSpanProcessor implements SpanProcessor {
  private readonly _metricHandler: MetricHandler;

  constructor(metricHandler: MetricHandler) {
    this._metricHandler = metricHandler;
  }

  forceFlush(): Promise<void> {
    return Promise.resolve();
  }

  onStart(span: Span, _context: Context): void {
    this._metricHandler.getStandardMetrics()?.markSpanAsProcessed(span);
  }

  onEnd(span: ReadableSpan): void {
    // Record duration metrics
    this._metricHandler.getStandardMetrics()?.recordSpan(span);
    this._metricHandler.getPerformanceCounterMetrics()?.recordSpan(span);
  }

  shutdown(): Promise<void> {
    return Promise.resolve();
  }
}
