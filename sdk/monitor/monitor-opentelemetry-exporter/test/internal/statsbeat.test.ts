// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { ExportResultCode } from "@opentelemetry/core";
import { failedBreezeResponse, successfulBreezeResponse } from "../utils/breezeTestUtils";
import { DEFAULT_BREEZE_ENDPOINT, ENV_DISABLE_STATSBEAT } from "../../src/Declarations/Constants";
import nock from "nock";
import { NetworkStatsbeatMetrics } from "../../src/export/statsbeat/networkStatsbeatMetrics";
// @ts-ignore Need to ignore this while we do not import types
import sinon from "sinon";
import { StatsbeatCounter } from "../../src/export/statsbeat/types";
import { getInstance } from "../../src/export/statsbeat/longIntervalStatsbeatMetrics";
import { AzureMonitorTraceExporter } from "../../src/export/trace";

describe("#AzureMonitorStatsbeatExporter", () => {
  process.env.LONG_INTERVAL_EXPORT_MILLIS = "100";
  process.env.AZURE_MONITOR_STATSBEAT_FEATURES = JSON.stringify({
    // Represents DISKRETRY and AADHANDLING features enabled
    feature: 3,
    // Represents REDIS and MONGODB instrumentations enabled
    instrumentation: 10,
  });

  const options = {
    instrumentationKey: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;",
    endpointUrl: "IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com",
  };

  const exportOptions = {
    connectionString: `InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333`,
  };

  describe("Export/Statsbeat", () => {
    let scope: nock.Interceptor;
    const envelope = {
      name: "Name",
      time: new Date(),
    };

    before(() => {
      scope = nock(DEFAULT_BREEZE_ENDPOINT).post("/v2.1/track");
    });

    after(() => {
      nock.cleanAll();
    });

    describe("Initialization, shutdown, and connection string functions", () => {
      it("should pass the options to the exporter and create an HTTP sender", () => {
        const exporter = new AzureMonitorTraceExporter(exportOptions);
        assert.ok(exporter["sender"]);
        assert.ok(exporter["options"]);
      });
      it("should initialize statsbeat by default", async () => {
        const exporter = new AzureMonitorTraceExporter(exportOptions);
        const response = successfulBreezeResponse(1);
        scope.reply(200, JSON.stringify(response));

        const result = await exporter["sender"]["exportEnvelopes"]([envelope]);
        assert.strictEqual(result.code, ExportResultCode.SUCCESS);
        assert.ok(exporter["sender"]["networkStatsbeatMetrics"]);
        assert.strictEqual(exporter["sender"]["networkStatsbeatMetrics"]["isInitialized"], true);
      });

      it("should use non EU connection string", () => {
        const statsbeat = new NetworkStatsbeatMetrics({
          instrumentationKey: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;",
          endpointUrl: "IngestionEndpoint=https://westus-0.in.applicationinsights.azure.com",
        });
        assert.strictEqual(statsbeat["host"], "IngestionEndpoint=https://westus-0");
      });

      it("should use EU connection string", () => {
        const statsbeat = new NetworkStatsbeatMetrics(options);
        assert.strictEqual(statsbeat["host"], "IngestionEndpoint=https://westeurope-5");
      });

      it("getShortHost", () => {
        const statsbeat = new NetworkStatsbeatMetrics(options);
        assert.strictEqual(
          statsbeat["getShortHost"]("http://westus02-1.in.applicationinsights.azure.com"),
          "westus02"
        );
        assert.strictEqual(
          statsbeat["getShortHost"]("https://westus02-1.in.applicationinsights.azure.com"),
          "westus02"
        );
        assert.strictEqual(statsbeat["getShortHost"]("https://dc.services.visualstudio.com"), "dc");
        assert.strictEqual(statsbeat["getShortHost"]("https://www.test.com"), "test");
      });

      it("should add correct network properites to the custom metric", (done) => {
        const statsbeat = new NetworkStatsbeatMetrics(options);
        statsbeat["statsCollectionShortInterval"];
        statsbeat.countSuccess(100);
        const metric = statsbeat["networkStatsbeatCollection"][0];
        assert.strictEqual(metric.intervalRequestExecutionTime, 100);

        // Ensure network statsbeat attributes are populated
        assert.strictEqual(statsbeat["attach"], "sdk");
        assert.strictEqual(
          statsbeat["cikey"],
          "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;"
        );
        assert.strictEqual(statsbeat["language"], "node");
        assert.strictEqual(statsbeat["resourceProvider"], "unknown");
        assert.strictEqual(
          statsbeat["endpointUrl"],
          "IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com"
        );
        assert.ok(statsbeat["os"]);
        assert.ok(statsbeat["runtimeVersion"]);
        assert.ok(statsbeat["version"]);

        done();
      });

      it("should add correct long interval properties to the custom metric", async () => {
        // const exporter = new TestExporter();
        // const statsbeatMetrics = exporter["sender"]["networkStatsbeatMetrics"];
        const longIntervalStatsbeatMetrics = getInstance(options);
        // assert.ok(statsbeatMetrics);
        assert.ok(longIntervalStatsbeatMetrics);
        // Represents the bitwise OR of NONE and AADHANDLING features
        assert.strictEqual(longIntervalStatsbeatMetrics["feature"], 3);
        // Represents the bitwise OR of MONGODB and REDIS instrumentations
        assert.strictEqual(longIntervalStatsbeatMetrics["instrumentation"], 10);
        assert.strictEqual(longIntervalStatsbeatMetrics["attachProperties"].rpId, undefined);
      });

      it("should turn off statsbeat after max failures", async () => {
        const exporter = new AzureMonitorTraceExporter(exportOptions);
        const response = failedBreezeResponse(1, 200);
        scope.reply(200, JSON.stringify(response));
        exporter["sender"]["statsbeatFailureCount"] = 4;

        const result = await exporter["sender"]["exportEnvelopes"]([envelope]);
        assert.strictEqual(result.code, ExportResultCode.SUCCESS);
      });
    });

    describe("Resource provider function", () => {
      let sandbox: any;

      before(() => {
        sandbox = sinon.createSandbox();
      });

      afterEach(() => {
        sandbox.restore();
      });

      const statsbeat = new NetworkStatsbeatMetrics(options);

      it("it should determine if the rp is unknown", (done) => {
        statsbeat["getResourceProvider"]()
          .then(() => {
            assert.strictEqual(statsbeat["resourceProvider"], "unknown");
            done();
          })
          .catch((error: Error) => {
            done(error);
          });
      });

      it("it should determine if the rp is an app service", (done) => {
        const newEnv = <{ [id: string]: string }>{};
        newEnv["WEBSITE_SITE_NAME"] = "Test Website";
        newEnv["WEBSITE_HOME_STAMPNAME"] = "testhome";
        const originalEnv = process.env;
        process.env = newEnv;
        statsbeat["getResourceProvider"]()
          .then(() => {
            process.env = originalEnv;
            assert.strictEqual(statsbeat["resourceProvider"], "appsvc");
            done();
          })
          .catch((error: Error) => {
            done(error);
          });
      });

      it("should determine if the rp is an Azure Function", (done) => {
        const newEnv = <{ [id: string]: string }>{};
        newEnv["FUNCTIONS_WORKER_RUNTIME"] = "test";
        newEnv["WEBSITE_HOSTNAME"] = "testhost";
        const originalEnv = process.env;
        process.env = newEnv;
        statsbeat["getResourceProvider"]()
          .then(() => {
            process.env = originalEnv;
            assert.strictEqual(statsbeat["resourceProvider"], "functions");
            done();
          })
          .catch((error: Error) => {
            done(error);
          });
      });

      it("should determine if the rp is an Azure VM", (done) => {
        const getAzureComputeStub = sandbox.stub(statsbeat, "getAzureComputeMetadata");
        getAzureComputeStub.returns(Promise.resolve(true));

        const newEnv = <{ [id: string]: string }>{};
        const originalEnv = process.env;
        process.env = newEnv;

        statsbeat["getResourceProvider"]()
          .then(() => {
            process.env = originalEnv;
            assert.strictEqual(statsbeat["resourceProvider"], "vm");
            done();
          })
          .catch((error: Error) => {
            done(error);
          });
      });

      it("should override OS and VM info", (done) => {
        const getAzureComputeStub = sandbox.stub(statsbeat, "getAzureComputeMetadata");
        getAzureComputeStub.returns(Promise.resolve(true));
        statsbeat["vmInfo"]["osType"] = "test";

        const newEnv = <{ [id: string]: string }>{};
        const originalEnv = process.env;
        process.env = newEnv;

        statsbeat["getResourceProvider"]()
          .then(() => {
            process.env = originalEnv;
            assert.strictEqual(statsbeat["resourceProvider"], "vm");
            assert.strictEqual(statsbeat["os"], "test");
            done();
          })
          .catch((error: Error) => {
            done(error);
          });
      });
    });

    describe("Track data from statsbeats", () => {
      let sandbox: sinon.SinonSandbox;
      let statsbeat: NetworkStatsbeatMetrics;

      before(() => {
        sandbox = sinon.createSandbox();
        process.env.WEBSITE_SITE_NAME = "test";
        statsbeat = new NetworkStatsbeatMetrics({
          ...options,
          networkCollectionInterval: 100,
        });
      });

      afterEach(() => {
        sandbox.restore();
      });

      after(() => {
        statsbeat.shutdown();
        process.env.WEBSITE_SITE_NAME = undefined;
      });

      it("should track duration", async () => {
        const mockExport = sandbox.stub(statsbeat["networkAzureExporter"], "export");
        statsbeat.countSuccess(100);
        statsbeat.countRetry(206);
        statsbeat.countFailure(200, 500);
        statsbeat.countThrottle(402);
        statsbeat.countException({ name: "Statsbeat", message: "Statsbeat Exception" });

        await new Promise((resolve) => setTimeout(resolve, 120));
        assert.ok(mockExport.called);
        const resourceMetrics = mockExport.args[0][0];
        const scopeMetrics = resourceMetrics.scopeMetrics;
        assert.strictEqual(scopeMetrics.length, 1, "Scope Metrics count");
        const metrics = scopeMetrics[0].metrics;
        assert.strictEqual(metrics.length, 6, "Metrics count");
        assert.strictEqual(metrics[0].descriptor.name, StatsbeatCounter.SUCCESS_COUNT);
        assert.strictEqual(metrics[1].descriptor.name, StatsbeatCounter.FAILURE_COUNT);
        assert.strictEqual(metrics[2].descriptor.name, StatsbeatCounter.RETRY_COUNT);
        assert.strictEqual(metrics[3].descriptor.name, StatsbeatCounter.THROTTLE_COUNT);
        assert.strictEqual(metrics[4].descriptor.name, StatsbeatCounter.EXCEPTION_COUNT);
        assert.strictEqual(metrics[5].descriptor.name, StatsbeatCounter.AVERAGE_DURATION);

        // Test that average duration is exported.
        assert.strictEqual(metrics[5].dataPoints[0].value, 150);
      });

      it("should track statsbeat counts", async () => {
        const mockExport = sandbox.stub(statsbeat["networkAzureExporter"], "export");
        statsbeat.countSuccess(100);
        statsbeat.countSuccess(100);
        statsbeat.countSuccess(100);
        statsbeat.countSuccess(100);
        statsbeat.countFailure(200, 500);
        statsbeat.countFailure(100, 500);
        statsbeat.countFailure(200, 501);
        statsbeat.countFailure(200, 502);
        statsbeat.countRetry(206);
        statsbeat.countRetry(206);
        statsbeat.countRetry(204);
        statsbeat.countThrottle(402);
        statsbeat.countThrottle(439);
        statsbeat.countException({ name: "Statsbeat", message: "Statsbeat Exception" });
        statsbeat.countException({ name: "Statsbeat2", message: "Second Statsbeat Exception" });

        await new Promise((resolve) => setTimeout(resolve, 500));
        assert.ok(mockExport.called);
        const resourceMetrics = mockExport.args[0][0];
        const scopeMetrics = resourceMetrics.scopeMetrics;
        const metrics = scopeMetrics[0].metrics;

        assert.ok(metrics, "Statsbeat metrics not properly initialized");
        assert.strictEqual(metrics.length, 6);
        // Represents the last observation called for each callback
        // Successful
        assert.strictEqual(metrics[0].dataPoints[0].value, 4);

        // Failed
        assert.strictEqual(metrics[1].dataPoints[0].value, 2);
        assert.strictEqual(metrics[1].dataPoints[0].attributes.statusCode, 500);

        assert.strictEqual(metrics[1].dataPoints[1].value, 1);
        assert.strictEqual(metrics[1].dataPoints[1].attributes.statusCode, 501);

        assert.strictEqual(metrics[1].dataPoints[2].value, 1);
        assert.strictEqual(metrics[1].dataPoints[2].attributes.statusCode, 502);

        // Retry
        assert.strictEqual(metrics[2].dataPoints[0].value, 2);
        assert.strictEqual(metrics[2].dataPoints[0].attributes.statusCode, 206);

        assert.strictEqual(metrics[2].dataPoints[1].value, 1);
        assert.strictEqual(metrics[2].dataPoints[1].attributes.statusCode, 204);

        // Throttle
        assert.strictEqual(metrics[3].dataPoints[0].value, 1);
        assert.strictEqual(metrics[3].dataPoints[0].attributes.statusCode, 402);

        assert.strictEqual(metrics[3].dataPoints[1].value, 1);
        assert.strictEqual(metrics[3].dataPoints[1].attributes.statusCode, 439);

        // Exception
        assert.strictEqual(metrics[4].dataPoints[0].value, 1);
        assert.strictEqual(metrics[4].dataPoints[0].attributes.exceptionType, "Statsbeat");

        assert.strictEqual(metrics[4].dataPoints[1].value, 1);
        assert.strictEqual(metrics[4].dataPoints[1].attributes.exceptionType, "Statsbeat2");

        // Average Duration
        assert.strictEqual(metrics[5].dataPoints[0].value, 137.5);
      });

      it("should track long interval statsbeats", async () => {
        const longIntervalStatsbeat = getInstance(options);
        const mockExport = sandbox.stub(
          longIntervalStatsbeat["longIntervalAzureExporter"],
          "export"
        );

        await new Promise((resolve) => setTimeout(resolve, 120));
        assert.ok(mockExport.called);
        const resourceMetrics = mockExport.args[0][0];
        const scopeMetrics = resourceMetrics.scopeMetrics;
        assert.strictEqual(scopeMetrics.length, 1, "Scope Metrics count");
        const metrics = scopeMetrics[0].metrics;
        assert.strictEqual(metrics.length, 2, "Metrics count");
        assert.strictEqual(metrics[0].descriptor.name, StatsbeatCounter.FEATURE);
        assert.strictEqual(metrics[1].descriptor.name, StatsbeatCounter.ATTACH);

        // Clean up env variables
        delete process.env.STATSBEAT_INSTRUMENTATIONS;
        delete process.env.STATSBEAT_FEATURES;
        delete process.env.LONG_INTERVAL_EXPORT_MILLIS;
      });
    });

    describe("Disable Statsbeat", () => {
      it("should disable statsbeat when the environement variable is set", () => {
        process.env[ENV_DISABLE_STATSBEAT] = "true";
        const exporter = new AzureMonitorTraceExporter(exportOptions);
        assert.ok(!exporter["sender"]["networkStatsbeatMetrics"]);
        assert.ok(!exporter["sender"]["longIntervalStatsbeatMetrics"]);
        delete process.env[ENV_DISABLE_STATSBEAT];
      });
    });
  });
});
