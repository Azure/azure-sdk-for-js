// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest, PipelineResponse } from "../src/interfaces";
import { createHttpHeaders } from "../src/httpHeaders";
import { assert } from "chai";
import {
  readWriteFailoverHostIteratorFactory,
  failoverRetryStrategy,
} from "../src/retryStrategies/failoverRetryStrategy";
import { DefaultRetryPolicyOptions } from "../src/policies/defaultRetryPolicy";
import sinon from "sinon";

describe(`failoverRetryStrategy`, () => {
  const timer = sinon.useFakeTimers();
  const readHosts = ["read1.azure", "read2.azure", "read3.azure"];
  const writeHosts = ["write1.azure", "write2.azure"];
  const maxRetries = 10;
  const options: DefaultRetryPolicyOptions = {
    maxRetries,
    maxRetryDelayInMs: 1600,
    retryDelayInMs: 100,
    failoverHostIteratorFactory: readWriteFailoverHostIteratorFactory({ readHosts, writeHosts }),
  };

  const strategy = failoverRetryStrategy(options);

  it("should redirect and delay correctly", () => {
    const modifiers = [];
    const response: PipelineResponse = {
      headers: createHttpHeaders(),
      request: {
        headers: createHttpHeaders(),
        method: "GET",
        url: "https://localhost",
        requestId: "",
        timeout: 0,
        withCredentials: false,
      },
      status: 500,
    };
    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      const modifier = strategy.retry({
        retryCount,
        response,
      });
      modifiers.push(modifier);
      timer.tickAsync(modifier.retryAfterInMs!);
    }
    assert.deepEqual(modifiers, [
      { redirectTo: "read1.azure" },
      { redirectTo: "read2.azure" },
      { redirectTo: "read3.azure" },
      { redirectTo: "read1.azure", retryAfterInMs: 100 },
      { redirectTo: "read2.azure", retryAfterInMs: 100 },
      { redirectTo: "read3.azure", retryAfterInMs: 100 },
      { redirectTo: "read1.azure", retryAfterInMs: 300 },
      { redirectTo: "read2.azure", retryAfterInMs: 300 },
      { redirectTo: "read3.azure", retryAfterInMs: 300 },
      { redirectTo: "read1.azure", retryAfterInMs: 700 },
    ]);
  });
  it("should use the correct set of fallback endpoints", () => {
    const modifiers = [];
    const getRequest: PipelineRequest = {
      headers: createHttpHeaders(),
      method: "GET",
      url: "https://localhost",
      requestId: "",
      timeout: 1000,
      withCredentials: false,
    };
    const postRequest: PipelineRequest = {
      headers: createHttpHeaders(),
      method: "POST",
      url: "https://localhost",
      requestId: "",
      timeout: 1000,
      withCredentials: false,
    };
    for (const request of [getRequest, postRequest]) {
      for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
        const modifier = strategy.retry({
          retryCount,
          response: {
            headers: createHttpHeaders(),
            request: request,
            status: 500,
          },
        });
        modifiers.push(modifier);
      }
    }
    assert.deepEqual(
      modifiers.map((modifier) => modifier.redirectTo),
      [
        "read1.azure",
        "read2.azure",
        "read3.azure",
        "read1.azure",
        "read2.azure",
        "read3.azure",
        "read1.azure",
        "read2.azure",
        "read3.azure",
        "read1.azure",
        "write1.azure",
        "write2.azure",
        "write1.azure",
        "write2.azure",
        "write1.azure",
        "write2.azure",
        "write1.azure",
        "write2.azure",
        "write1.azure",
        "write2.azure",
      ]
    );
  });
});
