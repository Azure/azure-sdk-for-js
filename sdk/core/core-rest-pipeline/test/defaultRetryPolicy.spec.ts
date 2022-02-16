// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import { createPipelineRequest, SendRequest, RestError, defaultRetryPolicy } from "../src";

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

  it("It should give up after the default maxRetries is reached", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const testError = new RestError("Test Error!", { code: "ENOENT" });

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
    assert.strictEqual(next.callCount, 4);
    assert.isTrue(catchCalled);
  });
});
