// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineRequest,
  RestError,
  SendRequest,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";

import { MSIConfiguration } from "../../../../src/credentials/managedIdentityCredential/models";
import { assert } from "@azure-tools/test-utils";
import { imdsRetryPolicy } from "../../../../src/credentials/managedIdentityCredential/imdsRetryPolicy";

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

    await assert.isRejected(policy.sendRequest(pipelineRequest, sendRequest), "Not found");
    assert.strictEqual(sendRequestCount, mockRetryConfig.maxRetries + 1); // Should retry the maximum number of times
  });
});
