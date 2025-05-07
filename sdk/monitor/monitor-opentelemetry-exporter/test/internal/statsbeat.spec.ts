// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ExportResultCode } from "@opentelemetry/core";
import { failedBreezeResponse, successfulBreezeResponse } from "../utils/breezeTestUtils.js";
import {
  DEFAULT_BREEZE_ENDPOINT,
  ENV_DISABLE_STATSBEAT,
  LEGACY_ENV_DISABLE_STATSBEAT,
} from "../../src/Declarations/Constants.js";
import nock from "nock";
import { NetworkStatsbeatMetrics } from "../../src/export/statsbeat/networkStatsbeatMetrics.js";
import { AZURE_MONITOR_AUTO_ATTACH, StatsbeatCounter } from "../../src/export/statsbeat/types.js";
import { getInstance } from "../../src/export/statsbeat/longIntervalStatsbeatMetrics.js";
import { getInstance as getContext } from "../../src/platform/nodejs/context/context.js";
import { AzureMonitorTraceExporter } from "../../src/export/trace.js";
import { diag } from "@opentelemetry/api";
import { describe, it, assert, expect, vi, beforeAll, afterAll } from "vitest";

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

  const disableOfflineStorageOptions = {
    connectionString: `InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333`,
    disableOfflineStorage: true,
  };

  describe("Export/Statsbeat", () => {
    let scope: nock.Interceptor;
    const envelope = {
      name: "Name",
      time: new Date(),
    };

    beforeAll(() => {
      scope = nock(DEFAULT_BREEZE_ENDPOINT).post("/v2.1/track");

      it("should wait 15 seconds from startup to export long interval statsbeat", async () => {
        const longIntervalStatsbeat = getInstance(options);
        const mockExport = vi.spyOn(longIntervalStatsbeat["longIntervalAzureExporter"], "export");
        longIntervalStatsbeat["initialize"]();
        expect(mockExport).not.toHaveBeenCalled();
        setTimeout(async () => {
          expect(mockExport).toHaveBeenCalled();
        }, 15000);
      });
    });

    afterAll(() => {
      vi.restoreAllMocks();
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
        assert.strictEqual(
          exporter?.["sender"]?.["networkStatsbeatMetrics"]?.["isInitialized"],
          true,
        );
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
          "westus02",
        );
        assert.strictEqual(
          statsbeat["getShortHost"]("https://westus02-1.in.applicationinsights.azure.com"),
          "westus02",
        );
        assert.strictEqual(statsbeat["getShortHost"]("https://dc.services.visualstudio.com"), "dc");
        assert.strictEqual(statsbeat["getShortHost"]("https://www.test.com"), "test");
      });

      it("should add correct network properties to the custom metric", () => {
        const statsbeat = new NetworkStatsbeatMetrics(options);
        // eslint-disable-next-line no-unused-expressions
        statsbeat["statsCollectionShortInterval"];
        statsbeat.countSuccess(100);
        const metric = statsbeat["networkStatsbeatCollection"][0];
        assert.strictEqual(metric.intervalRequestExecutionTime, 100);
        assert.strictEqual(metric.totalSuccessfulRequestCount, 1);

        // Ensure network statsbeat attributes are populated
        assert.strictEqual(statsbeat["attach"], "Manual");
        assert.strictEqual(
          statsbeat["cikey"],
          "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;",
        );
        assert.strictEqual(statsbeat["language"], "node");
        assert.strictEqual(statsbeat["resourceProvider"], "unknown");
        assert.strictEqual(
          statsbeat["endpointUrl"],
          "IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com",
        );
        assert.ok(statsbeat["os"]);
        assert.ok(statsbeat["runtimeVersion"]);
        assert.ok(statsbeat["version"]);
      });

      it("should add correct attach value to the attach metric", () => {
        const originalEnv = process.env;
        const newEnv = <{ [id: string]: string }>{};
        process.env = newEnv;
        newEnv[AZURE_MONITOR_AUTO_ATTACH] = "true";
        const statsbeat = new NetworkStatsbeatMetrics(options);
        // eslint-disable-next-line no-unused-expressions
        statsbeat["statsCollectionShortInterval"];
        statsbeat.countSuccess(100);
        const metric = statsbeat["networkStatsbeatCollection"][0];
        assert.strictEqual(metric.intervalRequestExecutionTime, 100);

        // Ensure network statsbeat attributes are populated
        assert.strictEqual(statsbeat["attach"], "IntegratedAuto");
        assert.ok(getContext().tags["ai.internal.sdkVersion"]);
        process.env = originalEnv;
      });

      it("should set common properties correctly", () => {
        const originalEnv = process.env;
        const newEnv = <{ [id: string]: string }>{};
        newEnv.WEBSITE_SITE_NAME = "test";
        process.env = newEnv;
        const statsbeat = new NetworkStatsbeatMetrics(options);
        assert.strictEqual(statsbeat["commonProperties"]["rp"], "appsvc");
        process.env = originalEnv;
      });

      it("should add correct long interval properties to the custom metric", () => {
        const longIntervalStatsbeatMetrics = getInstance(options);
        assert.ok(longIntervalStatsbeatMetrics);
        // Represents the bitwise OR of NONE and AADHANDLING features
        assert.strictEqual(longIntervalStatsbeatMetrics["feature"], 3);
        // Represents the bitwise OR of MONGODB and REDIS instrumentations
        assert.strictEqual(longIntervalStatsbeatMetrics["instrumentation"], 10);
        assert.strictEqual(longIntervalStatsbeatMetrics["attachProperties"].rpId, "");
      });

      it("should turn off statsbeat after max failures", async () => {
        const exporter = new AzureMonitorTraceExporter(exportOptions);
        const response = failedBreezeResponse(1, 200);
        scope.reply(200, JSON.stringify(response));
        exporter["sender"]["statsbeatFailureCount"] = 4;

        const result = await exporter["sender"]["exportEnvelopes"]([envelope]);
        assert.strictEqual(result.code, ExportResultCode.SUCCESS);
      });

      it("should not log error upon failed send if statsbeat is being sent", async () => {
        const mockExport = vi.spyOn(diag, "error");
        const exporter = new AzureMonitorTraceExporter(exportOptions);
        const response = failedBreezeResponse(1, 500);
        scope.reply(500, JSON.stringify(response));
        exporter["sender"]["isStatsbeatSender"] = true;
        await exporter["sender"]["exportEnvelopes"]([envelope]);
        expect(mockExport).not.toHaveBeenCalled();
      });
    });

    it("should mark statsbeat exporters as disableOfflineStorage when in the config", async () => {
      const exporter = new AzureMonitorTraceExporter(disableOfflineStorageOptions);
      const response = failedBreezeResponse(1, 502);
      scope.reply(200, JSON.stringify(response));
      exporter["sender"]["disableOfflineStorage"] = true;

      const result = await exporter["sender"]["exportEnvelopes"]([envelope]);
      assert.strictEqual(result.code, ExportResultCode.SUCCESS);
    });

    describe("Resource provider function", () => {
      const statsbeat = new NetworkStatsbeatMetrics(options);

      it("it should determine if the rp is unknown", async () => {
        await statsbeat["getResourceProvider"]();
        assert.strictEqual(statsbeat["resourceProvider"], "unknown");
      });

      it("it should determine if the rp is an app service", async () => {
        const newEnv = <{ [id: string]: string }>{};
        newEnv["WEBSITE_SITE_NAME"] = "Test Website";
        newEnv["WEBSITE_HOME_STAMPNAME"] = "testhome";
        const originalEnv = process.env;
        process.env = newEnv;
        await statsbeat["getResourceProvider"]();
        process.env = originalEnv;
        assert.strictEqual(statsbeat["resourceProvider"], "appsvc");
        assert.strictEqual(statsbeat["resourceIdentifier"], "Test Website/testhome");
      });

      it("should determine if the rp is an Azure Function", async () => {
        const newEnv = <{ [id: string]: string }>{};
        newEnv["FUNCTIONS_WORKER_RUNTIME"] = "test";
        newEnv["WEBSITE_HOSTNAME"] = "testhost";
        const originalEnv = process.env;
        process.env = newEnv;
        await statsbeat["getResourceProvider"]();
        process.env = originalEnv;
        assert.strictEqual(statsbeat["resourceProvider"], "functions");
        assert.strictEqual(statsbeat["resourceIdentifier"], "testhost");
      });

      it("should determine if the rp is an Azure VM", async () => {
        const getAzureComputeStub = vi.spyOn(statsbeat, "getAzureComputeMetadata");
        getAzureComputeStub.mockResolvedValue(true);

        const newEnv = <{ [id: string]: string }>{};
        const originalEnv = process.env;
        process.env = newEnv;

        await statsbeat["getResourceProvider"]();
        process.env = originalEnv;
        assert.strictEqual(statsbeat["resourceProvider"], "vm");
        assert.strictEqual(statsbeat["resourceIdentifier"], "undefined/undefined");
      });

      it("should determine if the rp is AKS", async () => {
        const newEnv = <{ [id: string]: string }>{};
        newEnv["AKS_ARM_NAMESPACE_ID"] = "testaks";
        const originalEnv = process.env;
        process.env = newEnv;

        await statsbeat["getResourceProvider"]();
        process.env = originalEnv;
        assert.strictEqual(statsbeat["resourceProvider"], "aks");
        assert.strictEqual(statsbeat["resourceIdentifier"], "testaks");
      });

      it("should override OS and VM info", async () => {
        const getAzureComputeStub = vi.spyOn(statsbeat, "getAzureComputeMetadata");
        getAzureComputeStub.mockResolvedValue(true);
        statsbeat["vmInfo"]["osType"] = "test";

        const newEnv = <{ [id: string]: string }>{};
        const originalEnv = process.env;
        process.env = newEnv;

        await statsbeat["getResourceProvider"]();
        process.env = originalEnv;
        assert.strictEqual(statsbeat["resourceProvider"], "vm");
        assert.strictEqual(statsbeat["os"], "test");
      });
    });

    describe("Track data from statsbeats", () => {
      let statsbeat: NetworkStatsbeatMetrics;

      beforeAll(() => {
        process.env.WEBSITE_SITE_NAME = "test";
        statsbeat = new NetworkStatsbeatMetrics({
          ...options,
          networkCollectionInterval: 100,
        });
      });

      afterAll(async () => {
        await statsbeat.shutdown();
        process.env.WEBSITE_SITE_NAME = undefined;
      });

      it("should track duration", async () => {
        const mockExport = vi.spyOn(statsbeat["networkAzureExporter"], "export");
        statsbeat.countSuccess(100);
        statsbeat.countRetry(206);
        statsbeat.countFailure(200, 500);
        statsbeat.countThrottle(402);
        statsbeat.countException({ name: "Statsbeat", message: "Statsbeat Exception" });

        await new Promise((resolve) => setTimeout(resolve, 120));
        expect(mockExport).toHaveBeenCalled();
        const resourceMetrics = mockExport.mock.calls[0][0];
        const scopeMetrics = resourceMetrics.scopeMetrics;
        assert.strictEqual(scopeMetrics.length, 1, "Scope Metrics count");
        const metrics = scopeMetrics[0].metrics;
        assert.strictEqual(metrics.length, 8, "Metrics count");
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
        const mockExport = vi.spyOn(statsbeat["networkAzureExporter"], "export");
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
        statsbeat.countReadFailure();
        statsbeat.countWriteFailure();
        statsbeat.countWriteFailure();

        await new Promise((resolve) => setTimeout(resolve, 500));
        expect(mockExport).toHaveBeenCalled();
        const resourceMetrics = mockExport.mock.calls[0][0];
        const scopeMetrics = resourceMetrics.scopeMetrics;
        const metrics = scopeMetrics[0].metrics;

        assert.ok(metrics, "Statsbeat metrics not properly initialized");
        assert.strictEqual(metrics.length, 8);
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

        // Disk Read Failure
        assert.strictEqual(metrics[6].dataPoints[0].value, 1);

        // Disk Write Failure
        assert.strictEqual(metrics[7].dataPoints[0].value, 2);
      });

      it("should track long interval statsbeats", async () => {
        const longIntervalStatsbeat = getInstance(options);
        const mockExport = vi.spyOn(longIntervalStatsbeat["longIntervalAzureExporter"], "export");

        await new Promise((resolve) => setTimeout(resolve, 120));
        expect(mockExport).toHaveBeenCalled();
        const resourceMetrics = mockExport.mock.calls[0][0];
        const scopeMetrics = resourceMetrics.scopeMetrics;
        assert.strictEqual(scopeMetrics.length, 1, "Scope Metrics count");
        const metrics = scopeMetrics[0].metrics;
        assert.strictEqual(metrics.length, 2, "Metrics count");
        assert.strictEqual(metrics[0].descriptor.name, StatsbeatCounter.FEATURE);
        assert.strictEqual(metrics[1].descriptor.name, StatsbeatCounter.ATTACH);
        // Instrumentation statsbeat
        assert.strictEqual(metrics[0].dataPoints[0].attributes.type, 1);
        // Feature statsbeat
        assert.strictEqual(metrics[0].dataPoints[1].attributes.type, 0);

        // Clean up env variables
        delete process.env.STATSBEAT_INSTRUMENTATIONS;
        delete process.env.STATSBEAT_FEATURES;
        delete process.env.LONG_INTERVAL_EXPORT_MILLIS;
      });
    });

    describe("Disable Non-Essential Statsbeat", () => {
      it("should disable statsbeat when the environment variable is set", () => {
        process.env[ENV_DISABLE_STATSBEAT] = "true";
        const exporter = new AzureMonitorTraceExporter(exportOptions);
        assert.ok(exporter["sender"]["networkStatsbeatMetrics"]);
        assert.ok(!exporter["sender"]["networkStatsbeatMetrics"]?.["readFailureGauge"]);
        assert.ok(!exporter["sender"]["networkStatsbeatMetrics"]?.["writeFailureGauge"]);
        delete process.env[ENV_DISABLE_STATSBEAT];
      });

      it("should disable all statsbeat when the legacy environment variable is set", () => {
        process.env[LEGACY_ENV_DISABLE_STATSBEAT] = "true";
        const exporter = new AzureMonitorTraceExporter(exportOptions);
        assert.ok(!exporter["sender"]["networkStatsbeatMetrics"]);
        assert.ok(!exporter["sender"]["longIntervalStatsbeatMetrics"]);
        delete process.env[LEGACY_ENV_DISABLE_STATSBEAT];
      });
    });
  });
});
