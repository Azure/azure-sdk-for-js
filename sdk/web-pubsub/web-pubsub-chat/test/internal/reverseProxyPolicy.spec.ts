// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { webPubSubReverseProxyPolicy } from "../../src/reverseProxyPolicy.js";
import type { PipelineRequest, PipelineResponse, SendRequest } from "@azure/core-rest-pipeline";
import { describe, it, assert } from "vitest";

function createMockRequest(url: string): PipelineRequest {
  return { url } as PipelineRequest;
}

function createMockNext(): { next: SendRequest; getCapturedUrl: () => string } {
  let capturedUrl = "";
  const next: SendRequest = async (request: PipelineRequest) => {
    capturedUrl = request.url;
    return {} as PipelineResponse;
  };
  return { next, getCapturedUrl: () => capturedUrl };
}

describe("reverseProxyPolicy", () => {
  it("rewrites host to proxy endpoint", async () => {
    const policy = webPubSubReverseProxyPolicy("https://apim.example.com");
    const request = createMockRequest(
      "https://original.webpubsub.azure.com/api/hubs/myhub/chat/users/u1",
    );
    const { next, getCapturedUrl } = createMockNext();

    await policy.sendRequest(request, next);

    assert.equal(getCapturedUrl(), "https://apim.example.com/api/hubs/myhub/chat/users/u1");
  });

  it("preserves path and query parameters", async () => {
    const policy = webPubSubReverseProxyPolicy("https://apim.example.com");
    const request = createMockRequest(
      "https://original.webpubsub.azure.com/api/hubs/myhub/chat/roles?api-version=2026-02-01-preview",
    );
    const { next, getCapturedUrl } = createMockNext();

    await policy.sendRequest(request, next);

    assert.equal(
      getCapturedUrl(),
      "https://apim.example.com/api/hubs/myhub/chat/roles?api-version=2026-02-01-preview",
    );
  });

  it("only replaces host, not protocol", async () => {
    const policy = webPubSubReverseProxyPolicy("https://apim.example.com");
    const request = createMockRequest(
      "https://original.webpubsub.azure.com/api/hubs/myhub/chat/users/u1",
    );
    const { next, getCapturedUrl } = createMockNext();

    await policy.sendRequest(request, next);

    assert.match(getCapturedUrl(), /^https:\/\/apim\.example\.com\//);
  });
});
