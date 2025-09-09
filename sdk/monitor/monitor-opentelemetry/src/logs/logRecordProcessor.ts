// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MetricHandler } from "../metrics/handler.js";
import type { LogRecordProcessor, SdkLogRecord } from "@opentelemetry/sdk-logs";
import { Logger } from "../shared/logging/index.js";

/**
 * Azure Monitor LogRecord Processor.
 * @internal
 */
export class AzureLogRecordProcessor implements LogRecordProcessor {
  private readonly _metricHandler: MetricHandler;

  constructor(metricHandler: MetricHandler) {
    this._metricHandler = metricHandler;
  }

  public onEmit(logRecord: SdkLogRecord): void {
    try {
      this._metricHandler.recordLog(logRecord);
    } catch (error) {
      Logger.getInstance().warn("Error while recording log", error);
    }
  }

  public forceFlush(): Promise<void> {
    return Promise.resolve();
  }

  public shutdown(): Promise<void> {
    return Promise.resolve();
  }
}
