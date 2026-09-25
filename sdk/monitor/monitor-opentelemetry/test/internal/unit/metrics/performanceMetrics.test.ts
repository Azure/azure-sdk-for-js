// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { afterEach, assert, beforeAll, beforeEach, afterAll, describe, it, vi } from "vitest";
import { SpanKind } from "@opentelemetry/api";
import { ExportResultCode } from "@opentelemetry/core";
import { PerformanceCounterMetrics } from "../../../../src/metrics/performanceCounters.js";
import {
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_INSTANCE_ID,
} from "@opentelemetry/semantic-conventions";
import { resourceFromAttributes } from "@opentelemetry/resources";
import type { Histogram } from "@opentelemetry/sdk-metrics";
import { InternalConfig } from "../../../../src/shared/config.js";
import os from "node:os";
import process from "node:process";

describe("PerformanceCounterMetricsHandler", () => {
  let autoCollect: PerformanceCounterMetrics;
  let exportedMetrics: any[];

  function stubExporter(
    performanceCounters: PerformanceCounterMetrics,
    onExport?: (metrics: any) => void,
  ): void {
    vi.spyOn(performanceCounters["azureExporter"], "export").mockImplementation(
      (metrics: any, resultCallback) => {
        onExport?.(metrics);
        resultCallback({
          code: ExportResultCode.SUCCESS,
        });
        return Promise.resolve(metrics);
      },
    );
  }

  beforeAll(() => {
    const config = new InternalConfig({});
    config.azureMonitorExporterOptions.connectionString =
      "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;";
    autoCollect = new PerformanceCounterMetrics(config || config, {
      collectionInterval: 100,
    });
  });

  beforeEach(() => {
    exportedMetrics = [];
    stubExporter(autoCollect, (metrics) => exportedMetrics.push(metrics));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  afterAll(async () => {
    stubExporter(autoCollect);
    await autoCollect.shutdown();
    vi.restoreAllMocks();
  });

  const resource = resourceFromAttributes({});
  resource.attributes[SEMRESATTRS_SERVICE_NAME] = "testcloudRoleName";
  resource.attributes[SEMRESATTRS_SERVICE_INSTANCE_ID] = "testcloudRoleInstance";
  const serverSpan: any = {
    kind: SpanKind.SERVER,
    duration: [654, 321000000],
    attributes: {
      "http.status_code": 200,
    },
    resource: resource,
  };

  describe("#Metrics", () => {
    it("should observe instruments during collection", async () => {
      for (let i = 0; i < 10; i++) {
        autoCollect.recordSpan(serverSpan);
      }

      await new Promise((resolve) => setTimeout(resolve, 120));
      assert.isTrue(exportedMetrics.length > 0, "export called");
      const resourceMetrics = exportedMetrics[0];
      const scopeMetrics = resourceMetrics.scopeMetrics;
      assert.strictEqual(scopeMetrics.length, 1, "scopeMetrics count");
      const metrics = scopeMetrics[0].metrics;
      assert.strictEqual(metrics.length, 8, "metrics count");

      assert.deepStrictEqual(metrics[0].descriptor.name, "Request_Execution_Time");
      assert.strictEqual(metrics[0].dataPoints.length, 1, "dataPoints count");
      assert.strictEqual(
        (metrics[0].dataPoints[0].value as Histogram).count,
        10,
        "dataPoint count",
      );
      assert.strictEqual(
        (metrics[0].dataPoints[0].value as Histogram).min,
        654321,
        "dataPoint min",
      );
      assert.strictEqual(
        (metrics[0].dataPoints[0].value as Histogram).max,
        654321,
        "dataPoint max",
      );
      assert.strictEqual(
        (metrics[0].dataPoints[0].value as Histogram).sum,
        6543210,
        "dataPoint sum",
      );

      assert.deepStrictEqual(metrics[1].descriptor.name, "Request_Rate");
      assert.isTrue((metrics[1].dataPoints[0].value as number) > 0, "Wrong request rate value");
      assert.deepStrictEqual(metrics[2].descriptor.name, "Private_Bytes");
      assert.isTrue((metrics[2].dataPoints[0].value as number) > 0, "Wrong private bytes value");
      assert.deepStrictEqual(metrics[3].descriptor.name, "Available_Bytes");
      assert.isTrue((metrics[3].dataPoints[0].value as number) > 0, "Wrong available bytes value");
      assert.deepStrictEqual(metrics[4].descriptor.name, "Processor_Time");
      assert.isTrue(
        (metrics[4].dataPoints[0].value as number) >= 0 &&
          (metrics[4].dataPoints[0].value as number) <= 100,
        `Wrong Processor Time value: ${metrics[4].dataPoints[0].value as number}`,
      );
      assert.deepStrictEqual(metrics[5].descriptor.name, "Process_Time_Standard");
      assert.isTrue(
        (metrics[5].dataPoints[0].value as number) >= 0 &&
          (metrics[5].dataPoints[0].value as number) <= 100,
        `Wrong Process Time value: ${metrics[5].dataPoints[0].value as number}`,
      );
      assert.deepStrictEqual(metrics[6].descriptor.name, "Process_Time_Normalized");
      assert.isTrue(
        (metrics[6].dataPoints[0].value as number) >= 0 &&
          (metrics[6].dataPoints[0].value as number) <= 100,
        `Wrong Process Time Normalized value: ${metrics[6].dataPoints[0].value as number}`,
      );
      assert.isFalse(Number.isNaN(metrics[6].dataPoints[0].value), "Value should not be NaN");
      assert.deepStrictEqual(metrics[7].descriptor.name, "Exception_Rate");
    });

    it("should calculate the first request and exception rates from initialization", async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-08-05T00:00:00.000Z"));
      const config = new InternalConfig({});
      config.azureMonitorExporterOptions.connectionString =
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;";
      const performanceCounters = new PerformanceCounterMetrics(config, {
        collectionInterval: 60000,
      });
      stubExporter(performanceCounters);
      const spanWithException = {
        ...serverSpan,
        events: [{ name: "exception", attributes: {} }],
      };
      performanceCounters.recordSpan(spanWithException);
      vi.advanceTimersByTime(1000);

      let requestRate = 0;
      let exceptionRate = 0;
      performanceCounters["getRequestRate"]({
        observe: (value) => {
          requestRate = value;
        },
      });
      performanceCounters["getExceptionRate"]({
        observe: (value) => {
          exceptionRate = value;
        },
      });

      assert.strictEqual(requestRate, 1);
      assert.strictEqual(exceptionRate, 1);
      await performanceCounters.shutdown();
    });

    it("should sample standard and normalized process CPU independently", async () => {
      const fakeCpus = Array.from({ length: 4 }, (_, index): os.CpuInfo => ({
        model: `fake-${index}`,
        speed: 3000,
        times: { user: 1000, nice: 0, sys: 1000, idle: 8000, irq: 0 },
      }));
      vi.spyOn(os, "cpus").mockReturnValue(fakeCpus);
      vi.spyOn(process, "cpuUsage")
        .mockReturnValueOnce({ user: 0, system: 0 })
        .mockReturnValueOnce({ user: 0, system: 0 })
        .mockReturnValueOnce({ user: 100000, system: 0 })
        .mockReturnValueOnce({ user: 100500, system: 0 });
      vi.spyOn(process, "hrtime")
        .mockReturnValueOnce([0, 0])
        .mockReturnValueOnce([0, 0])
        .mockReturnValueOnce([1, 0])
        .mockReturnValueOnce([1, 1000000]);

      const config = new InternalConfig({});
      config.azureMonitorExporterOptions.connectionString =
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;";
      const performanceCounters = new PerformanceCounterMetrics(config, {
        collectionInterval: 60000,
      });
      stubExporter(performanceCounters);
      let standardCpu = 0;
      let normalizedCpu = 0;

      performanceCounters["getProcessTime"]({
        observe: (value) => {
          standardCpu = value;
        },
      });
      performanceCounters["getNormalizedProcessTime"]({
        observe: (value) => {
          normalizedCpu = value;
        },
      });

      assert.strictEqual(standardCpu, 10);
      assert.closeTo(normalizedCpu, 2.50999, 0.00001);
      await performanceCounters.shutdown();
    });
  });
});
