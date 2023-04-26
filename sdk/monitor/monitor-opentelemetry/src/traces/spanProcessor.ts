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
  constructor(private readonly _metricHandler: MetricHandler) {}

  forceFlush(): Promise<void> {
    return Promise.resolve();
  }

  onStart(span: Span, _context: Context): void {
    this._metricHandler._getStandardMetrics()?._markSpanAsProcessed(span);
  }

  onEnd(span: ReadableSpan): void {
    // Record duration metrics
    this._metricHandler._getStandardMetrics()?._recordSpan(span);
    this._metricHandler._getPerformanceCounterMetrics()?._recordSpan(span);
  }

  shutdown(): Promise<void> {
    return Promise.resolve();
  }
}
