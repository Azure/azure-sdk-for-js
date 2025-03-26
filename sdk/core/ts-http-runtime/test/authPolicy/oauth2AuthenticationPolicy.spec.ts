// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi } from "vitest";
import type {
  AuthScheme,
  HttpClient,
  OAuth2TokenCredential,
  PipelineResponse,
  SendRequest,
} from "../../src/index.js";
import { createHttpHeaders, createPipelineRequest } from "../../src/index.js";
import { oauth2AuthenticationPolicy } from "../../src/policies/auth/oauth2AuthenticationPolicy.js";
import type { OAuth2Flow } from "../../src/auth/oauth2Flows.js";
import { createDefaultPipeline } from "../../src/client/clientHelpers.js";
import { logger } from "../../src/log.js";

const exampleScheme: AuthScheme = {
  kind: "oauth2",
  flows: [
    {
      kind: "clientCredentials",
      tokenUrl: "https://example.com/token",
    },
  ],
};

describe("oauth2AuthenticationPolicy", () => {
  it("should add oauth2 token to the request", async () => {
    const mockToken = "test-token";
    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<SendRequest>();
    next.mockResolvedValue(successResponse);

    const policy = oauth2AuthenticationPolicy<OAuth2Flow>({
      credential: {
        getOAuth2Token: async (_flows, _options) => mockToken,
      },
      authSchemes: [exampleScheme],
    });
    await policy.sendRequest(request, next);

    expect(request.headers.get("Authorization")).toBe(`Bearer ${mockToken}`);
  });

  it("should pass through abort signal to token request", async () => {
    const mockToken = "test-token";
    const abortSignal = new AbortController().signal;
    const getTokenSpy = vi.fn().mockResolvedValue(mockToken);

    const request = createPipelineRequest({
      url: "https://example.com",
      abortSignal,
    });
    const next = vi.fn<SendRequest>();
    next.mockResolvedValue({
      headers: createHttpHeaders(),
      request,
      status: 200,
    });

    const policy = oauth2AuthenticationPolicy<OAuth2Flow>({
      credential: {
        getOAuth2Token: getTokenSpy,
      },
      authSchemes: [exampleScheme],
    });

    await policy.sendRequest(request, next);

    expect(getTokenSpy).toHaveBeenCalledWith(
      [
        {
          kind: "clientCredentials",
          tokenUrl: "https://example.com/token",
        },
      ],
      { abortSignal },
    );
    expect(request.headers.get("Authorization")).toBe(`Bearer ${mockToken}`);
  });

  it("should allow insecure connection", async () => {
    const mockCredential: OAuth2TokenCredential<OAuth2Flow> = {
      getOAuth2Token: async (_flows: OAuth2Flow[]) => "mockToken",
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
      "Sending bearer token over insecure transport. Assume any token issued is compromised.",
    );

    vi.clearAllMocks();
  });
});
