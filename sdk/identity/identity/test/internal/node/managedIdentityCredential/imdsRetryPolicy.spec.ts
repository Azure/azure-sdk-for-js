// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { imdsRetryPolicy } from "../../../../src/credentials/managedIdentityCredential/imdsRetryPolicy";
import { PipelineRequest, SendRequest, createHttpHeaders } from "@azure/core-rest-pipeline";
import { MSIConfiguration } from "../../../../src/credentials/managedIdentityCredential/models";
import { assert } from "@azure-tools/test-utils";

describe("imdsRetryPolicy", () => {
  const mockRetryConfig: MSIConfiguration["retryConfig"] = {
    maxRetries: 3,
    startDelayInMs: 100,
    intervalIncrement: 1000,
  };

  it("should retry on 404 errors", async () => {
    const policy = imdsRetryPolicy(mockRetryConfig);
    const request: PipelineRequest = {
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

    const sendRequest: SendRequest = async (req) => {
      sendRequestCount++;
      if (sendRequestCount === 1) {
        // Simulate a 404 error on the first request
        return {
          status: 404,
          headers: createHttpHeaders(),
          request: req,
          body: undefined,
        };
      } else {
        // Return a successful response on subsequent requests
        return {
          status: 200,
          headers: createHttpHeaders(),
          request: req,
          body: undefined,
        };
      }
    };

    await policy.sendRequest(request, sendRequest);

    assert.strictEqual(sendRequestCount, 2); // Should retry once
  });

  it("should respect the maximum number of retries", async () => {
    const policy = imdsRetryPolicy(mockRetryConfig);
    const request: PipelineRequest = {
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
    const sendRequest: SendRequest = async (req) => {
      sendRequestCount++;
      // Simulate a 404 error on every request
      // Simulate a 404 error on the first request
      return {
        status: 404,
        headers: createHttpHeaders(),
        request: req,
        body: undefined,
      };
    };

    await assert.isRejected(policy.sendRequest(request, sendRequest), "Not Found");
    assert.strictEqual(sendRequestCount, mockRetryConfig.maxRetries + 1); // Should retry the maximum number of times
  });
});
