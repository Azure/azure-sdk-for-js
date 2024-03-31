// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfOptionDictionary } from "@azure-tools/test-perf";
import { MonitorOpenTelemetryTest } from "./monitorOpenTelemetry.spec.js";
import { logs, SeverityNumber } from "@opentelemetry/api-logs";

type MonitorOpenTelemetryTestOptions = Record<string, unknown>;

export class LogExportTest extends MonitorOpenTelemetryTest<MonitorOpenTelemetryTestOptions> {
  public options: PerfOptionDictionary<MonitorOpenTelemetryTestOptions> = {};
  constructor() {
    super();
  }

  async run(): Promise<void> {
    try {
      const logger = logs.getLogger("test-logger");
      logger.emit({
        severityText: "INFO",
        severityNumber: SeverityNumber.INFO,
        body: "test message",
        attributes: { key: "value" },
      });
    } catch (error) {
      console.error("Error running logs perf test:", error);
      process.exit(1);
    }
  }
}
