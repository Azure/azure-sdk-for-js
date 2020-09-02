// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { ExportResult } from "@opentelemetry/core";
import { AzureMonitorBaseExporter } from "../../../src/export/exporter";
import { TelemetryProcessor } from "../../../src/types";
import { Envelope } from "../../../src/Declarations/Contracts";
import { DEFAULT_BREEZE_ENDPOINT } from "../../../src/Declarations/Constants";
import {
  failedBreezeResponse,
  partialBreezeResponse,
  successfulBreezeResponse
} from "../breezeTestUtils";
import { FileSystemPersist } from "../../../src/platform";
import nock = require("nock");

function toObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

describe("#AzureMonitorBaseExporter", () => {
  class TestExporter extends AzureMonitorBaseExporter {
    constructor() {
      super({
        instrumentationKey: "foo"
      });
    }

    getTelemetryProcesors() {
      return this._telemetryProcessors;
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
      const envelope = new Envelope();

      after(() => {
        nock.cleanAll();
      });

      it("should persist retriable failed telemetry", async () => {
        const exporter = new TestExporter();
        const response = failedBreezeResponse(1, 408);
        scope.reply(408, JSON.stringify(response));

        const result = await exporter.exportEnvelopes([envelope]);
        assert.strictEqual(result, ExportResult.FAILED_RETRYABLE);

        const persistedEnvelopes = (await exporter["_persister"].shift()) as Envelope[];
        assert.strictEqual(persistedEnvelopes?.length, 1);
        assert.deepStrictEqual(persistedEnvelopes[0], toObject(envelope));
      });

      it("should persist partial retriable failed telemetry", async () => {
        const exporter = new TestExporter();
        const response = partialBreezeResponse([200, 408, 408]);
        scope.reply(206, JSON.stringify(response));

        const result = await exporter.exportEnvelopes([envelope, envelope, envelope]);
        assert.strictEqual(result, ExportResult.FAILED_RETRYABLE);

        const persistedEnvelopes = (await exporter["_persister"].shift()) as Envelope[];
        assert.strictEqual(persistedEnvelopes?.length, 2);
      });

      it("should not persist non-retriable failed telemetry", async () => {
        const exporter = new TestExporter();
        const response = failedBreezeResponse(1, 400);
        scope.reply(400, JSON.stringify(response));

        const result = await exporter.exportEnvelopes([envelope]);
        assert.strictEqual(result, ExportResult.FAILED_NOT_RETRYABLE);

        const persistedEnvelopes = await exporter["_persister"].shift();
        assert.strictEqual(persistedEnvelopes, null);
      });

      it("should start retry timer when telemetry is successfully sent", async () => {
        const exporter = new TestExporter();
        const response = successfulBreezeResponse(1);
        scope.reply(200, JSON.stringify(response));

        const result = await exporter.exportEnvelopes([envelope]);
        assert.strictEqual(result, ExportResult.SUCCESS);
        assert.notStrictEqual(exporter["_retryTimer"], null);

        clearTimeout(exporter["_retryTimer"]!);
        exporter["_retryTimer"] = null;
      });

      it("should not start a retry timer when one already exists", async () => {
        const exporter = new TestExporter();
        exporter["_retryTimer"] = ("foo" as unknown) as NodeJS.Timer;
        const response = successfulBreezeResponse(1);
        scope.reply(200, JSON.stringify(response));

        const result = await exporter.exportEnvelopes([envelope]);
        assert.strictEqual(result, ExportResult.SUCCESS);
        assert.strictEqual(exporter["_retryTimer"], "foo");
      });
    });
  });

  describe("Telemetry Processors", () => {
    const nameProcessor: TelemetryProcessor = (envelope: Envelope) => {
      envelope.name = "processor1";
    };

    const rejectProcessor: TelemetryProcessor = () => {
      return false;
    };

    describe("#addTelemetryProcessor()", () => {
      it("should add telemetry processors", () => {
        const exporter = new TestExporter();
        assert.strictEqual(exporter.getTelemetryProcesors().length, 0);

        exporter.addTelemetryProcessor(nameProcessor);
        assert.strictEqual(exporter.getTelemetryProcesors().length, 1);
        assert.strictEqual(exporter.getTelemetryProcesors()[0], nameProcessor);

        exporter.addTelemetryProcessor(rejectProcessor);
        assert.strictEqual(exporter.getTelemetryProcesors().length, 2);
        assert.strictEqual(exporter.getTelemetryProcesors()[0], nameProcessor);
        assert.strictEqual(exporter.getTelemetryProcesors()[1], rejectProcessor);
      });
    });

    describe("#clearTelemetryProcessors()", () => {
      it("should clear all telemetry processors", () => {
        const exporter = new TestExporter();
        assert.strictEqual(exporter.getTelemetryProcesors().length, 0);

        exporter.addTelemetryProcessor(nameProcessor);
        assert.strictEqual(exporter.getTelemetryProcesors().length, 1);
        assert.strictEqual(exporter.getTelemetryProcesors()[0], nameProcessor);

        exporter.clearTelemetryProcessors();
        assert.strictEqual(exporter.getTelemetryProcesors().length, 0);
      });
    });

    describe("#_applyTelemetryProcessors()", () => {
      it("should filter envelopes", () => {
        const fooEnvelope = new Envelope();
        const barEnvelope = new Envelope();
        fooEnvelope.name = "foo";
        barEnvelope.name = "bar";

        const exporter = new TestExporter();
        assert.strictEqual(exporter.getTelemetryProcesors().length, 0);

        exporter.addTelemetryProcessor((envelope) => {
          return envelope.name === "bar";
        });
        const filtered = exporter["_applyTelemetryProcessors"]([fooEnvelope, barEnvelope]);
        assert.strictEqual(filtered.length, 1);
        assert.strictEqual(filtered[0], barEnvelope);
      });

      it("should filter modified envelopes", () => {
        const fooEnvelope = new Envelope();
        const barEnvelope = new Envelope();
        fooEnvelope.name = "foo";
        barEnvelope.name = "bar";

        const exporter = new TestExporter();
        assert.strictEqual(exporter.getTelemetryProcesors().length, 0);

        exporter.addTelemetryProcessor((envelope) => {
          if (envelope.name === "bar") {
            envelope.name = "baz";
          }
        });

        exporter.addTelemetryProcessor((envelope) => {
          return envelope.name === "baz";
        });

        const filtered = exporter["_applyTelemetryProcessors"]([fooEnvelope, barEnvelope]);
        assert.strictEqual(filtered.length, 1);
        assert.strictEqual(filtered[0].name, "baz");
      });
    });
  });
});
