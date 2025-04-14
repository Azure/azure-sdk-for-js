// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Context } from "@opentelemetry/api";
import type { ReadableSpan, Span, SpanProcessor } from "@opentelemetry/sdk-trace-base";
import type { MetricHandler } from "../metrics/index.js";
import { Logger } from "../shared/logging/index.js";

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
    this._metricHandler.markSpanAsProcessed(span);
  }

  onEnd(span: ReadableSpan): void {
    try {
      this._metricHandler.recordSpan(span);
    } catch (error) {
      Logger.getInstance().warn("Error while recording span", error);
    }
  }

  shutdown(): Promise<void> {
    return Promise.resolve();
  }
}
