// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi } from "vitest";
import type {
  ApiKeyCredential,
  HttpClient,
  PipelinePolicy,
  PipelineResponse,
  SendRequest,
} from "../../src/index.js";
import { createHttpHeaders, createPipelineRequest } from "../../src/index.js";
import { apiKeyAuthenticationPolicy } from "../../src/policies/auth/apiKeyAuthenticationPolicy.js";
import { createDefaultPipeline } from "../../src/client/clientHelpers.js";
import { logger } from "../../src/log.js";

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

  it("should allow insecure connection", async () => {
    const mockCredential: ApiKeyCredential = {
      key: "mockKey",
    };
    vi.spyOn(logger, "warning");
    const httpClient: HttpClient = {
      sendRequest: async (request) => {
        return {
          request,
          headers: createHttpHeaders(),
          status: 200,
        };
      },
    };
    const pipeline = createDefaultPipeline({
      credential: mockCredential,
      allowInsecureConnection: true,
    });
    await pipeline.sendRequest(httpClient, {
      headers: createHttpHeaders(),
      method: "GET",
      requestId: "1",
      timeout: 10000,
      url: "http://127.0.0.1:8080",
      withCredentials: false,
      allowInsecureConnection: true,
    });

    expect(logger.warning).toHaveBeenCalledWith(
      "Sending token over insecure transport. Assume any token issued is compromised.",
    );

    vi.clearAllMocks();
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
