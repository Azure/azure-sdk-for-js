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
import { LongIntervalStatsbeatMetrics } from "../../src/export/statsbeat/longIntervalStatsbeatMetrics.js";
import { getInstance as getContext } from "../../src/platform/nodejs/context/context.js";
import { AzureMonitorTraceExporter } from "../../src/export/trace.js";
import { diag } from "@opentelemetry/api";
import {
  describe,
  it,
  assert,
  expect,
  vi,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from "vitest";

describe("#AzureMonitorStatsbeatExporter", () => {
  process.env.LONG_INTERVAL_EXPORT_MILLIS = "100";
  process.env.AZURE_MONITOR_STATSBEAT_FEATURES = JSON.stringify({
    // Represents DISKRETRY and AADHANDLING features enabled
    feature: 3,
    // Represents REDIS and MONGODB instrumentations enabled
    instrumentation: 10,
  });

  const options = {
    instrumentationKey: "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
    endpointUrl: "https://westeurope-5.in.applicationinsights.azure.com",
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
        const longIntervalStatsbeat = LongIntervalStatsbeatMetrics.getInstance(options);
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
        // Reset singleton to test with different options
        (NetworkStatsbeatMetrics as any).instance = null;
        const statsbeat = NetworkStatsbeatMetrics.getInstance({
          instrumentationKey: "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
          endpointUrl: "https://westus-0.in.applicationinsights.azure.com",
        });
        assert.strictEqual(statsbeat["host"], "westus");
      });

      it("should use EU connection string", () => {
        // Reset singleton to test with different options
        (NetworkStatsbeatMetrics as any).instance = null;
        const statsbeat = NetworkStatsbeatMetrics.getInstance(options);
        assert.strictEqual(statsbeat["host"], "westeurope");
      });

      it("getShortHost", () => {
        const statsbeat = NetworkStatsbeatMetrics.getInstance(options);
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
        const statsbeat = NetworkStatsbeatMetrics.getInstance(options);
        // Clear any existing state
        statsbeat["networkStatsbeatCollection"] = [];
        // eslint-disable-next-line no-unused-expressions
        statsbeat["statsCollectionShortInterval"];
        statsbeat.countSuccess(100);
        const metric = statsbeat["networkStatsbeatCollection"][0];
        assert.strictEqual(metric.intervalRequestExecutionTime, 100);
        assert.strictEqual(metric.totalSuccessfulRequestCount, 1);

        // Ensure network statsbeat attributes are populated
        assert.strictEqual(statsbeat["attach"], "Manual");
        assert.strictEqual(statsbeat["cikey"], "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333");
        assert.strictEqual(statsbeat["language"], "node");
        assert.strictEqual(statsbeat["resourceProvider"], "unknown");
        assert.strictEqual(
          statsbeat["endpointUrl"],
          "https://westeurope-5.in.applicationinsights.azure.com",
        );
        assert.ok(statsbeat["os"]);
        assert.ok(statsbeat["runtimeVersion"]);
        assert.ok(statsbeat["version"]);
      });

      it("should add correct attach value to the attach metric", async () => {
        const originalEnv = process.env;
        const newEnv = <{ [id: string]: string }>{};
        process.env = newEnv;
        newEnv[AZURE_MONITOR_AUTO_ATTACH] = "true";

        // Reset singleton to pick up new environment variable
        (NetworkStatsbeatMetrics as any).instance = null;
        const statsbeat = NetworkStatsbeatMetrics.getInstance(options);
        try {
          // Clear any existing state
          statsbeat["networkStatsbeatCollection"] = [];
          // eslint-disable-next-line no-unused-expressions
          statsbeat["statsCollectionShortInterval"];
          statsbeat.countSuccess(100);
          const metric = statsbeat["networkStatsbeatCollection"][0];
          assert.strictEqual(metric.intervalRequestExecutionTime, 100);

          // Ensure network statsbeat attributes are populated
          assert.strictEqual(statsbeat["attach"], "IntegratedAuto");
          assert.ok(getContext().tags["ai.internal.sdkVersion"]);
        } finally {
          process.env = originalEnv;
          await statsbeat.shutdown();
        }
      });

      it("should set common properties correctly", async () => {
        const originalEnv = process.env;
        const newEnv = <{ [id: string]: string }>{};
        newEnv.WEBSITE_SITE_NAME = "test";
        process.env = newEnv;
        // Reset the singleton to pick up new environment
        (NetworkStatsbeatMetrics as any).instance = null;
        const statsbeat = NetworkStatsbeatMetrics.getInstance(options);
        try {
          assert.strictEqual(statsbeat["commonProperties"]["rp"], "appsvc");
        } finally {
          process.env = originalEnv;
          // Reset singleton again for clean state
          (NetworkStatsbeatMetrics as any).instance = null;
          await statsbeat.shutdown();
        }
      });

      it("should add correct long interval properties to the custom metric", () => {
        const longIntervalStatsbeatMetrics = LongIntervalStatsbeatMetrics.getInstance(options);
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
      let statsbeat: NetworkStatsbeatMetrics;

      beforeEach(() => {
        statsbeat = NetworkStatsbeatMetrics.getInstance(options);
      });

      afterEach(async () => {
        await statsbeat.shutdown();
      });

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

    describe("App Service and Azure Functions Detection", () => {
      let statsbeat: NetworkStatsbeatMetrics;

      beforeEach(() => {
        statsbeat = NetworkStatsbeatMetrics.getInstance(options);
      });

      afterEach(async () => {
        await statsbeat.shutdown();
      });

      describe("isAppService() detection", () => {
        it("should detect App Service with WEBSITE_SITE_NAME but no FUNCTIONS_WORKER_RUNTIME", async () => {
          const newEnv = <{ [id: string]: string }>{};
          newEnv["WEBSITE_SITE_NAME"] = "my-test-webapp";
          // Explicitly do not set FUNCTIONS_WORKER_RUNTIME
          const originalEnv = process.env;
          process.env = newEnv;

          await statsbeat["getResourceProvider"]();

          process.env = originalEnv;
          assert.strictEqual(statsbeat["resourceProvider"], "appsvc");
          assert.strictEqual(statsbeat["resourceIdentifier"], "my-test-webapp");
        });

        it("should include home stamp name in resource identifier when available", async () => {
          const newEnv = <{ [id: string]: string }>{};
          newEnv["WEBSITE_SITE_NAME"] = "my-test-webapp";
          newEnv["WEBSITE_HOME_STAMPNAME"] = "waws-prod-test-001";
          const originalEnv = process.env;
          process.env = newEnv;

          await statsbeat["getResourceProvider"]();

          process.env = originalEnv;
          assert.strictEqual(statsbeat["resourceProvider"], "appsvc");
          assert.strictEqual(statsbeat["resourceIdentifier"], "my-test-webapp/waws-prod-test-001");
        });

        it("should not detect App Service when WEBSITE_SITE_NAME is missing", async () => {
          const newEnv = <{ [id: string]: string }>{};
          newEnv["WEBSITE_HOME_STAMPNAME"] = "waws-prod-test-001";
          // No WEBSITE_SITE_NAME
          const originalEnv = process.env;
          process.env = newEnv;

          await statsbeat["getResourceProvider"]();

          process.env = originalEnv;
          // When no specific environment variables are set, it falls back to VM detection
          assert.strictEqual(statsbeat["resourceProvider"], "vm");
        });
      });

      describe("isFunctionApp() detection", () => {
        it("should detect Azure Functions with both required environment variables", async () => {
          const newEnv = <{ [id: string]: string }>{};
          newEnv["WEBSITE_SITE_NAME"] = "my-function-app";
          newEnv["FUNCTIONS_WORKER_RUNTIME"] = "node";
          newEnv["WEBSITE_HOSTNAME"] = "my-function-app.azurewebsites.net";
          const originalEnv = process.env;
          process.env = newEnv;

          await statsbeat["getResourceProvider"]();

          process.env = originalEnv;
          assert.strictEqual(statsbeat["resourceProvider"], "functions");
          assert.strictEqual(statsbeat["resourceIdentifier"], "my-function-app.azurewebsites.net");
        });

        it("should detect Azure Functions with different worker runtimes", async () => {
          const runtimes = ["node", "python", "dotnet", "java", "powershell"];

          for (const runtime of runtimes) {
            const newEnv = <{ [id: string]: string }>{};
            newEnv["WEBSITE_SITE_NAME"] = `my-${runtime}-function`;
            newEnv["FUNCTIONS_WORKER_RUNTIME"] = runtime;
            newEnv["WEBSITE_HOSTNAME"] = `my-${runtime}-function.azurewebsites.net`;
            const originalEnv = process.env;
            process.env = newEnv;

            // Create a new instance for each test to avoid state pollution
            const testStatsbeat = NetworkStatsbeatMetrics.getInstance(options);
            await testStatsbeat["getResourceProvider"]();

            process.env = originalEnv;
            assert.strictEqual(testStatsbeat["resourceProvider"], "functions");
            assert.strictEqual(
              testStatsbeat["resourceIdentifier"],
              `my-${runtime}-function.azurewebsites.net`,
            );

            await testStatsbeat.shutdown();
          }
        });

        it("should not detect Functions when FUNCTIONS_WORKER_RUNTIME is missing", async () => {
          const newEnv = <{ [id: string]: string }>{};
          newEnv["WEBSITE_SITE_NAME"] = "my-function-app";
          newEnv["WEBSITE_HOSTNAME"] = "my-function-app.azurewebsites.net";
          // No FUNCTIONS_WORKER_RUNTIME
          const originalEnv = process.env;
          process.env = newEnv;

          await statsbeat["getResourceProvider"]();

          process.env = originalEnv;
          // Should be detected as App Service instead
          assert.strictEqual(statsbeat["resourceProvider"], "appsvc");
        });

        it("should handle missing WEBSITE_HOSTNAME gracefully", async () => {
          const newEnv = <{ [id: string]: string }>{};
          newEnv["WEBSITE_SITE_NAME"] = "my-function-app";
          newEnv["FUNCTIONS_WORKER_RUNTIME"] = "node";
          // No WEBSITE_HOSTNAME
          const originalEnv = process.env;
          process.env = newEnv;
          // Explicitly delete WEBSITE_HOSTNAME to ensure it's not set
          delete process.env.WEBSITE_HOSTNAME;

          // Create a fresh instance to avoid any caching issues
          const testOptions = {
            instrumentationKey: "1bb22222-cccc-2ddd-9eee-ffffff4444",
            endpointUrl: "https://westeurope-5.in.applicationinsights.azure.com",
          };
          const testStatsbeat = NetworkStatsbeatMetrics.getInstance(testOptions);
          await testStatsbeat["getResourceProvider"]();

          process.env = originalEnv;
          assert.strictEqual(testStatsbeat["resourceProvider"], "functions");
          assert.strictEqual(testStatsbeat["resourceIdentifier"], "my-function-app");

          await testStatsbeat.shutdown();
        });
      });

      describe("Priority and edge cases", () => {
        it("should prioritize AKS detection over App Service", async () => {
          const newEnv = <{ [id: string]: string }>{};
          newEnv["AKS_ARM_NAMESPACE_ID"] =
            "/subscriptions/test/resourceGroups/test/providers/Microsoft.ContainerService/managedClusters/test-aks";
          newEnv["WEBSITE_SITE_NAME"] = "my-webapp";
          const originalEnv = process.env;
          process.env = newEnv;

          await statsbeat["getResourceProvider"]();

          process.env = originalEnv;
          assert.strictEqual(statsbeat["resourceProvider"], "aks");
          assert.strictEqual(
            statsbeat["resourceIdentifier"],
            "/subscriptions/test/resourceGroups/test/providers/Microsoft.ContainerService/managedClusters/test-aks",
          );
        });

        it("should prioritize Functions detection over App Service when both conditions are met", async () => {
          const newEnv = <{ [id: string]: string }>{};
          newEnv["WEBSITE_SITE_NAME"] = "my-function-app";
          newEnv["FUNCTIONS_WORKER_RUNTIME"] = "node";
          newEnv["WEBSITE_HOSTNAME"] = "my-function-app.azurewebsites.net";
          newEnv["WEBSITE_HOME_STAMPNAME"] = "waws-prod-test-001";
          const originalEnv = process.env;
          process.env = newEnv;

          await statsbeat["getResourceProvider"]();

          process.env = originalEnv;
          // Should be detected as Functions, not App Service
          assert.strictEqual(statsbeat["resourceProvider"], "functions");
          assert.strictEqual(statsbeat["resourceIdentifier"], "my-function-app.azurewebsites.net");
        });

        it("should handle empty environment variables gracefully", async () => {
          const newEnv = <{ [id: string]: string }>{};
          newEnv["WEBSITE_SITE_NAME"] = "";
          newEnv["FUNCTIONS_WORKER_RUNTIME"] = "";
          const originalEnv = process.env;
          process.env = newEnv;

          await statsbeat["getResourceProvider"]();

          process.env = originalEnv;
          // With empty environment variables, it falls through to VM detection
          assert.strictEqual(statsbeat["resourceProvider"], "vm");
        });
      });
    });

    describe("Track data from statsbeats", () => {
      let statsbeat: NetworkStatsbeatMetrics;

      beforeEach(() => {
        process.env.WEBSITE_SITE_NAME = "test";
        // Reset singleton before each test to ensure clean state
        (NetworkStatsbeatMetrics as any).instance = null;
        statsbeat = NetworkStatsbeatMetrics.getInstance({
          ...options,
          networkCollectionInterval: 100,
        });
      });

      afterEach(async () => {
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

        await new Promise((resolve) => setTimeout(resolve, 200));
        expect(mockExport).toHaveBeenCalled();
        const resourceMetrics = mockExport.mock.calls[0][0];
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
        const longIntervalStatsbeat = LongIntervalStatsbeatMetrics.getInstance(options);
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

      it("should not export zero value statsbeats", async () => {
        // Create a new statsbeat instance to avoid interference from other tests
        (NetworkStatsbeatMetrics as any).instance = null;
        const zeroStatsbeat = NetworkStatsbeatMetrics.getInstance({
          ...options,
          networkCollectionInterval: 100,
        });

        try {
          // Spy on the exporter's export method
          const mockExport = vi.spyOn(zeroStatsbeat["networkAzureExporter"], "export");

          zeroStatsbeat.countSuccess(0);

          // Wait for the export interval to trigger without adding any counts
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Check that export was called
          expect(mockExport).toHaveBeenCalled();

          // Get the metrics that were exported
          const resourceMetrics = mockExport.mock.calls[0][0];
          const scopeMetrics = resourceMetrics.scopeMetrics;
          assert.strictEqual(scopeMetrics.length, 1, "Scope Metrics count");

          // Check the metrics - there should be 0 data points for most metrics
          // since we're now filtering zero values
          const metrics = scopeMetrics[0].metrics;

          // Check each metric to ensure zero values are filtered out
          for (const metric of metrics) {
            // We expect all metrics to have no data points as they all have zero values
            assert.strictEqual(
              metric.dataPoints.length,
              1,
              `${metric.descriptor.name} should have no data points apart from success since all other values are zero`,
            );
          }
        } finally {
          // Clean up
          await zeroStatsbeat.shutdown();
        }
      });
    });

    describe("Disable Non-Essential Statsbeat", () => {
      it("should disable statsbeat when the environment variable is set", () => {
        process.env[ENV_DISABLE_STATSBEAT] = "true";
        // Reset singletons to pick up environment variable
        (NetworkStatsbeatMetrics as any).instance = null;
        (LongIntervalStatsbeatMetrics as any).instance = null;
        const exporter = new AzureMonitorTraceExporter(exportOptions);
        assert.ok(exporter["sender"]["networkStatsbeatMetrics"]);
        assert.ok(!exporter["sender"]["networkStatsbeatMetrics"]?.["readFailureGauge"]);
        assert.ok(!exporter["sender"]["networkStatsbeatMetrics"]?.["writeFailureGauge"]);
        delete process.env[ENV_DISABLE_STATSBEAT];
        // Reset singletons again for clean state
        (NetworkStatsbeatMetrics as any).instance = null;
        (LongIntervalStatsbeatMetrics as any).instance = null;
      });

      it("should disable all statsbeat when the legacy environment variable is set", () => {
        process.env[LEGACY_ENV_DISABLE_STATSBEAT] = "true";
        const exporter = new AzureMonitorTraceExporter(exportOptions);
        assert.ok(!exporter["sender"]["networkStatsbeatMetrics"]);
        assert.ok(!exporter["sender"]["longIntervalStatsbeatMetrics"]);
        delete process.env[LEGACY_ENV_DISABLE_STATSBEAT];
      });
    });

    describe("Long Interval Statsbeat Metrics", () => {
      it("should properly bind the metric reader to a metric producer", async () => {
        // Get an instance of LongIntervalStatsbeatMetrics
        const longIntervalStatsbeat = LongIntervalStatsbeatMetrics.getInstance(options);

        // Create a spy on the collect method to ensure it doesn't throw an error
        const collectSpy = vi.spyOn(longIntervalStatsbeat["longIntervalMetricReader"], "collect");

        // Attempt to collect metrics - this would throw an error if the MetricReader is not bound
        // to a MetricProducer properly
        try {
          await longIntervalStatsbeat["longIntervalMetricReader"].collect();
          // If we get here without an error, the test passes
          assert.ok(true, "Metric reader collect method executed without errors");
        } catch (error) {
          // If an error occurs, the test should fail
          assert.fail(
            `Metric reader collect method threw an error: ${error instanceof Error ? error.message : String(error)}`,
          );
        }

        // Verify the collect method was called
        expect(collectSpy).toHaveBeenCalled();

        // Restore the spy
        collectSpy.mockRestore();
      });
    });
  });
});
