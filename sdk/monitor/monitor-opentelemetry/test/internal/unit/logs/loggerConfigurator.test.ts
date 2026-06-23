// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logs, SeverityNumber } from "@opentelemetry/api-logs";
import type { LogRecordProcessor, SdkLogRecord } from "@opentelemetry/sdk-logs";
import type { AzureMonitorOpenTelemetryOptions } from "../../../../src/index.js";
import {
  createLoggerConfigurator,
  shutdownAzureMonitor,
  useAzureMonitor,
} from "../../../../src/index.js";
import { afterEach, assert, beforeEach, describe, it } from "vitest";

const GLOBAL_OPENTELEMETRY_API_KEY = Symbol.for("opentelemetry.js.api.1");

class CapturingProcessor implements LogRecordProcessor {
  public records: SdkLogRecord[] = [];
  onEmit(record: SdkLogRecord): void {
    this.records.push(record);
  }
  forceFlush(): Promise<void> {
    return Promise.resolve();
  }
  shutdown(): Promise<void> {
    return Promise.resolve();
  }
}

describe("Library/loggerConfigurator", () => {
  let savedOTelGlobal: unknown;

  beforeEach(() => {
    savedOTelGlobal = Reflect.get(globalThis, GLOBAL_OPENTELEMETRY_API_KEY);
  });

  afterEach(async () => {
    await shutdownAzureMonitor();
    if (savedOTelGlobal === undefined) {
      Reflect.deleteProperty(globalThis, GLOBAL_OPENTELEMETRY_API_KEY);
    } else {
      Reflect.set(globalThis, GLOBAL_OPENTELEMETRY_API_KEY, savedOTelGlobal);
    }
  });

  function emit(loggerName: string, severityNumber: SeverityNumber): void {
    logs.getLogger(loggerName).emit({ body: "test", severityNumber });
  }

  it("filters out log records below the configured minimum severity", () => {
    const capture = new CapturingProcessor();
    const options: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
      logRecordProcessors: [capture],
      loggerConfigurator: createLoggerConfigurator([
        { pattern: "*", config: { minimumSeverity: SeverityNumber.WARN } },
      ]),
    };
    useAzureMonitor(options);

    emit("test-logger", SeverityNumber.INFO);
    emit("test-logger", SeverityNumber.WARN);
    emit("test-logger", SeverityNumber.ERROR);

    // INFO is dropped at the logger level; WARN and ERROR pass through.
    assert.strictEqual(capture.records.length, 2);
    assert.strictEqual(capture.records[0].severityNumber, SeverityNumber.WARN);
    assert.strictEqual(capture.records[1].severityNumber, SeverityNumber.ERROR);
  });

  it("disables logging entirely for a matching logger scope", () => {
    const capture = new CapturingProcessor();
    const options: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
      logRecordProcessors: [capture],
      loggerConfigurator: createLoggerConfigurator([
        { pattern: "noisy-logger", config: { disabled: true } },
        { pattern: "*", config: {} },
      ]),
    };
    useAzureMonitor(options);

    emit("noisy-logger", SeverityNumber.ERROR);
    emit("other-logger", SeverityNumber.ERROR);

    // Only the non-disabled logger's record is captured.
    assert.strictEqual(capture.records.length, 1);
  });

  it("emits all records when no loggerConfigurator is provided", () => {
    const capture = new CapturingProcessor();
    const options: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
      logRecordProcessors: [capture],
    };
    useAzureMonitor(options);

    emit("test-logger", SeverityNumber.DEBUG);
    emit("test-logger", SeverityNumber.INFO);

    assert.strictEqual(capture.records.length, 2);
  });
});
