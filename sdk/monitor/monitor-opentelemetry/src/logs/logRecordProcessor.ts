// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MetricHandler } from "../metrics/handler";
import { LogRecord, LogRecordProcessor } from "@opentelemetry/sdk-logs";

/**
 * Azure Monitor LogRecord Processor.
 * @internal
 */
export class AzureLogRecordProcessor implements LogRecordProcessor {
  private readonly _metricHandler: MetricHandler;

  constructor(metricHandler: MetricHandler) {
    this._metricHandler = metricHandler;
  }

  public onEmit(logRecord: LogRecord): void {
    this._metricHandler.recordLog(logRecord);
  }

  public forceFlush(): Promise<void> {
    return Promise.resolve();
  }

  public shutdown(): Promise<void> {
    return Promise.resolve();
  }
}
