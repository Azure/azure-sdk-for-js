// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import {
  createPipelineRequest,
  SendRequest,
  PipelineResponse,
  createHttpHeaders,
  systemErrorRetryPolicy,
  RestError
} from "../src";

describe("systemErrorRetryPolicy", function() {
  afterEach(function() {
    sinon.restore();
  });

  it("It should retry after a system error", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com"
    });
    const systemError = new RestError("Test Error!", { code: "ENOENT" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200
    };

    const policy = systemErrorRetryPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.onFirstCall().rejects(systemError);
    next.onSecondCall().resolves(successResponse);

    const clock = sinon.useFakeTimers();

    const promise = policy.sendRequest(request, next);
    assert.isTrue(next.calledOnce);

    // allow the delay to occur
    const time = await clock.nextAsync();
    // should be at least the standard delay
    assert.isAtLeast(time, 1000);
    assert.isTrue(next.calledTwice);

    const result = await promise;

    assert.strictEqual(result, successResponse);
  });

  it("It should give up after the limit is reached", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com"
    });
    const systemError = new RestError("Test Error!", { code: "ENOENT" });

    const policy = systemErrorRetryPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.rejects(systemError);

    const clock = sinon.useFakeTimers();

    let catchCalled = false;
    const promise = policy.sendRequest(request, next);
    promise.catch((e) => {
      catchCalled = true;
      assert.strictEqual(e, systemError);
    });
    await clock.runAllAsync();
    // should be one more than the default retry count
    assert.strictEqual(next.callCount, 11);
    assert.isTrue(catchCalled);
  });
});
