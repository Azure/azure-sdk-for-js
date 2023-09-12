// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { MonitorOpenTelemetryExporterTest } from "./monitorOpenTelemetryExporter.spec";
import { metrics } from "@opentelemetry/api";

type MonitorOpenTelemetryExporterTestOptions = Record<string, unknown>;

export class MetricExportTest extends MonitorOpenTelemetryExporterTest<MonitorOpenTelemetryExporterTestOptions> {
  public options: PerfOptionDictionary<MonitorOpenTelemetryExporterTestOptions> = {};
  constructor() {
    super();
  }

  async run(): Promise<void> {
    const meter = metrics.getMeter("testMeter");
    const customCounter = meter.createCounter("TestCounter");
    customCounter.add(1);
  }
}
