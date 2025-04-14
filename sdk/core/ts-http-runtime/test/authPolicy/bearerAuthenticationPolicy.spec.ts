// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";
import type {
  BearerTokenCredential,
  HttpClient,
  PipelinePolicy,
  PipelineResponse,
  SendRequest,
} from "../../src/index.js";
import { createHttpHeaders, createPipelineRequest } from "../../src/index.js";
import { bearerAuthenticationPolicy } from "../../src/policies/auth/bearerAuthenticationPolicy.js";
import { createDefaultPipeline } from "../../src/client/clientHelpers.js";
import { logger } from "../../src/log.js";

describe("bearerAuthenticationPolicy", function () {
  beforeEach(() => {
    vi.useFakeTimers({ now: Date.now() });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should add bearer token to the request", async () => {
    const mockToken = "token";
    const fakeGetToken = vi.fn().mockResolvedValue(mockToken);
    const mockCredential: BearerTokenCredential = {
      getBearerToken: fakeGetToken,
    };

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<SendRequest>();
    next.mockResolvedValue(successResponse);

    const policy = createBearerTokenPolicy(mockCredential);
    await policy.sendRequest(request, next);

    expect(fakeGetToken).toHaveBeenCalledWith({ abortSignal: undefined });
    assert.strictEqual(request.headers.get("Authorization"), `Bearer ${mockToken}`);
  });

  it("credential errors should bubble up", async () => {
    const credential = new MockCredential();

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<SendRequest>();
    next.mockResolvedValue(successResponse);

    const policy = createBearerTokenPolicy(credential);

    credential.shouldThrow = true;

    let error: Error | undefined;
    try {
      await policy.sendRequest(request, next);
    } catch (e: any) {
      error = e;
    }
    assert.equal(error?.message, "Failed to retrieve the token");

    assert.strictEqual(
      credential.authCount,
      1,
      "The first authentication attempt should have happened",
    );
  });

  it("should allow insecure connection", async () => {
    const credential = new MockCredential();
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
      credential,
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

  function createBearerTokenPolicy(credential: BearerTokenCredential): PipelinePolicy {
    return bearerAuthenticationPolicy({
      credential,
      authSchemes: [
        {
          kind: "http",
          scheme: "bearer",
        },
      ],
    });
  }
});

class MockCredential implements BearerTokenCredential {
  public authCount = 0;
  public shouldThrow: boolean = false;

  public async getBearerToken(): Promise<string> {
    this.authCount++;

    if (this.shouldThrow) {
      throw new Error("Failed to retrieve the token");
    }

    return "mock-token";
  }
}
