// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { ExportResult, ExportResultCode } from "@opentelemetry/core";
import { failedBreezeResponse, successfulBreezeResponse } from "../utils/breezeTestUtils";
import { AzureMonitorBaseExporter } from "../../src/index";
import { DEFAULT_BREEZE_ENDPOINT } from "../../src/Declarations/Constants";
import { TelemetryItem as Envelope } from "../../src/generated";
import nock from "nock";
import { StatsbeatMetrics } from "../../src/export/statsbeat/statsbeatMetrics";
// @ts-ignore Need to ignore this while we do not import types
import sinon from "sinon";
import { StatsbeatCounter } from "../../src/export/statsbeat/types";

describe("#AzureMonitorStatsbeatExporter", () => {
  let options = {
    instrumentationKey: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;",
    endpointUrl: "IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com",
  };
  class TestExporter extends AzureMonitorBaseExporter {
    private thisAsAny: any;
    constructor() {
      super({
        connectionString: `instrumentationkey=foo-ikey`,
      });
      this.thisAsAny = this;
    }

    getTelemetryProcesors() {
      return this.thisAsAny._telemetryProcessors;
    }

    async exportEnvelopesPrivate(payload: Envelope[]): Promise<ExportResult> {
      return this.thisAsAny._exportEnvelopes(payload);
    }
  }

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
      it("should pass the options to the exporter", () => {
        const exporter = new TestExporter();
        assert.ok(exporter["_options"]);
      });
      it("should initialize statsbeat by default", async () => {
        const exporter = new TestExporter();
        const response = successfulBreezeResponse(1);
        scope.reply(200, JSON.stringify(response));

        const result = await exporter.exportEnvelopesPrivate([envelope]);
        assert.strictEqual(result.code, ExportResultCode.SUCCESS);
        assert.ok(exporter["_statsbeatMetrics"]);
        assert.strictEqual(exporter["_statsbeatMetrics"]?.isInitialized(), true);
      });

      it("should use non EU connection string", () => {
        const statsbeat = new StatsbeatMetrics({
          instrumentationKey: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;",
          endpointUrl: "IngestionEndpoint=https://westus-0.in.applicationinsights.azure.com",
        });
        assert.strictEqual(
          statsbeat["_host"],
          "IngestionEndpoint=https://westus-0.in.applicationinsights.azure.com"
        );
      });

      it("should use EU connection string", () => {
        const statsbeat = new StatsbeatMetrics(options);
        assert.strictEqual(
          statsbeat["_host"],
          "IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com"
        );
      });

      it("_getShortHost", () => {
        const statsbeat = new StatsbeatMetrics(options);
        assert.strictEqual(
          statsbeat["_getShortHost"]("http://westus02-1.in.applicationinsights.azure.com"),
          "westus02"
        );
        assert.strictEqual(
          statsbeat["_getShortHost"]("https://westus02-1.in.applicationinsights.azure.com"),
          "westus02"
        );
        assert.strictEqual(
          statsbeat["_getShortHost"]("https://dc.services.visualstudio.com"),
          "dc"
        );
        assert.strictEqual(statsbeat["_getShortHost"]("https://www.test.com"), "test");
      });

      it("should add correct network properites to the custom metric", (done) => {
        const statsbeat = new StatsbeatMetrics(options);
        statsbeat["_statsCollectionShortInterval"];
        statsbeat.countSuccess(100);
        let metric = statsbeat["_networkStatsbeatCollection"][0];
        assert.strictEqual(metric.intervalRequestExecutionTime, 100);

        // Ensure network statsbeat attributes are populated
        assert.strictEqual(statsbeat["_attach"], "sdk");
        assert.strictEqual(
          statsbeat["_cikey"],
          "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;"
        );
        assert.strictEqual(statsbeat["_language"], "node");
        assert.strictEqual(statsbeat["_resourceProvider"], "unknown");
        assert.strictEqual(
          statsbeat["_endpointUrl"],
          "IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com"
        );
        assert.ok(statsbeat["_os"]);
        assert.ok(statsbeat["_runtimeVersion"]);
        assert.ok(statsbeat["_version"]);

        done();
      });

      it("should turn off statsbeat after max failures", async () => {
        const exporter = new TestExporter();
        const response = failedBreezeResponse(1, 200);
        scope.reply(200, JSON.stringify(response));
        exporter["_statsbeatFailureCount"] = 4;

        const result = await exporter["_exportEnvelopes"]([envelope]);
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

      const statsbeat = new StatsbeatMetrics(options);

      it("it should determine if the rp is unknown", (done) => {
        statsbeat["_getResourceProvider"]()
          .then(() => {
            assert.strictEqual(statsbeat["_resourceProvider"], "unknown");
            done();
          })
          .catch((error) => {
            done(error);
          });
      });

      it("it should determine if the rp is an app service", (done) => {
        let newEnv = <{ [id: string]: string }>{};
        newEnv["WEBSITE_SITE_NAME"] = "Test Website";
        newEnv["WEBSITE_HOME_STAMPNAME"] = "test_home";
        let originalEnv = process.env;
        process.env = newEnv;
        statsbeat["_getResourceProvider"]()
          .then(() => {
            process.env = originalEnv;
            assert.strictEqual(statsbeat["_resourceProvider"], "appsvc");
            done();
          })
          .catch((error) => {
            done(error);
          });
      });

      it("should determine if the rp is an Azure Function", (done) => {
        let newEnv = <{ [id: string]: string }>{};
        newEnv["FUNCTIONS_WORKER_RUNTIME"] = "test";
        newEnv["WEBSITE_HOSTNAME"] = "test_host";
        let originalEnv = process.env;
        process.env = newEnv;
        statsbeat["_getResourceProvider"]()
          .then(() => {
            process.env = originalEnv;
            assert.strictEqual(statsbeat["_resourceProvider"], "functions");
            done();
          })
          .catch((error) => {
            done(error);
          });
      });

      it("should determine if the rp is an Azure VM", (done) => {
        const getAzureComputeStub = sandbox.stub(statsbeat, "getAzureComputeMetadata");
        getAzureComputeStub.returns(Promise.resolve(true));

        let newEnv = <{ [id: string]: string }>{};
        let originalEnv = process.env;
        process.env = newEnv;

        statsbeat["_getResourceProvider"]()
          .then(() => {
            process.env = originalEnv;
            assert.strictEqual(statsbeat["_resourceProvider"], "vm");
            done();
          })
          .catch((error) => {
            done(error);
          });
      });
    });

    describe("Track data from statsbeats", () => {
      let sandbox: sinon.SinonSandbox;
      let statsbeat: StatsbeatMetrics;

      before(() => {
        sandbox = sinon.createSandbox();
        process.env.WEBSITE_SITE_NAME = "test";
        statsbeat = new StatsbeatMetrics({ ...options, collectionInterval: 100 });
      });

      afterEach(() => {
        sandbox.restore();
      });

      after(() => {
        statsbeat.shutdown();
        process.env.WEBSITE_SITE_NAME = undefined;
      });

      it("should track duration", async () => {
        let mockExport = sandbox.stub(statsbeat["_azureExporter"], "export");
        statsbeat.countSuccess(100);
        statsbeat.countSuccess(100);
        statsbeat.countSuccess(200);
        statsbeat.countSuccess(200);

        await new Promise((resolve) => setTimeout(resolve, 120));
        assert.ok(mockExport.called);
        let resourceMetrics = mockExport.args[0][0];
        const scopeMetrics = resourceMetrics.scopeMetrics;
        assert.strictEqual(scopeMetrics.length, 1, "Scope Metrics count");
        let metrics = scopeMetrics[0].metrics;
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
        let mockExport = sandbox.stub(statsbeat["_azureExporter"], "export");
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
        let resourceMetrics = mockExport.args[0][0];
        const scopeMetrics = resourceMetrics.scopeMetrics;
        let metrics = scopeMetrics[0].metrics;

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
    });
  });
});
