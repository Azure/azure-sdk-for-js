// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Context } from "@opentelemetry/api";
import type { MetricHandler } from "../metrics/handler";
import type { LogRecord, LogRecordProcessor } from "@opentelemetry/sdk-logs";

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
    this._metricHandler.recordLog(logRecord);
  }

  public forceFlush(): Promise<void> {
    return Promise.resolve();
  }

  public shutdown(): Promise<void> {
    return Promise.resolve();
  }
}
