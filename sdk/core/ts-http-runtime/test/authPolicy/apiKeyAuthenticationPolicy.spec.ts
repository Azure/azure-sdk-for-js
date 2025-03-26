// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi } from "vitest";
import type { PipelinePolicy, PipelineResponse, SendRequest } from "../../src/index.js";
import { createHttpHeaders, createPipelineRequest } from "../../src/index.js";
import { apiKeyAuthenticationPolicy } from "../../src/policies/auth/apiKeyAuthenticationPolicy.js";

describe("apiKeyAuthenticationPolicy", () => {
  it("should add api key to the request header", async () => {
    const apiKey = "testKey";
    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<SendRequest>();
    next.mockResolvedValue(successResponse);

    const policy = createApiKeyPolicy(apiKey, "header");
    await policy.sendRequest(request, next);

    expect(request.headers.get("api-key")).toBe(apiKey);
  });

  it("should surface error for unsupported location for apiKeyAuthenticationPolicy", async () => {
    const apiKey = "testKey";
    const request = createPipelineRequest({ url: "https://example.com" });

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<SendRequest>();
    next.mockResolvedValue(successResponse);

    const policy = createApiKeyPolicy(apiKey, "query");
    expect(policy.sendRequest(request, next)).rejects.toThrowError(
      "Unsupported API key location: query",
    );
  });
});

function createApiKeyPolicy(
  apiKey: string,
  apiKeyLocation: "query" | "header" | "cookie",
): PipelinePolicy {
  return apiKeyAuthenticationPolicy({
    credential: { key: apiKey },
    authSchemes: [
      {
        kind: "apiKey",
        name: "api-key",
        apiKeyLocation,
      },
    ],
  });
}
