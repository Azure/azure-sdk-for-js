// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MetricHandler } from "../metrics/handler.js";
import type { LogRecordProcessor, SdkLogRecord } from "@opentelemetry/sdk-logs";
import type { Context } from "@opentelemetry/api";
import { trace } from "@opentelemetry/api";
import type { ReadableSpan } from "@opentelemetry/sdk-trace-base";
import { Logger } from "../shared/logging/index.js";
import { MAIN_AGENT_ATTRIBUTE_PREFIX } from "../utils/genaiAttributes.js";

/**
 * Azure Monitor LogRecord Processor.
 * @internal
 */
export class AzureLogRecordProcessor implements LogRecordProcessor {
  private readonly _metricHandler: MetricHandler;

  constructor(metricHandler: MetricHandler) {
    this._metricHandler = metricHandler;
  }

  public onEmit(logRecord: SdkLogRecord, context?: Context): void {
    try {
      this._propagateMainAgentAttributesFromActiveSpan(logRecord, context);
    } catch (error) {
      Logger.getInstance().warn("Error while propagating main agent attributes onEmit", error);
    }
    try {
      this._metricHandler.recordLog(logRecord);
    } catch (error) {
      Logger.getInstance().warn("Error while recording log", error);
    }
  }

  private _propagateMainAgentAttributesFromActiveSpan(
    logRecord: SdkLogRecord,
    context?: Context,
  ): void {
    if (!context) {
      return;
    }
    const span = trace.getSpan(context);
    if (!span) {
      return;
    }
    const spanAttributes = (span as unknown as ReadableSpan).attributes;
    if (!spanAttributes) {
      return;
    }
    for (const key of Object.keys(spanAttributes)) {
      if (key.startsWith(MAIN_AGENT_ATTRIBUTE_PREFIX)) {
        const value = spanAttributes[key];
        if (value !== undefined) {
          logRecord.setAttribute(key, value);
        }
      }
    }
  }

  public forceFlush(): Promise<void> {
    return Promise.resolve();
  }

  public shutdown(): Promise<void> {
    return Promise.resolve();
  }
}
