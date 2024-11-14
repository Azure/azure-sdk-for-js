// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Context, trace } from "@opentelemetry/api";
import type { MetricHandler } from "../metrics/handler";
import type { LogRecord, LogRecordProcessor } from "@opentelemetry/sdk-logs";
import { ReadableSpan } from "@opentelemetry/sdk-trace-base";

/**
 * Azure Monitor LogRecord Processor.
 * @internal
 */
export class AzureLogRecordProcessor implements LogRecordProcessor {
  private readonly _metricHandler: MetricHandler;

  constructor(metricHandler: MetricHandler) {
    this._metricHandler = metricHandler;
  }

  public onEmit(logRecord: LogRecord, context: Context): void {
    const parentSpan = trace.getSpan(context);
    if (parentSpan && "name" in parentSpan) {
      // If the parent span has a name we can assume it's a ReadableSpan and cast it as such
      logRecord.attributes["ai.operation.name"] = (parentSpan as unknown as ReadableSpan).name;
    }
    this._metricHandler.recordLog(logRecord);
  }

  public forceFlush(): Promise<void> {
    return Promise.resolve();
  }

  public shutdown(): Promise<void> {
    return Promise.resolve();
  }
}
