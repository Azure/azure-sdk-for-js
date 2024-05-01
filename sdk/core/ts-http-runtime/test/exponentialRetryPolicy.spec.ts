// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import {
  PipelineResponse,
  RestError,
  SendRequest,
  createHttpHeaders,
  createPipelineRequest,
} from "../src";
import { exponentialRetryPolicy } from "../src/policies/exponentialRetryPolicy";
import { DEFAULT_RETRY_POLICY_COUNT } from "../src/constants";

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

    await assert.isRejected(policy.sendRequest(request, next), /Test Error/);
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

    const promise = assert.isRejected(policy.sendRequest(request, next), /Test Error/);
    await clock.runAllAsync();
    await promise;
    assert.strictEqual(next.callCount, DEFAULT_RETRY_POLICY_COUNT + 1);
  });
});
