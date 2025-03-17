// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi } from "vitest";
import type { PipelinePolicy, PipelineResponse, SendRequest } from "../../src/index.js";
import { AuthType, createHttpHeaders, createPipelineRequest } from "../../src/index.js";
import { basicAuthenticationPolicy } from "../../src/policies/auth/basicAuthenticationPolicy.js";

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
});

function createBasicAuthPolicy(username: string, password: string): PipelinePolicy {
  return basicAuthenticationPolicy({
    credential: { username, password },
    authSchemes: [
      {
        type: AuthType.Http,
        scheme: "basic",
      },
    ],
  });
}
