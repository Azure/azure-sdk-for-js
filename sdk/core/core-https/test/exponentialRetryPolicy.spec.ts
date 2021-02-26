// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import {
  createPipelineRequest,
  SendRequest,
  PipelineResponse,
  createHttpHeaders,
  exponentialRetryPolicy
} from "../src";

describe("exponentialRetryPolicy", () => {
  afterEach(function() {
    sinon.restore();
  });

  it("It should retry when specific status codes are encountered", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com"
    });

    const retryStatusCodes: number[] = [
      // Client error responses
      408, // Request timeout
      425, // Too early
      429, // Too many requests

      // Server error responses
      // Anything but 501 and 505
      500, // Internal server error
      503, // Service unavailable
      504 // Gateway timeout
    ];

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200
    };

    for (const status of retryStatusCodes) {
      const retryResponse: PipelineResponse = {
        headers: createHttpHeaders({
          "Retry-After": "10"
        }),
        request,
        status
      };

      const policy = exponentialRetryPolicy();
      const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
      next.onFirstCall().resolves(retryResponse);
      next.onSecondCall().resolves(retryResponse);
      next.onThirdCall().resolves(successResponse);

      const clock = sinon.useFakeTimers();

      const promise = policy.sendRequest(request, next);
      assert.isTrue(next.calledOnce);

      await clock.nextAsync();
      assert.isTrue(next.calledTwice);

      await clock.nextAsync();
      assert.isTrue(next.calledThrice);

      const result = await promise;

      assert.strictEqual(result, successResponse);
      clock.restore();
    }
  });
});
