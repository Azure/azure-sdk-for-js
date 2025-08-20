// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi } from "vitest";
import type {
  AuthScheme,
  HttpClient,
  OAuth2TokenCredential,
  PipelineResponse,
  SendRequest,
} from "@typespec/ts-http-runtime";
import { createHttpHeaders, createPipelineRequest } from "@typespec/ts-http-runtime";
import { oauth2AuthenticationPolicy } from "$internal/policies/auth/oauth2AuthenticationPolicy.js";
import type { OAuth2Flow } from "$internal/auth/oauth2Flows.js";
import { createDefaultPipeline } from "$internal/client/clientHelpers.js";
import { logger } from "$internal/log.js";

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
      "Sending token over insecure transport. Assume any token issued is compromised.",
    );

    vi.clearAllMocks();
  });

  it("should add bearer token to the request with change of scope", async () => {
    const newScopeScheme: AuthScheme = {
      kind: "oauth2",
      flows: [
        {
          kind: "clientCredentials",
          tokenUrl: "https://example.com/token",
          scopes: ["https://example.com/.default"],
        },
      ],
    };
    const request = createPipelineRequest({
      url: "https://example.com",
      authSchemes: [newScopeScheme],
    });

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<SendRequest>();
    next.mockResolvedValue(successResponse);
    const mockToken = "testToken";
    const getTokenSpy = vi.fn().mockResolvedValue(mockToken);

    const policy = oauth2AuthenticationPolicy<OAuth2Flow>({
      credential: {
        getOAuth2Token: getTokenSpy,
      },
      authSchemes: [exampleScheme],
    });

    await policy.sendRequest(request, next);

    // Verify initial token was used
    expect(request.headers.get("Authorization")).toBe(`Bearer ${mockToken}`);

    // Verify the credential was called with the original flows
    expect(getTokenSpy).toHaveBeenCalledWith(newScopeScheme.flows, expect.anything());
  });

  it.each([
    // authSchemes set to empty array, should override service level scheme
    { authSchemes: [], shouldAuthenticate: false },
    // authSchemes is not defined, should use service level scheme
    { authSchemes: undefined, shouldAuthenticate: true },
  ])(
    "handles authentication correctly when request authSchemes is $authSchemes",
    async ({ authSchemes, shouldAuthenticate }) => {
      const request = createPipelineRequest({ url: "https://example.com" });
      request.authSchemes = authSchemes;

      const mockToken = "test-token";
      const getTokenSpy = vi.fn().mockResolvedValue(mockToken);

      const successResponse: PipelineResponse = {
        headers: createHttpHeaders(),
        request,
        status: 200,
      };
      const next = vi.fn<SendRequest>();
      next.mockResolvedValue(successResponse);

      const policy = oauth2AuthenticationPolicy<OAuth2Flow>({
        credential: {
          getOAuth2Token: getTokenSpy,
        },
        authSchemes: [exampleScheme],
      });

      await policy.sendRequest(request, next);

      if (shouldAuthenticate) {
        expect(getTokenSpy).toHaveBeenCalled();
        expect(request.headers.get("Authorization")).toBe(`Bearer ${mockToken}`);
      } else {
        expect(getTokenSpy).not.toHaveBeenCalled();
        expect(request.headers.has("Authorization")).toBe(false);
        expect(next).toHaveBeenCalledWith(request);
      }
    },
  );
});
