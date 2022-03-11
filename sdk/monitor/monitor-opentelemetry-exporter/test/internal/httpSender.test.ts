// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { TokenCredential } from "@azure/core-http";
import { DEFAULT_EXPORTER_CONFIG } from "../../src/config";
import { HttpSender } from "../../src/platform/nodejs/httpSender";
import { DEFAULT_BREEZE_ENDPOINT } from "../../src/Declarations/Constants";
import {
  successfulBreezeResponse,
  failedBreezeResponse,
  partialBreezeResponse,
} from "../utils/breezeTestUtils";
import { TelemetryItem as Envelope } from "../../src/generated";
import nock from "nock";
import { PipelinePolicy } from "@azure/core-rest-pipeline";

class TestTokenCredential implements TokenCredential {
  private _expiresOn: Date;
  private _numberOfRefreshs = 0;

  constructor(expiresOn?: Date) {
    this._expiresOn = expiresOn || new Date();
  }

  async getToken(): Promise<any> {
    this._numberOfRefreshs++;
    return {
      token: "testToken" + this._numberOfRefreshs,
      expiresOnTimestamp: this._expiresOn,
    };
  }
}

describe("HttpSender", () => {
  const scope = nock(DEFAULT_BREEZE_ENDPOINT).post("/v2.1/track");
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
      time: new Date(),
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
  });

  describe("#authentication", () => {
    it("should add bearerTokenAuthenticationPolicy", () => {
      let config = DEFAULT_EXPORTER_CONFIG;
      config.aadTokenCredential = new TestTokenCredential();
      const sender = new HttpSender(DEFAULT_EXPORTER_CONFIG);
      assert.ok(
        sender["_appInsightsClient"].pipeline
          .getOrderedPolicies()
          .find((policy: PipelinePolicy) => {
            return policy.name == "bearerTokenAuthenticationPolicy";
          })
      );
    });
  });
});
