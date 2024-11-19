// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable no-underscore-dangle*/

import { MetricHandler } from "../../../../src/metrics/index.js";
import { InternalConfig } from "../../../../src/shared/index.js";
import { ExportResultCode } from "@opentelemetry/core";
import { metrics as MetricsApi } from "@opentelemetry/api";
import { MeterProvider } from "@opentelemetry/sdk-metrics";
import type { MockInstance } from "vitest";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe("MetricHandler", () => {
  let originalEnv: NodeJS.ProcessEnv;
  let handler: MetricHandler;
  let exportStub: MockInstance;
  const _config = new InternalConfig();
  if (_config.azureMonitorExporterOptions) {
    _config.azureMonitorExporterOptions.connectionString =
      "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
  }

  beforeEach(() => {
    originalEnv = process.env;
  });

  afterEach(async () => {
    process.env = originalEnv;
    await handler.shutdown();
    MetricsApi.disable();
    vi.restoreAllMocks();
  });

  function createHandler(): void {
    handler = new MetricHandler(_config, {
      collectionInterval: 100,
    });
    exportStub = vi.spyOn(handler["_azureExporter"], "export").mockImplementation(
      (result: any, resultCallback: any) =>
        new Promise((resolve) => {
          resultCallback({
            code: ExportResultCode.SUCCESS,
          });
          resolve(result);
        }),
    );
    const meterProvider = new MeterProvider({
      views: handler.getViews(),
    });
    meterProvider.addMetricReader(handler.getMetricReader());
    MetricsApi.setGlobalMeterProvider(meterProvider);
  }

  it("should observe instruments during collection", async () => {
    createHandler();
    const counter = MetricsApi.getMeter("testMeter").createCounter("testCounter", {
      description: "testDescription",
    });
    counter.add(2);
    await new Promise((resolve) => setTimeout(resolve, 220));
    expect(exportStub).toHaveBeenCalled();
    const resourceMetrics = exportStub.mock.calls[0][0];
    const scopeMetrics = resourceMetrics.scopeMetrics;
    assert.strictEqual(scopeMetrics.length, 1, "scopeMetrics count");
    const metrics = scopeMetrics[0].metrics;
    assert.strictEqual(metrics.length, 1, "metrics count");
    assert.strictEqual(metrics[0].descriptor.name, "testCounter");
    assert.strictEqual(metrics[0].descriptor.description, "testDescription");
  });

  it("should add views", () => {
    _config.instrumentationOptions = {
      azureSdk: { enabled: true },
      http: { enabled: true },
      mySql: { enabled: true },
      postgreSql: { enabled: true },
      redis4: { enabled: true },
      redis: { enabled: true },
    };
    createHandler();
    const meterProvider = MetricsApi.getMeterProvider() as MeterProvider;
    assert.strictEqual(meterProvider["_sharedState"]["viewRegistry"]["_registeredViews"].length, 6);
  });

  describe("#autoCollect", () => {
    it("standard metrics enablement during start", () => {
      const env = <{ [id: string]: string }>{};
      process.env = env;
      process.env.APPLICATION_INSIGHTS_NO_STANDARD_METRICS = undefined;
      createHandler();
      assert.ok(handler["_standardMetrics"], "Standard metrics not loaded");
    });

    it("standard metrics disabled if env var present", () => {
      const env = <{ [id: string]: string }>{};
      env["APPLICATION_INSIGHTS_NO_STANDARD_METRICS"] = "true";
      process.env = env;
      createHandler();
      assert.ok(!handler["_standardMetrics"], "Standard metrics loaded");
    });
  });
});
