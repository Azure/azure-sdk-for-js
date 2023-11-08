// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import {
  PipelineResponse,
  RestError,
  SendRequest,
  createHttpHeaders,
  createPipelineRequest,
  exponentialRetryPolicy,
} from "../src/index.js";
import { describe, it, assert, afterEach, expect } from "vitest";
import { DEFAULT_RETRY_POLICY_COUNT } from "../src/constants.js";

describe("exponentialRetryPolicy", function () {
  afterEach(function () {
    sinon.restore();
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
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.rejects(testError);

    await expect(policy.sendRequest(request, next)).rejects.toThrowError();
    assert.strictEqual(next.callCount, 1);
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
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.rejects(testError);

    const clock = sinon.useFakeTimers();

    const promise = expect(policy.sendRequest(request, next)).rejects.toThrowError();
    await clock.runAllAsync();
    await promise;
    assert.strictEqual(next.callCount, DEFAULT_RETRY_POLICY_COUNT + 1);
  });
});
