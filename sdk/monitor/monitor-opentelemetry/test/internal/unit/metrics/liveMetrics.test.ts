// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import * as sinon from "sinon";
import { SpanKind } from "@opentelemetry/api";
import { Histogram } from "@opentelemetry/sdk-metrics";
import { ExportResultCode, millisToHrTime } from "@opentelemetry/core";
import { LoggerProvider, LogRecord } from "@opentelemetry/sdk-logs";
import { LiveMetrics } from "../../../../src/metrics/quickpulse/liveMetrics";
import { InternalConfig } from "../../../../src/shared";
import { QuickPulseMetricNames } from "../../../../src/metrics/quickpulse/types";

describe("#LiveMetrics", () => {
  let exportStub: sinon.SinonStub;
  let autoCollect: LiveMetrics;

  before(() => {
    const config = new InternalConfig();
    config.azureMonitorExporterOptions.connectionString =
      "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;";
    autoCollect = new LiveMetrics(config);
    exportStub = sinon.stub(autoCollect["quickpulseExporter"], "export").callsFake(
      (spans: any, resultCallback: any) =>
        new Promise((resolve) => {
          resultCallback({
            code: ExportResultCode.SUCCESS,
          });
          resolve(spans);
        })
    );
  });

  afterEach(() => {
    exportStub.resetHistory();
  });

  after(() => {
    exportStub.restore();
    autoCollect.shutdown();
  });

  it("should observe instruments during collection", async () => {
    autoCollect["isCollectingData"] = true;
    autoCollect.activateMetrics({ collectionInterval: 100 });

    let loggerProvider = new LoggerProvider();
    let logger = loggerProvider.getLogger("testLogger") as any;

    let traceLog = new LogRecord(
      logger["_sharedState"],
      { name: "test" },
      {
        body: "testMessage",
        timestamp: 1234567890,
      }
    );
    autoCollect.recordLog(traceLog as any);
    traceLog.attributes["exception.type"] = "testExceptionType";
    for (let i = 0; i < 5; i++) {
      autoCollect.recordLog(traceLog as any);
    }

    let clientSpan: any = {
      kind: SpanKind.CLIENT,
      duration: millisToHrTime(12345678),
      attributes: {
        "http.status_code": 200,
      },
    };
    autoCollect.recordSpan(clientSpan);

    let serverSpan: any = {
      kind: SpanKind.SERVER,
      duration: millisToHrTime(98765432),
      attributes: {
        "http.status_code": 200,
      },
    };
    for (let i = 0; i < 2; i++) {
      autoCollect.recordSpan(serverSpan);
    }

    // Different dimensions
    clientSpan.attributes["http.status_code"] = "400";
    clientSpan.duration = millisToHrTime(900000);
    for (let i = 0; i < 3; i++) {
      autoCollect.recordSpan(clientSpan);
    }

    serverSpan.duration = millisToHrTime(100000);
    serverSpan.attributes["http.status_code"] = "400";
    for (let i = 0; i < 4; i++) {
      autoCollect.recordSpan(serverSpan);
    }

    await new Promise((resolve) => setTimeout(resolve, 750));

    assert.ok(exportStub.called);
    const resourceMetrics = exportStub.args[0][0];
    const scopeMetrics = resourceMetrics.scopeMetrics;
    assert.strictEqual(scopeMetrics.length, 1, "scopeMetrics count");
    const metrics = scopeMetrics[0].metrics;
    assert.strictEqual(metrics.length, 9, "metrics count");

    assert.strictEqual(metrics[0].descriptor.name, QuickPulseMetricNames.REQUEST_DURATION);
    assert.strictEqual(metrics[0].dataPoints.length, 1, "dataPoints count");
    assert.strictEqual(
      (metrics[0].dataPoints[0].value as Histogram).count,
      6,
      "REQUEST_DURATION dataPoint count"
    );
    assert.strictEqual(
      (metrics[0].dataPoints[0].value as Histogram).min,
      100000,
      "REQUEST_DURATION dataPoint min"
    );
    assert.strictEqual(
      (metrics[0].dataPoints[0].value as Histogram).max,
      98765432,
      "REQUEST_DURATION dataPoint max"
    );
    assert.strictEqual(
      (metrics[0].dataPoints[0].value as Histogram).sum,
      197930864,
      "REQUEST_DURATION dataPoint sum"
    );
    assert.strictEqual(metrics[1].descriptor.name, QuickPulseMetricNames.DEPENDENCY_DURATION);
    assert.strictEqual(metrics[1].dataPoints.length, 1, "dataPoints count");
    assert.strictEqual(
      (metrics[1].dataPoints[0].value as Histogram).count,
      4,
      "DEPENDENCY_DURATION dataPoint count"
    );
    assert.strictEqual(
      (metrics[1].dataPoints[0].value as Histogram).min,
      900000,
      "DEPENDENCY_DURATION dataPoint min"
    );
    assert.strictEqual(
      (metrics[1].dataPoints[0].value as Histogram).max,
      12345678,
      "DEPENDENCY_DURATION dataPoint max"
    );
    assert.strictEqual(
      (metrics[1].dataPoints[0].value as Histogram).sum,
      15045678,
      "DEPENDENCY_DURATION dataPoint sum"
    );
    assert.strictEqual(metrics[2].descriptor.name, QuickPulseMetricNames.REQUEST_RATE);
    assert.strictEqual(metrics[2].dataPoints.length, 1, "dataPoints count");
    assert.ok(metrics[2].dataPoints[0].value > 0, "REQUEST_RATE value");
    assert.strictEqual(metrics[3].descriptor.name, QuickPulseMetricNames.REQUEST_FAILURE_RATE);
    assert.strictEqual(metrics[3].dataPoints.length, 1, "dataPoints count");
    assert.ok(metrics[3].dataPoints[0].value > 0, "REQUEST_FAILURE_RATE value");
    assert.strictEqual(metrics[4].descriptor.name, QuickPulseMetricNames.DEPENDENCY_RATE);
    assert.strictEqual(metrics[4].dataPoints.length, 1, "dataPoints count");
    assert.ok(metrics[4].dataPoints[0].value > 0, "DEPENDENCY_RATE value");
    assert.strictEqual(metrics[5].descriptor.name, QuickPulseMetricNames.DEPENDENCY_FAILURE_RATE);
    assert.strictEqual(metrics[5].dataPoints.length, 1, "dataPoints count");
    assert.ok(metrics[5].dataPoints[0].value > 0, "DEPENDENCY_FAILURE_RATE value");
    assert.strictEqual(metrics[6].descriptor.name, QuickPulseMetricNames.COMMITTED_BYTES);
    assert.strictEqual(metrics[6].dataPoints.length, 1, "dataPoints count");
    assert.ok(metrics[6].dataPoints[0].value > 0, "COMMITTED_BYTES dataPoint value");
    assert.strictEqual(metrics[7].descriptor.name, QuickPulseMetricNames.PROCESSOR_TIME);
    assert.strictEqual(metrics[7].dataPoints.length, 1, "dataPoints count");
    assert.ok(metrics[7].dataPoints[0].value > 0, "PROCESSOR_TIME dataPoint value");
    assert.strictEqual(metrics[8].descriptor.name, QuickPulseMetricNames.EXCEPTION_RATE);
    assert.strictEqual(metrics[8].dataPoints.length, 1, "dataPoints count");
    assert.ok(metrics[5].dataPoints[0].value > 0, "EXCEPTION_RATE value");
  });

  it("should retrieve meter provider", () => {
    assert.ok(autoCollect.getMeterProvider());
  });

  it("should not collect when disabled", async () => {
    autoCollect.deactivateMetrics();
    await new Promise((resolve) => setTimeout(resolve, 120));
    assert.ok(exportStub.notCalled);
  });
});
