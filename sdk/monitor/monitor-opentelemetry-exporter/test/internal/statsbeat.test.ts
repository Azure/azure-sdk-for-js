// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { ExportResult, ExportResultCode } from "@opentelemetry/core";
import {
  failedBreezeResponse,
  successfulBreezeResponse
} from "../utils/breezeTestUtils";
import { AzureMonitorBaseExporter } from "../../src/index";
import { DEFAULT_BREEZE_ENDPOINT } from "../../src/Declarations/Constants";
import { TelemetryItem as Envelope } from "../../src/generated";
import nock from "nock";
import { StatsbeatMetrics } from "../../src/export/statsbeat/statsbeatMetrics";

describe("#AzureMonitorStatsbeatExporter", () => {
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
      time: new Date()
    };

    before(() => {
      scope = nock(DEFAULT_BREEZE_ENDPOINT).post("/v2.1/track");
    });

    after(() => {
      nock.cleanAll();
    });

    describe("Initialization and connection string functions", () => {
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
        let statsbeat = new StatsbeatMetrics("InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;", "IngestionEndpoint=https://westus-0.in.applicationinsights.azure.com");
        assert.strictEqual(statsbeat["_host"], "IngestionEndpoint=https://westus-0.in.applicationinsights.azure.com");
      });

      it("should use EU connection string", () => {
        let statsbeat = new StatsbeatMetrics("InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;", "IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com");
        assert.strictEqual(statsbeat["_host"], "IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com");
      });

      it("_getShortHost", () => {
        let statsbeat = new StatsbeatMetrics("InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;", "IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com");
        assert.strictEqual(statsbeat["_getShortHost"]("http://westus02-1.in.applicationinsights.azure.com"), "westus02");
        assert.strictEqual(statsbeat["_getShortHost"]("https://westus02-1.in.applicationinsights.azure.com"), "westus02");
        assert.strictEqual(statsbeat["_getShortHost"]("https://dc.services.visualstudio.com"), "dc");
        assert.strictEqual(statsbeat["_getShortHost"]("https://www.test.com"), "test");
      });
    });

    describe("Resource provider function", () => {
      let statsbeat = new StatsbeatMetrics("InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;", "IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com");
      it("unknown resource provider", (done) => {
        //let statsbeat = new StatsbeatMetrics("InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;", "IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com");
        statsbeat["_getResourceProvider"]().then(() => {
            assert.strictEqual(statsbeat["_resourceProvider"], "unknown");
            done();
        }).catch((error) => { 
          done(error); 
        });
      });

      it("app service", (done) => {
        let newEnv = <{ [id: string]: string }>{};
        newEnv["WEBSITE_SITE_NAME"] = "Test Website";
        newEnv["WEBSITE_HOME_STAMPNAME"] = "test_home";
        let originalEnv = process.env;
        process.env = newEnv;
        //let statsbeat = new StatsbeatMetrics("InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;", "IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com");
        statsbeat["_getResourceProvider"]().then(() => {
          process.env = originalEnv;
          assert.strictEqual(statsbeat["_resourceProvider"], "appsvc");
          done();
        }).catch((error) => { 
          done(error); 
        });
      });

      it("Azure Function", (done) => {
        let newEnv = <{ [id: string]: string }>{};
        newEnv["FUNCTIONS_WORKER_RUNTIME"] = "test";
        newEnv["WEBSITE_HOSTNAME"] = "test_host";
        let originalEnv = process.env;
        process.env = newEnv;
        //let statsbeat = new StatsbeatMetrics("InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;", "IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com");
        statsbeat["_getResourceProvider"]().then(() => {
          process.env = originalEnv;
          assert.equal(statsbeat["_resourceProvider"], "functions");
          done();
        }).catch((error) => { 
          done(error); 
        });
      });

      /* Need to debug the Azure VM test - getting Nock: Disallowed net connect errors on localhost and 
         the Azure metadata endpoint.
      it("Azure VM", (done) => {
        let newEnv = <{ [id: string]: string }>{};
        let originalEnv = process.env;
        process.env = newEnv;
        let interceptor = nock("http://localhost:3000")
          // @ts-ignore
          .get("/", (body: string) => {
            return true;
          });
        interceptor.reply(200, {
          "vmId": "testId",
          "subscriptionId": "testsubscriptionId",
          "osType": "testOsType"
        });
        statsbeat["_getResourceProvider"]().then(() => {
          process.env = originalEnv;
          assert.strictEqual(statsbeat["_resourceProvider"], "vm");
          assert.strictEqual(statsbeat["_os"], "testOsType");
          done();
        }).catch((error) => { done(error); });
      });
      */
    });

    // TODO: Figure out how to view statsbeat failures
    it("should turn off statsbeat after max failures", async () => {
      const exporter = new TestExporter();
      const response = failedBreezeResponse(4, 400);
      scope.reply(400, JSON.stringify(response));

      const result = await exporter.exportEnvelopesPrivate([envelope]);
      assert.strictEqual(result.code, ExportResultCode.FAILED);
      // assert.strictEqual(exporter["_statsbeatFailureCount"], 4);
    });
  })
});

// Test _computeMetadata

// Test the resourceProvider property (reference distro)

// Create a base exporter here (this will initialize a StatsbeatExporter) within this test each of the counts
// Make sure to test that the output covers multiple statusCodes/exceptionTypes

// Test statsbeat shutdown after 3 failed attempts
