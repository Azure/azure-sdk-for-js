// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import * as sinon from "sinon";
import { PerformanceCounterMetrics } from "../../../../src/metrics/performanceCounters";
import { AzureMonitorOpenTelemetryConfig } from "../../../../src/shared";
import { ExportResultCode } from "@opentelemetry/core";

describe("PerformanceCounterMetricsHandler", () => {
  let autoCollect: PerformanceCounterMetrics;
  let config: AzureMonitorOpenTelemetryConfig;
  let exportStub: sinon.SinonStub;

  before(() => {
    config = new AzureMonitorOpenTelemetryConfig();
    config.azureMonitorExporterConfig.connectionString =
      "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;";
  });

  afterEach(() => {
    exportStub.resetHistory();
    autoCollect.shutdown();
  });

  after(() => {
    exportStub.restore();
  });

  function createAutoCollect(customConfig?: AzureMonitorOpenTelemetryConfig) {
    autoCollect = new PerformanceCounterMetrics(customConfig || config, {
      collectionInterval: 550,
    });
    exportStub = sinon.stub(autoCollect["_azureExporter"], "export").callsFake(
      (spans: any, resultCallback: any) =>
        new Promise((resolve) => {
          resultCallback({
            code: ExportResultCode.SUCCESS,
          });
          resolve(spans);
        })
    );
  }

  describe("#Metrics", () => {
    it("should observe instruments during collection", async () => {
      createAutoCollect();
      await new Promise((resolve) => setTimeout(resolve, 600));
      assert.ok(exportStub.called);
      const resourceMetrics = exportStub.args[0][0];
      const scopeMetrics = resourceMetrics.scopeMetrics;
      assert.strictEqual(scopeMetrics.length, 1, "scopeMetrics count");
      let metrics = scopeMetrics[0].metrics;
      assert.strictEqual(metrics.length, 6, "metrics count");
      assert.deepStrictEqual(
        metrics[0].descriptor.name,
        "\\ASP.NET Applications(??APP_W3SVC_PROC??)\\Request Execution Time"
      );
      assert.deepStrictEqual(metrics[0].dataPoints.length, 0);
      assert.deepStrictEqual(
        metrics[1].descriptor.name,
        "\\ASP.NET Applications(??APP_W3SVC_PROC??)\\Requests/Sec"
      );
      assert.deepStrictEqual(metrics[1].dataPoints[0].value, 0);
      assert.deepStrictEqual(
        metrics[2].descriptor.name,
        "\\Process(??APP_WIN32_PROC??)\\Private Bytes"
      );
      assert.ok(metrics[2].dataPoints[0].value > 0, "Wrong private bytes value");
      assert.deepStrictEqual(metrics[3].descriptor.name, "\\Memory\\Available Bytes");
      assert.ok(metrics[3].dataPoints[0].value > 0, "Wrong available bytes value");
      assert.deepStrictEqual(metrics[4].descriptor.name, "\\Processor(_Total)\\% Processor Time");
      assert.ok(
        metrics[4].dataPoints[0].value > 0 && metrics[4].dataPoints[0].value <= 100,
        "Wrong Processor Time value"
      );
      assert.deepStrictEqual(
        metrics[5].descriptor.name,
        "\\Process(??APP_WIN32_PROC??)\\% Processor Time"
      );
      assert.ok(
        metrics[5].dataPoints[0].value > 0 && metrics[5].dataPoints[0].value <= 100,
        "Wrong Process Time value"
      );
    });

    it("should not collect when disabled", async () => {
      createAutoCollect();
      autoCollect.shutdown();
      await new Promise((resolve) => setTimeout(resolve, 600));
      assert.ok(exportStub.notCalled);
    });
  });
});
