// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { createHttpHeaders, type HttpClient } from "@azure/core-rest-pipeline";
import jwt from "jsonwebtoken";
import { describe, it, assert, vi } from "vitest";
import { WebPubSubChatServiceClient } from "../../src/index.js";
import { tracingClient } from "../../src/tracing.js";

describe("WebPubSubChatServiceClient.getClientAccessToken", () => {
  const endpoint = "https://example.webpubsub.azure.com";
  const hub = "chat-hub";
  const key = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefg=";
  const roles = ["webpubsub.getGroupState", "webpubsub.setGroupState"];

  it("generates a client access token locally with an access key", async () => {
    const withSpan = vi.spyOn(tracingClient, "withSpan");

    try {
      const client = new WebPubSubChatServiceClient(endpoint, new AzureKeyCredential(key), hub);

      const result = await client.getClientAccessToken({
        userId: "user-1",
        expirationTimeInMinutes: 30,
      });
      const payload = jwt.decode(result.token) as jwt.JwtPayload;

      assert.equal(payload.aud, `${endpoint}/client/hubs/${hub}`);
      assert.equal(payload.sub, "user-1");
      assert.deepEqual(payload.role, roles);
      assert.equal(payload.exp! - payload.iat!, 30 * 60);
      assert.equal(result.baseUrl, `wss://example.webpubsub.azure.com/client/hubs/${hub}`);
      assert.equal(result.url, `${result.baseUrl}?access_token=${result.token}`);
      assert.notInclude(JSON.stringify(client), key);
      assert.equal(withSpan.mock.calls[0][0], "WebPubSubChatServiceClient.getClientAccessToken");
    } finally {
      withSpan.mockRestore();
    }
  });

  it("uses the generated REST operation with a token credential", async () => {
    const httpClient: HttpClient = {
      sendRequest: vi.fn(async (request) => ({
        request,
        status: 200,
        headers: createHttpHeaders({ "content-type": "application/json" }),
        bodyAsText: JSON.stringify({ token: "service-generated-token" }),
      })),
    };
    const credential = {
      getToken: vi.fn(async () => ({
        token: "credential-token",
        expiresOnTimestamp: Date.now() + 3_600_000,
      })),
    };
    const client = new WebPubSubChatServiceClient(endpoint, credential, hub, { httpClient });

    const result = await client.getClientAccessToken({
      userId: "user-1",
      expirationTimeInMinutes: 30,
    });

    const request = vi.mocked(httpClient.sendRequest).mock.calls[0][0];
    const requestUrl = new URL(request.url);
    assert.equal(request.method, "POST");
    assert.equal(requestUrl.pathname, `/api/hubs/${hub}/:generateToken`);
    assert.equal(requestUrl.searchParams.get("userId"), "user-1");
    assert.deepEqual(requestUrl.searchParams.getAll("role"), roles);
    assert.equal(requestUrl.searchParams.get("minutesToExpire"), "30");
    assert.equal(requestUrl.searchParams.get("api-version"), "2024-12-01");
    assert.equal(requestUrl.searchParams.get("clientType"), "default");
    assert.equal(result.token, "service-generated-token");
    assert.equal(result.baseUrl, `wss://example.webpubsub.azure.com/client/hubs/${hub}`);
    assert.equal(result.url, `${result.baseUrl}?access_token=${result.token}`);
  });
});
