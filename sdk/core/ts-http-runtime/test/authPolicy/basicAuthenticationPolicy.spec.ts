// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi } from "vitest";
import type {
  BasicCredential,
  HttpClient,
  PipelinePolicy,
  PipelineResponse,
  SendRequest,
} from "../../src/index.js";
import { createHttpHeaders, createPipelineRequest } from "../../src/index.js";
import { basicAuthenticationPolicy } from "../../src/policies/auth/basicAuthenticationPolicy.js";
import { createDefaultPipeline } from "../../src/client/clientHelpers.js";
import { logger } from "../../src/log.js";

describe("basicAuthenticationPolicy", () => {
  it("should add basic auth header with correct encoding", async () => {
    const username = "testuser";
    const password = "testpass";
    const expectedHeader = "Basic dGVzdHVzZXI6dGVzdHBhc3M="; // base64(testuser:testpass)

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<SendRequest>();
    next.mockResolvedValue(successResponse);

    const policy = createBasicAuthPolicy(username, password);
    await policy.sendRequest(request, next);

    expect(request.headers.get("Authorization")).toBe(expectedHeader);
  });

  it("should handle special characters in credentials", async () => {
    const username = "test@user";
    const password = "test:pass";
    const expectedHeader = "Basic dGVzdEB1c2VyOnRlc3Q6cGFzcw=="; // base64(test@user:test:pass)

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<SendRequest>();
    next.mockResolvedValue(successResponse);

    const policy = createBasicAuthPolicy(username, password);
    await policy.sendRequest(request, next);

    expect(request.headers.get("Authorization")).toBe(expectedHeader);
  });

  it("should allow insecure connection", async () => {
    const mockCredential: BasicCredential = {
      username: "mockUser",
      password: "mockPassword",
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

function createBasicAuthPolicy(username: string, password: string): PipelinePolicy {
  return basicAuthenticationPolicy({
    credential: { username, password },
    authSchemes: [
      {
        kind: "http",
        scheme: "basic",
      },
    ],
  });
}
