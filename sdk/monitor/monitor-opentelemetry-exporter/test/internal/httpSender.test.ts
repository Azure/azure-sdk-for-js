// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { TokenCredential } from "@azure/core-auth";
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
import { ExportResultCode } from "@opentelemetry/core";

function toObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

class TestTokenCredential implements TokenCredential {
  private expiresOn: Date;
  private numberOfRefreshs = 0;

  constructor(expiresOn?: Date) {
    this.expiresOn = expiresOn || new Date();
  }

  async getToken(): Promise<any> {
    this.numberOfRefreshs++;
    return {
      token: "testToken" + this.numberOfRefreshs,
      expiresOnTimestamp: this.expiresOn,
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
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {},
      });
      assert.ok(sender);
    });
  });

  describe("#send()", () => {
    const envelope: Envelope = {
      name: "name",
      time: new Date(),
    };
    it("should send a valid envelope", async () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {},
      });
      scope.reply(200, JSON.stringify(successfulBreezeResponse(1)));
      const { result, statusCode } = await sender.send([envelope]);
      assert.strictEqual(statusCode, 200);
      assert.deepStrictEqual(JSON.parse(result), successfulBreezeResponse(1));
    });

    it("should send an invalid non-retriable envelope", async () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {},
      });
      scope.reply(403, JSON.stringify(failedBreezeResponse(2, 403)));

      try {
        await sender.send([envelope, envelope]);
        assert.ok(false);
      } catch (error: any) {
        assert.ok(error);
      }
    });

    it("should send a partially retriable envelope", async () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {},
      });
      scope.reply(206, JSON.stringify(partialBreezeResponse([200, 408, 408])));
      const { result, statusCode } = await sender.send([envelope, envelope]);
      assert.strictEqual(statusCode, 206);
      assert.deepStrictEqual(JSON.parse(result), partialBreezeResponse([200, 408, 408]));
    });

    it("should persist retriable failed telemetry 429", async () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {},
      });
      const response = failedBreezeResponse(1, 429);
      scope.reply(429, JSON.stringify(response));

      const result = await sender.exportEnvelopes([envelope]);
      assert.strictEqual(result.code, ExportResultCode.SUCCESS);

      const persistedEnvelopes = (await sender["persister"].shift()) as Envelope[];
      assert.strictEqual(persistedEnvelopes?.length, 1);
      assert.deepStrictEqual(persistedEnvelopes[0], toObject(envelope));
    });

    it("should persist retriable failed telemetry 500", async () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {},
      });
      const response = failedBreezeResponse(1, 500);
      scope.reply(500, JSON.stringify(response));

      const result = await sender.exportEnvelopes([envelope]);
      assert.strictEqual(result.code, ExportResultCode.SUCCESS);

      const persistedEnvelopes = (await sender["persister"].shift()) as Envelope[];
      assert.strictEqual(persistedEnvelopes?.length, 1);
      assert.deepStrictEqual(persistedEnvelopes[0], toObject(envelope));
    });

    it("should persist retriable failed  502", async () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {},
      });
      const response = failedBreezeResponse(1, 502);
      scope.reply(502, JSON.stringify(response));

      const result = await sender.exportEnvelopes([envelope]);
      assert.strictEqual(result.code, ExportResultCode.SUCCESS);

      const persistedEnvelopes = (await sender["persister"].shift()) as Envelope[];
      assert.strictEqual(persistedEnvelopes?.length, 1);
      assert.deepStrictEqual(persistedEnvelopes[0], toObject(envelope));
    });

    it("should persist retriable failed telemetry 503", async () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {},
      });
      const response = failedBreezeResponse(1, 503);
      scope.reply(503, JSON.stringify(response));

      const result = await sender.exportEnvelopes([envelope]);
      assert.strictEqual(result.code, ExportResultCode.SUCCESS);

      const persistedEnvelopes = (await sender["persister"].shift()) as Envelope[];
      assert.strictEqual(persistedEnvelopes?.length, 1);
      assert.deepStrictEqual(persistedEnvelopes[0], toObject(envelope));
    });

    it("should persist retriable failed telemetry 504", async () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {},
      });
      const response = failedBreezeResponse(1, 504);
      scope.reply(504, JSON.stringify(response));

      const result = await sender.exportEnvelopes([envelope]);
      assert.strictEqual(result.code, ExportResultCode.SUCCESS);

      const persistedEnvelopes = (await sender["persister"].shift()) as Envelope[];
      assert.strictEqual(persistedEnvelopes?.length, 1);
      assert.deepStrictEqual(persistedEnvelopes[0], toObject(envelope));
    });

    it("should persist partial retriable failed telemetry", async () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {},
      });
      const response = partialBreezeResponse([200, 408, 408]);
      scope.reply(206, JSON.stringify(response));

      const result = await sender.exportEnvelopes([envelope, envelope, envelope]);
      assert.strictEqual(result.code, ExportResultCode.SUCCESS);

      const persistedEnvelopes = (await sender["persister"].shift()) as Envelope[];
      assert.strictEqual(persistedEnvelopes?.length, 2);
    });

    it("should not persist partial non retriable failed telemetry", async () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {},
      });
      const response = partialBreezeResponse([407, 501, 408]);
      scope.reply(206, JSON.stringify(response));

      const result = await sender.exportEnvelopes([envelope, envelope, envelope]);
      assert.strictEqual(result.code, ExportResultCode.SUCCESS);

      const persistedEnvelopes = (await sender["persister"].shift()) as Envelope[];
      assert.strictEqual(persistedEnvelopes?.length, 1);
    });

    it("should not persist non-retriable failed telemetry", async () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {},
      });
      const response = failedBreezeResponse(1, 400);
      scope.reply(400, JSON.stringify(response));

      const result = await sender.exportEnvelopes([envelope]);
      assert.strictEqual(result.code, ExportResultCode.FAILED);

      const persistedEnvelopes = await sender["persister"].shift();
      assert.strictEqual(persistedEnvelopes, null);
    });

    it("should not persist non-retriable failed telemetry", async () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {},
      });
      const response = failedBreezeResponse(1, 404);
      scope.reply(404, JSON.stringify(response));

      const result = await sender.exportEnvelopes([envelope]);
      assert.strictEqual(result.code, ExportResultCode.FAILED);

      const persistedEnvelopes = await sender["persister"].shift();
      assert.strictEqual(persistedEnvelopes, null);
    });

    it("should not persist when an error is caught", async () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {},
      });
      scope.reply(1, ""); // httpSender will throw

      const result = await sender.exportEnvelopes([envelope]);
      assert.strictEqual(result.code, ExportResultCode.FAILED);

      const persistedEnvelopes = await sender["persister"].shift();
      assert.strictEqual(persistedEnvelopes, null);
    });

    it("should start retry timer when telemetry is successfully sent", async () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {},
      });
      const response = successfulBreezeResponse(1);
      scope.reply(200, JSON.stringify(response));

      const result = await sender.exportEnvelopes([envelope]);
      assert.strictEqual(result.code, ExportResultCode.SUCCESS);
      assert.notStrictEqual(sender["retryTimer"], null);

      clearTimeout(sender["retryTimer"]!);
      sender["retryTimer"] = null;
    });

    it("should not start a retry timer when one already exists", async () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {},
      });
      sender["retryTimer"] = "foo" as unknown as NodeJS.Timeout;
      const response = successfulBreezeResponse(1);
      scope.reply(200, JSON.stringify(response));

      const result = await sender.exportEnvelopes([envelope]);
      assert.strictEqual(result.code, ExportResultCode.SUCCESS);
      assert.strictEqual(sender["retryTimer"], "foo");
    });

    it("should handle permanent redirects in Azure Monitor", async () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {},
      });
      const redirectHost = "https://ukwest-0.in.applicationinsights.azure.com";
      const redirectLocation = redirectHost + "/v2.1/track";
      // Redirect endpoint
      const redirectScope = nock(redirectHost).post("/v2.1/track", () => {
        return true;
      });
      redirectScope.reply(200, JSON.stringify(successfulBreezeResponse(1)));
      scope.reply(308, {}, { location: redirectLocation });

      const result = await sender.exportEnvelopes([envelope]);
      const persistedEnvelopes = (await sender["persister"].shift()) as Envelope[];
      assert.strictEqual(persistedEnvelopes, null);
      assert.strictEqual(result.code, ExportResultCode.SUCCESS);
      assert.strictEqual(sender["appInsightsClient"]["host"], redirectHost);
    });

    it("should handle temporary redirects in Azure Monitor", async () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {},
      });
      const redirectHost = "https://ukwest-0.in.applicationinsights.azure.com";
      const redirectLocation = redirectHost + "/v2.1/track";
      // Redirect endpoint
      const redirectScope = nock(redirectHost).post("/v2.1/track", () => {
        return true;
      });
      redirectScope.reply(200, JSON.stringify(successfulBreezeResponse(1)));
      scope.reply(307, {}, { location: redirectLocation });

      const result = await sender.exportEnvelopes([envelope]);
      const persistedEnvelopes = (await sender["persister"].shift()) as Envelope[];
      assert.strictEqual(persistedEnvelopes, null);
      assert.strictEqual(result.code, ExportResultCode.SUCCESS);
      assert.strictEqual(sender["appInsightsClient"]["host"], redirectHost);
    });

    it("should use redirect URL for following requests", async () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {},
      });
      const redirectHost = "https://ukwest-0.in.applicationinsights.azure.com";
      const redirectLocation = redirectHost + "/v2.1/track";
      // Redirect endpoint
      const redirectScope = nock(redirectHost).post("/v2.1/track", () => {
        return true;
      });
      redirectScope.twice().reply(200, JSON.stringify(successfulBreezeResponse(1)));
      scope.reply(307, {}, { location: redirectLocation });
      let result = await sender.exportEnvelopes([envelope]);
      assert.strictEqual(result.code, ExportResultCode.SUCCESS);
      assert.strictEqual(sender["appInsightsClient"]["host"], redirectHost);
      result = await sender.exportEnvelopes([envelope]);
      assert.strictEqual(result.code, ExportResultCode.SUCCESS);
      assert.strictEqual(sender["appInsightsClient"]["host"], redirectHost);
    });

    it("should stop redirecting when circular redirect is triggered", async () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {},
      });
      const redirectHost = "https://ukwest-0.in.applicationinsights.azure.com";
      const redirectLocation = redirectHost + "/v2.1/track";
      // Redirect endpoint
      const redirectScope = nock(redirectHost).post("/v2.1/track", () => {
        return true;
      });
      // Circle redirect
      scope
        .reply(307, JSON.stringify(successfulBreezeResponse(1)), { location: redirectLocation })
        .persist();
      redirectScope
        .reply(307, JSON.stringify(successfulBreezeResponse(1)), {
          location: DEFAULT_BREEZE_ENDPOINT,
        })
        .persist();

      const result = await sender.exportEnvelopes([envelope]);
      assert.strictEqual(result.code, ExportResultCode.FAILED);
      assert.strictEqual(result.error?.message, "Circular redirect");
    });
  });

  describe("#authentication", () => {
    it("should add bearerTokenAuthenticationPolicy", () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {
          credential: new TestTokenCredential(),
        },
      });
      assert.ok(
        sender["appInsightsClient"].pipeline.getOrderedPolicies().find((policy: PipelinePolicy) => {
          return policy.name === "bearerTokenAuthenticationPolicy";
        }),
      );
    });

    it("should allow configuration of credentialScopes", () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        aadAudience: "testAudience",
        exporterOptions: {
          credential: new TestTokenCredential(),
        },
      });
      assert.deepStrictEqual(sender["appInsightsClientOptions"].credentialScopes, ["testAudience"]);
    });
  });

  describe("#advanced configuration", () => {
    it("proxy configuration", () => {
      const sender = new HttpSender({
        endpointUrl: DEFAULT_BREEZE_ENDPOINT,
        instrumentationKey: "someIkey",
        trackStatsbeat: false,
        exporterOptions: {
          proxyOptions: {
            host: "http://www.testproxy.com",
            port: 123,
          },
        },
      });
      assert.ok(
        sender["appInsightsClient"].pipeline.getOrderedPolicies().find((policy: PipelinePolicy) => {
          return policy.name === "proxyPolicy";
        }),
      );
    });
  });
});
