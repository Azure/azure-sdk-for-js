// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PerfOptionDictionary } from "@azure-tools/test-perf";
import { MonitorOpenTelemetryTest } from "./monitorOpenTelemetry.spec.js";
import { metrics } from "@opentelemetry/api";

type MonitorOpenTelemetryTestOptions = Record<string, unknown>;

export class MetricExportTest extends MonitorOpenTelemetryTest<MonitorOpenTelemetryTestOptions> {
  public options: PerfOptionDictionary<MonitorOpenTelemetryTestOptions> = {};

  async run(): Promise<void> {
    const meter = metrics.getMeter("testMeter");
    const customCounter = meter.createCounter("TestCounter");
    customCounter.add(1);
  }
}
