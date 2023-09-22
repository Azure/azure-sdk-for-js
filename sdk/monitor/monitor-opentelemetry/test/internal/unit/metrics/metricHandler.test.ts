// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import * as sinon from "sinon";
import { MetricHandler } from "../../../../src/metrics";
import { InternalConfig } from "../../../../src/shared";
import { ExportResultCode } from "@opentelemetry/core";
import { metrics as MetricsApi, metrics } from "@opentelemetry/api";

describe("MetricHandler", () => {
  let originalEnv: NodeJS.ProcessEnv;
  let sandbox: sinon.SinonSandbox;
  let handler: MetricHandler;
  let exportStub: sinon.SinonStub;
  const _config = new InternalConfig();
  if (_config.azureMonitorExporterOptions) {
    _config.azureMonitorExporterOptions.connectionString =
      "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
  }

  beforeEach(() => {
    originalEnv = process.env;
  });

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    process.env = originalEnv;
    handler.shutdown();
    metrics.disable();
    sandbox.restore();
  });

  function createHandler() {
    handler = new MetricHandler(_config, {
      collectionInterval: 100,
    });
    exportStub = sinon.stub(handler["_azureExporter"], "export").callsFake(
      (result: any, resultCallback: any) =>
        new Promise((resolve) => {
          resultCallback({
            code: ExportResultCode.SUCCESS,
          });
          resolve(result);
        })
    );
  }

  it("should create a meterProvider", () => {
    createHandler();
    assert.ok(MetricsApi.getMeterProvider(), "meterProvider not available");
  });

  it("should observe instruments during collection", async () => {
    createHandler();
    MetricsApi.getMeter("testMeter").createCounter("testCounter", {
      description: "testDescription",
    });
    await new Promise((resolve) => setTimeout(resolve, 120));
    assert.ok(exportStub.called);
    const resourceMetrics = exportStub.args[0][0];
    const scopeMetrics = resourceMetrics.scopeMetrics;
    assert.strictEqual(scopeMetrics.length, 1, "scopeMetrics count");
    const metrics = scopeMetrics[0].metrics;
    assert.strictEqual(metrics.length, 1, "metrics count");
    assert.strictEqual(metrics[0].descriptor.name, "testCounter");
    assert.strictEqual(metrics[0].descriptor.description, "testDescription");
  });

  it("should not collect when disabled", async () => {
    createHandler();
    MetricsApi.getMeter("testMeter").createCounter("testCounter", {
      description: "testDescription",
    });
    handler.shutdown();
    await new Promise((resolve) => setTimeout(resolve, 120));
    assert.ok(exportStub.notCalled);
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
      env["APPLICATION_INSIGHTS_NO_STANDARD_METRICS"] = "something";
      process.env = env;
      createHandler();
      assert.ok(!handler["_standardMetrics"], "Standard metrics loaded");
    });
  });
});
