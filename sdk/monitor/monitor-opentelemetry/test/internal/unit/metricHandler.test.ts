// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { MetricHandler } from "../../../src/metrics";
import { AzureMonitorOpenTelemetryConfig } from "../../../src/shared";

describe("MetricHandler", () => {
  let _config: AzureMonitorOpenTelemetryConfig;
  let handler: MetricHandler;

  before(() => {
    _config = new AzureMonitorOpenTelemetryConfig();
    if (_config.azureMonitorExporterConfig) {
      _config.azureMonitorExporterConfig.connectionString =
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
    }
  });

  afterEach(() => {
    handler.shutdown();
  });

  describe("#autoCollect", () => {
    it("performance enablement during start", () => {
      _config.enableAutoCollectPerformance = true;
      handler = new MetricHandler(_config);
      assert.ok(handler["_perfCounterMetrics"], "Performance counters not loaded");
    });

    it("standard metrics enablement during start", () => {
      _config.enableAutoCollectStandardMetrics = true;
      handler = new MetricHandler(_config);
      assert.ok(handler["_standardMetrics"], "Standard metrics not loaded");
    });
  });
});
