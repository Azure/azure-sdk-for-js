// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi, afterEach } from "vitest";
import {
  type PipelineResponse,
  type SendRequest,
  createHttpHeaders,
  createPipelineRequest,
  throttlingRetryPolicy,
} from "../src/index.js";
import { DEFAULT_RETRY_POLICY_COUNT } from "../src/constants.js";

describe("throttlingRetryPolicy", function () {
  afterEach(function () {
    vi.useRealTimers();
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
        const next = vi.fn<SendRequest>();
        next.mockResolvedValueOnce(retryResponse);
        next.mockResolvedValueOnce(successResponse);

        vi.useFakeTimers({ now: 0 });

        const promise = policy.sendRequest(request, next);
        expect(next).toHaveBeenCalledOnce();

        // allow the delay to occur
        await vi.advanceTimersToNextTimerAsync();
        assert.strictEqual(Date.now(), defaultDuration);
        expect(next).toHaveBeenCalledTimes(2);

        const result = await promise;

        assert.strictEqual(result, successResponse);
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
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(retryResponse);
    next.mockResolvedValueOnce(successResponse);

    vi.useFakeTimers({ now: new Date("Wed, 21 Oct 2015 07:20:00 GMT") });

    const promise = policy.sendRequest(request, next);
    expect(next).toHaveBeenCalledOnce();

    // allow the delay to occur
    await vi.advanceTimersToNextTimerAsync();
    assert.strictEqual(
      Date.now(),
      new Date("Wed, 21 Oct 2015 07:28:00 GMT").getTime(),
      "It should now be the time from the header.",
    );
    expect(next).toHaveBeenCalledTimes(2);

    const result = await promise;

    assert.strictEqual(result, successResponse);
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
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(retryResponse);
    next.mockResolvedValueOnce(successResponse);

    vi.useFakeTimers({ now: 0 });

    const promise = policy.sendRequest(request, next);
    expect(next).toHaveBeenCalledOnce();

    // allow the delay to occur
    await vi.advanceTimersToNextTimerAsync();
    assert.strictEqual(Date.now(), 10 * 1000);
    expect(next).toHaveBeenCalledTimes(2);

    const result = await promise;

    assert.strictEqual(result, successResponse);
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
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(retryResponse);
    next.mockResolvedValueOnce(successResponse);

    vi.useFakeTimers({ now: new Date("Wed, 21 Oct 2015 07:20:00 GMT") });

    const promise = policy.sendRequest(request, next);
    expect(next).toHaveBeenCalledOnce();

    // allow the delay to occur
    await vi.advanceTimersToNextTimerAsync();
    assert.strictEqual(
      Date.now(),
      new Date("Wed, 21 Oct 2015 07:28:00 GMT").getTime(),
      "It should now be the time from the header.",
    );
    expect(next).toHaveBeenCalledTimes(2);

    const result = await promise;

    assert.strictEqual(result, successResponse);
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
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(retryResponse);
    next.mockResolvedValueOnce(successResponse);

    const promise = policy.sendRequest(request, next);
    vi.useFakeTimers();

    expect(next).toHaveBeenCalledOnce();
    await vi.advanceTimersToNextTimerAsync();
    expect(next).toHaveBeenCalledTimes(2);

    const result = await promise;

    assert.strictEqual(result, successResponse);
  });

  it("It should retry up to the default max retries", async function () {
    vi.useFakeTimers();

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
    const next = vi.fn<SendRequest>();
    let i = 0;
    for (; i < DEFAULT_RETRY_POLICY_COUNT; ++i) {
      next.mockResolvedValueOnce(retryResponse);
    }
    // This one should be returned
    next.mockResolvedValueOnce({
      headers: createHttpHeaders({
        "Retry-After": "1",
        "final-response": "final-response",
      }),
      request,
      status: 503,
    });

    const promise = policy.sendRequest(request, next);
    await vi.advanceTimersByTimeAsync(i * 1000);
    const response = await promise;
    assert.equal(response.status, 503);
    assert.equal(response.headers.get("final-response"), "final-response");
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
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(retryResponse);
    next.mockResolvedValueOnce(successResponse);

    await expect(policy.sendRequest(request, next)).rejects.toThrow("The operation was aborted.");
    expect(next).toHaveBeenCalledOnce();
  });
});
