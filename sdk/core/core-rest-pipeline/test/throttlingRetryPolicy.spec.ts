// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import * as sinon from "sinon";
import {
  createPipelineRequest,
  SendRequest,
  PipelineResponse,
  createHttpHeaders,
  throttlingRetryPolicy,
} from "../src";
import { DEFAULT_CLIENT_MAX_RETRY_COUNT } from "../src/policies/throttlingRetryPolicy";

describe("throttlingRetryPolicy", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("It should retry after a given number of seconds on a response with status code 429", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const retryResponse: PipelineResponse = {
      headers: createHttpHeaders({
        "Retry-After": "10",
      }),
      request,
      status: 429,
    };
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
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

  it("It should retry after a given date occurs on a response with status code 429", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const retryResponse: PipelineResponse = {
      headers: createHttpHeaders({
        "Retry-After": "Wed, 21 Oct 2015 07:28:00 GMT",
      }),
      request,
      status: 429,
    };
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
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

  it("It should retry after a given number of seconds on a response with status code 503", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const retryResponse: PipelineResponse = {
      headers: createHttpHeaders({
        "Retry-After": "10",
      }),
      request,
      status: 503,
    };
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
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

  it("It should retry after a given date occurs on a response with status code 503", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const retryResponse: PipelineResponse = {
      headers: createHttpHeaders({
        "Retry-After": "Wed, 21 Oct 2015 07:28:00 GMT",
      }),
      request,
      status: 503,
    };
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
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

  it("It should retry up to the default max retries", async function (this: Context) {
    const clock = sinon.useFakeTimers();

    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const retryResponse: PipelineResponse = {
      headers: createHttpHeaders({
        "Retry-After": "1",
      }),
      request,
      status: 503,
    };

    const policy = throttlingRetryPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    let i = 0;
    for (; i < DEFAULT_CLIENT_MAX_RETRY_COUNT; ++i) {
      next.onCall(i).resolves(retryResponse);
    }
    // This one should be returned
    next.onCall(i).resolves({
      headers: createHttpHeaders({
        "Retry-After": "1",
        "final-response": "final-response",
      }),
      request,
      status: 503,
    });

    const promise = policy.sendRequest(request, next);
    await clock.tickAsync(i * 1000);
    const response = await promise;
    assert.equal(response.status, 503);
    assert.equal(response.headers.get("final-response"), "final-response");

    clock.restore();
  });
});
