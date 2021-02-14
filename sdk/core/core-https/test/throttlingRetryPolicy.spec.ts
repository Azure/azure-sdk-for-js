// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import {
  createPipelineRequest,
  SendRequest,
  PipelineResponse,
  createHttpHeaders,
  throttlingRetryPolicy
} from "../src";

describe("throttlingRetryPolicy", function() {
  afterEach(function() {
    sinon.restore();
  });

  it("It should retry after a given number of seconds", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com"
    });
    const retryResponse: PipelineResponse = {
      headers: createHttpHeaders({
        "Retry-After": "10"
      }),
      request,
      status: 429
    };
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200
    };

    const policy = throttlingRetryPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.onFirstCall().resolves(retryResponse);
    next.onSecondCall().resolves(successResponse);

    const clock = sinon.useFakeTimers();

    const promise = policy.sendRequest(request, next);
    assert.isTrue(next.calledOnce);

    // allow the delay to occur
    const time = await clock.nextAsync();
    assert.strictEqual(time, 10 * 1000);
    assert.isTrue(next.calledTwice);

    const result = await promise;

    assert.strictEqual(result, successResponse);
    clock.restore();
  });

  it("It should retry after a given date occurs", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com"
    });
    const retryResponse: PipelineResponse = {
      headers: createHttpHeaders({
        "Retry-After": "Wed, 21 Oct 2015 07:28:00 GMT"
      }),
      request,
      status: 429
    };
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200
    };

    const policy = throttlingRetryPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.onFirstCall().resolves(retryResponse);
    next.onSecondCall().resolves(successResponse);

    const clock = sinon.useFakeTimers(new Date("Wed, 21 Oct 2015 07:20:00 GMT"));

    const promise = policy.sendRequest(request, next);
    assert.isTrue(next.calledOnce);

    // allow the delay to occur
    const time = await clock.nextAsync();
    assert.strictEqual(
      time,
      new Date("Wed, 21 Oct 2015 07:28:00 GMT").getTime(),
      "It should now be the time from the header."
    );
    assert.isTrue(next.calledTwice);

    const result = await promise;

    assert.strictEqual(result, successResponse);
    clock.restore();
  });
});
