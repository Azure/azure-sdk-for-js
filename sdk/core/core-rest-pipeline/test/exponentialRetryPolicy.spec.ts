// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, afterEach, vi, expect } from "vitest";

import {
  type PipelineResponse,
  RestError,
  type SendRequest,
  createHttpHeaders,
  createPipelineRequest,
  exponentialRetryPolicy,
} from "../src";
import { DEFAULT_RETRY_POLICY_COUNT } from "../src/constants";

describe("exponentialRetryPolicy", function () {
  afterEach(function () {
    vi.useRealTimers();
  });

  it("It should throw immediately if we get a 416 response", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const response: PipelineResponse = {
      headers: createHttpHeaders({}),
      request,
      status: 416,
    };
    const testError = new RestError("Test Error!", { statusCode: 416, response });

    const policy = exponentialRetryPolicy();
    const next = vi.fn<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.mockRejectedValue(testError);

    await expect(policy.sendRequest(request, next)).rejects.toThrow(/Test Error/);
    expect(next).toHaveBeenCalledOnce();
  });

  it("It should retry with a 503 response", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const response: PipelineResponse = {
      headers: createHttpHeaders({}),
      request,
      status: 503,
    };
    const testError = new RestError("Test Error!", { statusCode: 503, response });

    const policy = exponentialRetryPolicy();
    const next = vi.fn<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.mockRejectedValue(testError);

    vi.useFakeTimers();

    const promise = expect(policy.sendRequest(request, next)).rejects.toThrow(/Test Error/);
    await vi.runAllTimersAsync();
    await promise;
    expect(next).toHaveBeenCalledTimes(DEFAULT_RETRY_POLICY_COUNT + 1);
  });
});
