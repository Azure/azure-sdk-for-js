// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi } from "vitest";
import type { AuthScheme, PipelineResponse, SendRequest } from "../../src/index.js";
import { createHttpHeaders, createPipelineRequest } from "../../src/index.js";
import { oauth2AuthenticationPolicy } from "../../src/policies/auth/oauth2AuthenticationPolicy.js";
import type { OAuth2Flow } from "../../src/auth/authFlows.js";

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
          type: "clientCredentials",
          tokenUrl: "https://example.com/token",
        },
      ],
      { abortSignal },
    );
    expect(request.headers.get("Authorization")).toBe(`Bearer ${mockToken}`);
  });
});
