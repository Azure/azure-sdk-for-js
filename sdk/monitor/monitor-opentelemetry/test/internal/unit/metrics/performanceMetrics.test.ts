// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { MockInstance } from "vitest";
import { afterEach, assert, beforeAll, afterAll, describe, it, vi } from "vitest";
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

describe("PerformanceCounterMetricsHandler", () => {
  let autoCollect: PerformanceCounterMetrics;
  let exportStub: MockInstance<(typeof autoCollect)["azureExporter"]["export"]>;

  beforeAll(() => {
    const config = new InternalConfig({});
    config.azureMonitorExporterOptions.connectionString =
      "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;";
    autoCollect = new PerformanceCounterMetrics(config || config, {
      collectionInterval: 100,
    });
    exportStub = vi.spyOn(autoCollect["azureExporter"], "export").mockImplementation(
      (spans: any, resultCallback) =>
        new Promise((resolve) => {
          resultCallback({
            code: ExportResultCode.SUCCESS,
          });
          resolve(spans);
        }),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(async () => {
    vi.restoreAllMocks();
    await autoCollect.shutdown();
  });

  const resource = resourceFromAttributes({});
  resource.attributes[SEMRESATTRS_SERVICE_NAME] = "testcloudRoleName";
  resource.attributes[SEMRESATTRS_SERVICE_INSTANCE_ID] = "testcloudRoleInstance";
  const serverSpan: any = {
    kind: SpanKind.SERVER,
    duration: [654321],
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
      assert.ok(exportStub.mock.calls.length > 0, "export called");
      const resourceMetrics = exportStub.mock.calls[0][0];
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
      assert.ok((metrics[1].dataPoints[0].value as number) > 0, "Wrong request rate value");
      assert.deepStrictEqual(metrics[2].descriptor.name, "Private_Bytes");
      assert.ok((metrics[2].dataPoints[0].value as number) > 0, "Wrong private bytes value");
      assert.deepStrictEqual(metrics[3].descriptor.name, "Available_Bytes");
      assert.ok((metrics[3].dataPoints[0].value as number) > 0, "Wrong available bytes value");
      assert.deepStrictEqual(metrics[4].descriptor.name, "Processor_Time");
      assert.ok(
        (metrics[4].dataPoints[0].value as number) >= 0 &&
          (metrics[4].dataPoints[0].value as number) <= 100,
        `Wrong Processor Time value: ${metrics[4].dataPoints[0].value as number}`,
      );
      assert.deepStrictEqual(metrics[5].descriptor.name, "Process_Time_Standard");
      assert.ok(
        (metrics[5].dataPoints[0].value as number) >= 0 &&
          (metrics[5].dataPoints[0].value as number) <= 100,
        `Wrong Process Time value: ${metrics[5].dataPoints[0].value as number}`,
      );
      assert.deepStrictEqual(metrics[6].descriptor.name, "Process_Time_Normalized");
      assert.ok(
        (metrics[6].dataPoints[0].value as number) >= 0 &&
          (metrics[6].dataPoints[0].value as number) <= 100,
        `Wrong Process Time Normalized value: ${metrics[6].dataPoints[0].value as number}`,
      );
      assert.ok(!Number.isNaN(metrics[6].dataPoints[0].value), "Value should not be NaN");
      assert.deepStrictEqual(metrics[7].descriptor.name, "Exception_Rate");
    });
  });
});
