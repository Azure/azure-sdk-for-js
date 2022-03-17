// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import {
  RestError,
  SendRequest,
  createPipelineRequest,
  PipelineResponse,
  createHttpHeaders,
  exponentialRetryPolicy,
} from "../src";
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

    const clock = sinon.useFakeTimers();

    let catchCalled = false;
    const promise = policy.sendRequest(request, next);
    promise.catch((e) => {
      catchCalled = true;
      assert.strictEqual(e, testError);
    });
    await clock.runAllAsync();
    assert.strictEqual(next.callCount, 1);
    assert.isTrue(catchCalled);
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

    let catchCalled = false;
    const promise = policy.sendRequest(request, next);
    promise.catch((e) => {
      catchCalled = true;
      assert.strictEqual(e, testError);
    });
    await clock.runAllAsync();
    assert.strictEqual(next.callCount, DEFAULT_RETRY_POLICY_COUNT + 1);
    assert.isFalse(catchCalled);
  });
});
