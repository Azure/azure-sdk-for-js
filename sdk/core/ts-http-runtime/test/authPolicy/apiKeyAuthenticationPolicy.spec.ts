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
import { createHttpHeaders, createPipelineRequest } from "@typespec/ts-http-runtime";
import { apiKeyAuthenticationPolicy } from "$internal/policies/auth/apiKeyAuthenticationPolicy.js";
import { createDefaultPipeline } from "$internal/client/clientHelpers.js";
import { logger } from "$internal/log.js";

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

  it.each([
    // authSchemes set to empty array, should override service level scheme
    { authSchemes: [], shouldAuthenticate: false },
    // authSchemes is not defined, should use service level scheme
    { authSchemes: undefined, shouldAuthenticate: true },
  ])(
    `handles authentication correctly when request authSchemes is $authSchemes`,
    async ({ authSchemes, shouldAuthenticate }) => {
      const request = createPipelineRequest({ url: "https://example.com" });
      request.authSchemes = authSchemes;

      const apiKey = "testKey";

      const successResponse: PipelineResponse = {
        headers: createHttpHeaders(),
        request,
        status: 200,
      };
      const next = vi.fn<SendRequest>();
      next.mockResolvedValue(successResponse);

      const policy = createApiKeyPolicy(apiKey, "header");
      await policy.sendRequest(request, next);

      if (shouldAuthenticate) {
        expect(request.headers.get("api-key")).toBe(apiKey);
      } else {
        expect(request.headers.has("api-key")).toBe(false);
        expect(next).toHaveBeenCalledWith(request);
      }
    },
  );
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
