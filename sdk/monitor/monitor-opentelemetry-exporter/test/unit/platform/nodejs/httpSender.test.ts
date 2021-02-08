// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { DEFAULT_EXPORTER_CONFIG } from "../../../../src/config";
import { HttpSender } from "../../../../src/platform/nodejs/httpSender";
import { DEFAULT_BREEZE_ENDPOINT } from "../../../../src/Declarations/Constants";
import {
  successfulBreezeResponse,
  failedBreezeResponse,
  partialBreezeResponse
} from "../../breezeTestUtils";
import { TelemetryItem as Envelope } from "../../../../src/generated";
import nock from "nock";

describe("HttpSender", () => {
  const scope = nock(DEFAULT_BREEZE_ENDPOINT).post("/v2/track");
  nock.disableNetConnect();

  after(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  describe("#constructor", () => {
    it("should create a valid instance", () => {
      const sender = new HttpSender(DEFAULT_EXPORTER_CONFIG);
      assert.ok(sender);
    });
  });

  describe("#send()", () => {
    const envelope: Envelope = {
      name: "name",
      time: new Date()
    };
    it("should send a valid envelope", async () => {
      const sender = new HttpSender(DEFAULT_EXPORTER_CONFIG);
      scope.reply(200, JSON.stringify(successfulBreezeResponse(1)));
      const { result, statusCode } = await sender.send([envelope]);
      assert.strictEqual(statusCode, 200);
      assert.deepStrictEqual(JSON.parse(result), successfulBreezeResponse(1));
    });

    it("should send an invalid non-retriable envelope", async () => {
      const sender = new HttpSender(DEFAULT_EXPORTER_CONFIG);
      scope.reply(403, JSON.stringify(failedBreezeResponse(2, 403)));

      try {
        await sender.send([envelope, envelope]);
        assert.ok(false);
      } catch (error) {
        assert.ok(error);
      }
    });

    it("should send a partially retriable envelope", async () => {
      const sender = new HttpSender(DEFAULT_EXPORTER_CONFIG);
      scope.reply(206, JSON.stringify(partialBreezeResponse([200, 408, 408])));
      const { result, statusCode } = await sender.send([envelope, envelope]);
      assert.strictEqual(statusCode, 206);
      assert.deepStrictEqual(JSON.parse(result), partialBreezeResponse([200, 408, 408]));
    });

    it("should build endpoint using config", async () => {
      const sender = new HttpSender({
        endpointUrl: "https://test.com",
        serviceApiVersion: "13"
      });
      assert.strictEqual(sender["_appInsightsClientOptions"].endpoint, "https://test.com/v13");
    });
  });
});
