// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { ExportResult, ExportResultCode } from "@opentelemetry/core";
import { AzureMonitorTraceExporter } from "../../../src/export/trace";
import { DEFAULT_BREEZE_ENDPOINT } from "../../../src/Declarations/Constants";
import {
  failedBreezeResponse,
  partialBreezeResponse,
  successfulBreezeResponse
} from "../breezeTestUtils";
import { FileSystemPersist } from "../../../src/platform";
import { TelemetryItem as Envelope } from "../../../src/generated";
import nock from "nock";

function toObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

describe("#AzureMonitorBaseExporter", () => {
  class TestExporter extends AzureMonitorTraceExporter {
    private thisAsAny: any;
    constructor() {
      super({
        connectionString: `instrumentationkey=foo-ikey`
      });
      this.thisAsAny = this;
    }

    getTelemetryProcesors() {
      return this.thisAsAny._telemetryProcessors;
    }

    async exportEnvelopesPrivate(payload: Envelope[]): Promise<ExportResult> {
      return this.thisAsAny.exportEnvelopes(payload);
    }
  }

  it("should pass options to persister", () => {
    const exporter = new TestExporter();
    assert.ok(exporter["_options"].instrumentationKey);
    assert.strictEqual(
      (exporter["_persister"] as FileSystemPersist)["_options"].instrumentationKey,
      exporter["_options"].instrumentationKey
    );
    assert.deepStrictEqual(
      (exporter["_persister"] as FileSystemPersist)["_options"],
      exporter["_options"]
    );
  });

  describe("Sender/Persister Controller", () => {
    describe("#exportEnvelopes()", () => {
      const scope = nock(DEFAULT_BREEZE_ENDPOINT).post("/v2/track");
      const envelope = {
        name: "Name",
        time: new Date()
      };

      before(() => {
        nock.cleanAll();
      });

      after(() => {
        nock.cleanAll();
      });

      it("should persist retriable failed telemetry", async () => {
        const exporter = new TestExporter();
        const response = failedBreezeResponse(1, 429);
        scope.reply(429, JSON.stringify(response));

        const result = await exporter.exportEnvelopesPrivate([envelope]);
        assert.strictEqual(result.code, ExportResultCode.SUCCESS);

        const persistedEnvelopes = (await exporter["_persister"].shift()) as Envelope[];
        assert.strictEqual(persistedEnvelopes?.length, 1);
        assert.deepStrictEqual(persistedEnvelopes[0], toObject(envelope));
      });

      it("should persist partial retriable failed telemetry", async () => {
        const exporter = new TestExporter();
        const response = partialBreezeResponse([200, 408, 408]);
        scope.reply(206, JSON.stringify(response));

        const result = await exporter.exportEnvelopesPrivate([envelope, envelope, envelope]);
        assert.strictEqual(result.code, ExportResultCode.SUCCESS);

        const persistedEnvelopes = (await exporter["_persister"].shift()) as Envelope[];
        assert.strictEqual(persistedEnvelopes?.length, 2);
      });

      it("should not persist partial non retriable failed telemetry", async () => {
        const exporter = new TestExporter();
        const response = partialBreezeResponse([407, 501, 408]);
        scope.reply(206, JSON.stringify(response));

        const result = await exporter.exportEnvelopesPrivate([envelope, envelope, envelope]);
        assert.strictEqual(result.code, ExportResultCode.SUCCESS);

        const persistedEnvelopes = (await exporter["_persister"].shift()) as Envelope[];
        assert.strictEqual(persistedEnvelopes?.length, 1);
      });

      it("should not persist non-retriable failed telemetry", async () => {
        const exporter = new TestExporter();
        const response = failedBreezeResponse(1, 400);
        scope.reply(400, JSON.stringify(response));

        const result = await exporter.exportEnvelopesPrivate([envelope]);
        assert.strictEqual(result.code, ExportResultCode.FAILED);

        const persistedEnvelopes = await exporter["_persister"].shift();
        assert.strictEqual(persistedEnvelopes, null);
      });

      it("should not persist when an error is caught", async () => {
        const exporter = new TestExporter();
        scope.reply(1, ""); // httpSender will throw

        const result = await exporter.exportEnvelopesPrivate([envelope]);
        assert.strictEqual(result.code, ExportResultCode.FAILED);

        const persistedEnvelopes = await exporter["_persister"].shift();
        assert.strictEqual(persistedEnvelopes, null);
      });

      it("should start retry timer when telemetry is successfully sent", async () => {
        const exporter = new TestExporter();
        const response = successfulBreezeResponse(1);
        scope.reply(200, JSON.stringify(response));

        const result = await exporter.exportEnvelopesPrivate([envelope]);
        assert.strictEqual(result.code, ExportResultCode.SUCCESS);
        assert.notStrictEqual(exporter["_retryTimer"], null);

        clearTimeout(exporter["_retryTimer"]!);
        exporter["_retryTimer"] = null;
      });

      it("should not start a retry timer when one already exists", async () => {
        const exporter = new TestExporter();
        exporter["_retryTimer"] = ("foo" as unknown) as NodeJS.Timer;
        const response = successfulBreezeResponse(1);
        scope.reply(200, JSON.stringify(response));

        const result = await exporter.exportEnvelopesPrivate([envelope]);
        assert.strictEqual(result.code, ExportResultCode.SUCCESS);
        assert.strictEqual(exporter["_retryTimer"], "foo");
      });

      it("should handle redirects in Azure Monitor", async () => {
        const exporter = new TestExporter();

        let redirectHost = "https://ukwest-0.in.applicationinsights.azure.com";
        let redirectLocation = redirectHost + "/v2/track";
        // Redirect endpoint
        const redirectScope = nock(redirectHost).post("/v2/track", () => {
          return true;
        });
        redirectScope.reply(200, JSON.stringify(successfulBreezeResponse(1)));
        scope.reply(308, {}, { location: redirectLocation });

        let result = await exporter.exportEnvelopesPrivate([envelope]);
        // Redirect triggered so telemetry must be persisted
        assert.strictEqual(result.code, ExportResultCode.SUCCESS);
        let persistedEnvelopes = (await exporter["_persister"].shift()) as Envelope[];
        assert.strictEqual(persistedEnvelopes?.length, 1);
        assert.deepStrictEqual(persistedEnvelopes[0], toObject(envelope));
        assert.strictEqual(exporter["_numConsecutiveRedirects"], 1);
        // After redirect return 200
        result = await exporter.exportEnvelopesPrivate([envelope]);
        assert.strictEqual(result.code, ExportResultCode.SUCCESS);
        persistedEnvelopes = (await exporter["_persister"].shift()) as Envelope[];
        assert.strictEqual(persistedEnvelopes, null);
      });
    });
  });
});
