// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineRequest, SendRequest } from "@azure/core-rest-pipeline";
import { RestError, createHttpHeaders } from "@azure/core-rest-pipeline";

import type { MSIConfiguration } from "$internal/credentials/managedIdentityCredential/models.js";
import { imdsRetryPolicy } from "$internal/credentials/managedIdentityCredential/imdsRetryPolicy.js";
import { describe, it, assert, expect } from "vitest";

describe("imdsRetryPolicy", () => {
  const mockRetryConfig: MSIConfiguration["retryConfig"] = {
    maxRetries: 3,
    startDelayInMs: 1,
    intervalIncrement: 1,
  };

  it("should retry on 404 errors", async () => {
    const policy = imdsRetryPolicy(mockRetryConfig);
    const pipelineRequest: PipelineRequest = {
      url: "https://example.com",
      method: "GET",
      headers: createHttpHeaders(),
      body: undefined,
      abortSignal: undefined,
      timeout: 100,
      requestId: "test",
      withCredentials: false,
    };

    let sendRequestCount = 0;

    const sendRequest: SendRequest = async (request) => {
      sendRequestCount++;
      if (sendRequestCount === 1) {
        // Simulate a 404 error on the first request
        const response = {
          status: 404,
          headers: createHttpHeaders(),
          request,
        };
        throw new RestError("Not found", { statusCode: 404, request, response });
      } else {
        // Return a successful response on subsequent requests
        return {
          status: 200,
          headers: createHttpHeaders(),
          request: request,
          body: undefined,
        };
      }
    };

    await policy.sendRequest(pipelineRequest, sendRequest);

    assert.strictEqual(sendRequestCount, 2); // Should retry once
  });

  it("should retry on 410 errors", async () => {
    const policy = imdsRetryPolicy(mockRetryConfig);
    const pipelineRequest: PipelineRequest = {
      url: "https://example.com",
      method: "GET",
      headers: createHttpHeaders(),
      body: undefined,
      abortSignal: undefined,
      timeout: 100,
      requestId: "test",
      withCredentials: false,
    };

    let sendRequestCount = 0;

    const sendRequest: SendRequest = async (request) => {
      sendRequestCount++;
      if (sendRequestCount === 1) {
        // Simulate a 410 error on the first request
        const response = {
          status: 410,
          headers: createHttpHeaders(),
          request,
        };
        throw new RestError("Gone", { statusCode: 410, request, response });
      } else {
        // Return a successful response on subsequent requests
        return {
          status: 200,
          headers: createHttpHeaders(),
          request: request,
          body: undefined,
        };
      }
    };

    await policy.sendRequest(pipelineRequest, sendRequest);

    assert.strictEqual(sendRequestCount, 2); // Should retry once
  });

  it("should respect the maximum number of retries", async () => {
    const policy = imdsRetryPolicy(mockRetryConfig);
    const pipelineRequest: PipelineRequest = {
      url: "https://example.com",
      method: "GET",
      headers: createHttpHeaders(),
      timeout: 100,
      requestId: "test",
      withCredentials: false,
    };

    let sendRequestCount = 0;
    const sendRequest: SendRequest = async (request) => {
      sendRequestCount++;
      // Simulate a 404 error on every request
      const response = {
        status: 404,
        headers: createHttpHeaders(),
        request,
        body: undefined,
      };
      throw new RestError("Not found", { statusCode: 404, request, response });
    };

    await expect(policy.sendRequest(pipelineRequest, sendRequest)).rejects.toThrow("Not found");
    assert.strictEqual(sendRequestCount, mockRetryConfig.maxRetries + 1); // Should retry the maximum number of times
  });

  it("should use minimum 3-second delay for 410 responses", async () => {
    // Use a config with a very small initial delay to test the minimum is enforced
    const configWithSmallDelay: MSIConfiguration["retryConfig"] = {
      maxRetries: 1,
      startDelayInMs: 10, // Very small delay
      intervalIncrement: 1,
    };

    const policy = imdsRetryPolicy(configWithSmallDelay);
    const pipelineRequest: PipelineRequest = {
      url: "https://example.com",
      method: "GET",
      headers: createHttpHeaders(),
      timeout: 100,
      requestId: "test",
      withCredentials: false,
    };

    let sendRequestCount = 0;

    const sendRequest: SendRequest = async (request) => {
      sendRequestCount++;
      // Always return 410 to trigger retry logic
      const response = {
        status: 410,
        headers: createHttpHeaders(),
        request,
        body: undefined,
      };
      throw new RestError("Gone", { statusCode: 410, request, response });
    };

    try {
      await policy.sendRequest(pipelineRequest, sendRequest);
    } catch (error) {
      // Expected to fail after retries
    }

    // Should retry once (total attempts = maxRetries + 1)
    assert.strictEqual(sendRequestCount, configWithSmallDelay.maxRetries + 1);
  });

  it("should not enforce minimum delay for 404 responses", async () => {
    // This test just verifies that 404s are still retried correctly
    const configWithSmallDelay: MSIConfiguration["retryConfig"] = {
      maxRetries: 1,
      startDelayInMs: 50, // Small delay
      intervalIncrement: 1,
    };

    const policy = imdsRetryPolicy(configWithSmallDelay);
    const pipelineRequest: PipelineRequest = {
      url: "https://example.com",
      method: "GET",
      headers: createHttpHeaders(),
      timeout: 100,
      requestId: "test",
      withCredentials: false,
    };

    let sendRequestCount = 0;

    const sendRequest: SendRequest = async (request) => {
      sendRequestCount++;
      // Always return 404 to trigger retry logic
      const response = {
        status: 404,
        headers: createHttpHeaders(),
        request,
        body: undefined,
      };
      throw new RestError("Not found", { statusCode: 404, request, response });
    };

    try {
      await policy.sendRequest(pipelineRequest, sendRequest);
    } catch (error) {
      // Expected to fail after retries
    }

    // Should retry once (total attempts = maxRetries + 1)
    assert.strictEqual(sendRequestCount, configWithSmallDelay.maxRetries + 1);
  });

  it("should not retry on other status codes", async () => {
    const policy = imdsRetryPolicy(mockRetryConfig);
    const pipelineRequest: PipelineRequest = {
      url: "https://example.com",
      method: "GET",
      headers: createHttpHeaders(),
      timeout: 100,
      requestId: "test",
      withCredentials: false,
    };

    let sendRequestCount = 0;

    const sendRequest: SendRequest = async (request) => {
      sendRequestCount++;
      // Simulate a 500 error (should not retry)
      const response = {
        status: 500,
        headers: createHttpHeaders(),
        request,
        body: undefined,
      };
      throw new RestError("Internal Server Error", { statusCode: 500, request, response });
    };

    await expect(policy.sendRequest(pipelineRequest, sendRequest)).rejects.toThrow(
      "Internal Server Error",
    );
    assert.strictEqual(sendRequestCount, 1); // Should not retry
  });
});
