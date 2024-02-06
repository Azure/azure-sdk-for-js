// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);
import { Context } from "mocha";
import * as sinon from "sinon";
import { PipelineResponse, SendRequest, createHttpHeaders, createPipelineRequest } from "../src";
import { throttlingRetryPolicy } from "../src/policies/throttlingRetryPolicy";
import { DEFAULT_RETRY_POLICY_COUNT } from "../src/constants";

describe("throttlingRetryPolicy", function () {
  afterEach(function () {
    sinon.restore();
  });

  const defaultDurations = [0, 10 * 1000]; // milliseconds

  defaultDurations.forEach((defaultDuration) => {
    const headersWithDefaultDuration = [
      {
        "Retry-After": String(defaultDuration / 1000),
      },
      {
        "retry-after-ms": String(defaultDuration),
      },
      {
        "x-ms-retry-after-ms": String(defaultDuration),
      },
    ] as const;
    headersWithDefaultDuration.forEach((headers) => {
      it(`(${
        Object.keys(headers)[0]
      }) - should retry after a given number of seconds/milliseconds on a response with status code 429`, async () => {
        const request = createPipelineRequest({
          url: "https://bing.com",
        });
        const retryResponse: PipelineResponse = {
          headers: createHttpHeaders(headers),
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
        assert.isTrue(next.calledOnce, "next wasn't called once");

        // allow the delay to occur
        const time = await clock.nextAsync();
        assert.strictEqual(time, defaultDuration);
        assert.isTrue(next.calledTwice, "next wasn't called twice");

        const result = await promise;

        assert.strictEqual(result, successResponse);
        clock.restore();
      });
    });
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

  it("It should retry after 0 seconds with status code 503 for a past date", async () => {
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

    const promise = policy.sendRequest(request, next);
    const clock = sinon.useFakeTimers();

    assert.isTrue(next.calledOnce, "next wasn't called once");
    await clock.nextAsync();
    assert.isTrue(next.calledTwice, "next wasn't called twice");

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
    for (; i < DEFAULT_RETRY_POLICY_COUNT; ++i) {
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

  it("throttlingRetryPolicy should honor abort signal", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
      abortSignal: AbortSignal.timeout(100), // test should end at 100ms
    });
    const retryResponse: PipelineResponse = {
      headers: createHttpHeaders({
        "Retry-After": "10000", // 10000 seconds - a large duration
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

    await assert.isRejected(
      policy.sendRequest(request, next),
      "The operation was aborted.",
      "Unexpected error thrown"
    );

    assert.isTrue(next.calledOnce);
    assert.isFalse(next.calledTwice);
  });
});
