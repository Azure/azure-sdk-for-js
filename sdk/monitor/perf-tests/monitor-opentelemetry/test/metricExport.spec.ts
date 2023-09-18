// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { MonitorOpenTelemetryTest } from "./monitorOpenTelemetry.spec";
import { metrics } from "@opentelemetry/api";

type MonitorOpenTelemetryTestOptions = Record<string, unknown>;

export class MetricExportTest extends MonitorOpenTelemetryTest<MonitorOpenTelemetryTestOptions> {
  public options: PerfOptionDictionary<MonitorOpenTelemetryTestOptions> = {};
  constructor() {
    super();
  }

  async run(): Promise<void> {
    const meter = metrics.getMeter("testMeter");
    const customCounter = meter.createCounter("TestCounter");
    customCounter.add(1);
  }
}
