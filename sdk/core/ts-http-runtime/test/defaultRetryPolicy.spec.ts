// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import { RestError, SendRequest, createPipelineRequest, defaultRetryPolicy } from "../src";
import { DEFAULT_RETRY_POLICY_COUNT } from "../src/constants";

describe("defaultRetryPolicy", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("It should throw immediately if the response or error doesn't match anything we were expecting", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const testError = new RestError("Test Error!", { code: "UNEXPECTED" });

    const policy = defaultRetryPolicy();
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
    // should be one more than the default retry count
    assert.strictEqual(next.callCount, 1);
    assert.isTrue(catchCalled);
  });

  ["ETIMEDOUT", "ESOCKETTIMEDOUT", "ECONNREFUSED", "ENOENT", "ENOTFOUND"].forEach((errorCode) => {
    it(`It should give up after the default maxRetries is reached for ${errorCode} error`, async () => {
      const request = createPipelineRequest({
        url: "https://bing.com",
      });
      const policy = defaultRetryPolicy();
      const clock = sinon.useFakeTimers();

      const testError = new RestError("Test Error!", { code: errorCode });

      const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
      next.rejects(testError);

      let catchCalled = false;
      const promise = policy.sendRequest(request, next);
      promise.catch((e) => {
        catchCalled = true;
        assert.strictEqual(e, testError);
      });
      await clock.runAllAsync();
      assert.strictEqual(next.callCount, DEFAULT_RETRY_POLICY_COUNT + 1);
      assert.isTrue(catchCalled);
    });
  });

  it("It should not retry on RestError with status 416", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const testError = new RestError("Test Error!", { statusCode: 416 });

    const policy = defaultRetryPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.rejects(testError);

    await assert.isRejected(policy.sendRequest(request, next), /Test Error/);
    assert.strictEqual(next.callCount, 1);
  });
});
