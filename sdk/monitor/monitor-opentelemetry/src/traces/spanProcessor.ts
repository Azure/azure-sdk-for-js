// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { trace, type Context } from "@opentelemetry/api";
import type { ReadableSpan, Span, SpanProcessor } from "@opentelemetry/sdk-trace-base";
import type { MetricHandler } from "../metrics";
import { AI_OPERATION_NAME } from "../types";

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
    const parentSpan = trace.getSpan(_context);
    if (parentSpan && "name" in parentSpan) {
      // If the parent span has a name we can assume it's a ReadableSpan and cast it as such
      span.attributes[AI_OPERATION_NAME] = (parentSpan as unknown as ReadableSpan).name;
    }
    this._metricHandler.markSpanAsProcessed(span);
  }

  onEnd(span: ReadableSpan): void {
    this._metricHandler.recordSpan(span);
  }

  shutdown(): Promise<void> {
    return Promise.resolve();
  }
}
