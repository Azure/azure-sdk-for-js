// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubChatServiceClient } from "../../src/index.js";
import { AzureKeyCredential } from "@azure/core-auth";
import {
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
  type HttpClient,
  type PipelinePolicy,
} from "@azure/core-rest-pipeline";
import * as jwt from "jsonwebtoken";
import { webPubSubChatCredentialPolicy } from "../../src/webPubSubChatCredentialPolicy.js";
import { describe, it, assert, vi } from "vitest";

describe("WebPubSubChatServiceClient constructor", () => {
  const fakeEndpoint = "https://example.webpubsub.azure.com";
  const fakeKey = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefg=";
  const fakeConnectionString = `Endpoint=${fakeEndpoint};AccessKey=${fakeKey}`;
  const hub = "test-hub";

  it("creates from connection string", () => {
    const client = new WebPubSubChatServiceClient(fakeConnectionString, hub);
    assert.isNotNull(client);
    assert.isNotNull(client.pipeline);
  });

  it("creates from endpoint and AzureKeyCredential", () => {
    const credential = new AzureKeyCredential(fakeKey);
    const client = new WebPubSubChatServiceClient(fakeEndpoint, credential, hub);
    assert.isNotNull(client);
    assert.isNotNull(client.pipeline);
  });

  it("uses the full request URL as the AzureKeyCredential JWT audience", async () => {
    const requestUrl = `${fakeEndpoint}/api/hubs/${hub}/chat/roles`;
    const request = createPipelineRequest({ url: requestUrl, method: "GET" });
    const policy = webPubSubChatCredentialPolicy(new AzureKeyCredential(fakeKey));

    await policy.sendRequest(request, async (nextRequest) => ({
      request: nextRequest,
      status: 200,
      headers: createHttpHeaders(),
    }));

    const authorization = request.headers.get("Authorization");
    const token = authorization!.substring("Bearer ".length);
    const payload = jwt.decode(token) as jwt.JwtPayload;
    assert.equal(payload.aud, requestUrl);
  });

  it("creates from endpoint and TokenCredential", () => {
    const fakeTokenCredential = {
      getToken: async () => ({ token: "fake-token", expiresOnTimestamp: Date.now() + 3600000 }),
    };
    const client = new WebPubSubChatServiceClient(fakeEndpoint, fakeTokenCredential, hub);
    assert.isNotNull(client);
    assert.isNotNull(client.pipeline);
  });

  it("forwards the HTTP client with a clone of the caller pipeline", async () => {
    const pipeline = createEmptyPipeline();
    const customPolicy: PipelinePolicy = {
      name: "customPolicy",
      sendRequest: vi.fn((request, next) => next(request)),
    };
    pipeline.addPolicy(customPolicy);
    const httpClient: HttpClient = {
      sendRequest: vi.fn(async (request) => ({
        request,
        status: 200,
        headers: createHttpHeaders({ "content-type": "application/json" }),
        bodyAsText: JSON.stringify({ token: "fake-client-token" }),
      })),
    };
    const credential = {
      getToken: async () => ({ token: "fake-token", expiresOnTimestamp: Date.now() + 3600000 }),
    };
    const client = new WebPubSubChatServiceClient(fakeEndpoint, credential, hub, {
      pipeline,
      httpClient,
    });

    const underlyingClient = (
      client as unknown as {
        _webPubSubServiceClient: { _context: { pipeline: typeof client.pipeline } };
      }
    )._webPubSubServiceClient;
    const token = await client.getClientAccessToken();

    assert.strictEqual(client.pipeline, pipeline);
    assert.notStrictEqual(underlyingClient._context.pipeline, pipeline);
    assert.include(underlyingClient._context.pipeline.getOrderedPolicies(), customPolicy);
    assert.equal(token.token, "fake-client-token");
    assert.isTrue(vi.mocked(httpClient.sendRequest).mock.calls.length > 0);
  });

  it("keeps key credential policies isolated between cloned pipelines", () => {
    const pipeline = createEmptyPipeline();
    const client = new WebPubSubChatServiceClient(fakeConnectionString, hub, { pipeline });
    const underlyingClient = (
      client as unknown as {
        _webPubSubServiceClient: { _context: { pipeline: typeof client.pipeline } };
      }
    )._webPubSubServiceClient;

    assert.include(
      client.pipeline.getOrderedPolicies().map((policy) => policy.name),
      "webPubSubChatCredentialPolicy",
    );
    assert.include(
      underlyingClient._context.pipeline.getOrderedPolicies().map((policy) => policy.name),
      "webPubSubKeyCredentialPolicy",
    );
    assert.notInclude(
      underlyingClient._context.pipeline.getOrderedPolicies().map((policy) => policy.name),
      "webPubSubChatCredentialPolicy",
    );
  });

  it("applies reverse proxy policy when reverseProxyEndpoint is set", () => {
    const client = new WebPubSubChatServiceClient(fakeConnectionString, hub, {
      reverseProxyEndpoint: "https://apim.example.com/webpubsub",
    });
    assert.isNotNull(client);
    // The pipeline should have the reverse proxy policy added
    const policies = client.pipeline.getOrderedPolicies();
    const hasReverseProxy = policies.some((p) => p.name === "webPubSubReverseProxyPolicy");
    assert.isTrue(hasReverseProxy, "Expected reverseProxyPolicy in the pipeline");

    const underlyingClient = (
      client as unknown as {
        _webPubSubServiceClient: { _context: { pipeline: typeof client.pipeline } };
      }
    )._webPubSubServiceClient;
    const underlyingPolicies = underlyingClient._context.pipeline.getOrderedPolicies();
    const hasUnderlyingReverseProxy = underlyingPolicies.some(
      (p) => p.name === "webPubSubReverseProxyPolicy",
    );
    assert.isTrue(
      hasUnderlyingReverseProxy,
      "Expected webPubSubReverseProxyPolicy in the underlying client pipeline",
    );
  });
});
