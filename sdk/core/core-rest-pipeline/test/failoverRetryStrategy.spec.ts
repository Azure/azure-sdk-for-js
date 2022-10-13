// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest, PipelineResponse } from "../src/interfaces";
import { createHttpHeaders } from "../src/httpHeaders";
import { assert } from "chai";
import {
  failoverRetryStrategy,
  readWriteFailoverHostDelegate,
} from "../src/retryStrategies/failoverRetryStrategy";
import { DefaultRetryPolicyOptions } from "../src/policies/defaultRetryPolicy";
import sinon from "sinon";
import * as retryAfterUtil from "../src/util/retryAfter";

describe(`failoverRetryStrategy`, () => {
  const readHosts = ["https://read1.azure", "https://read2.azure", "https://read3.azure"];
  const writeHosts = ["https://write1.azure", "https://write2.azure"];
  const maxRetries = 10;
  const options: DefaultRetryPolicyOptions = {
    maxRetries,
    maxRetryDelayInMs: 1600,
    retryDelayInMs: 100,
    failoverHostDelegate: readWriteFailoverHostDelegate({ readHosts, writeHosts }),
  };

  const strategy = failoverRetryStrategy(options);

  it("should redirect and delay correctly", () => {
    const timer = sinon.useFakeTimers();
    const stub = sinon
      .stub(retryAfterUtil, "exponentialDelayInMs")
      .callsFake((retryCount, retryDelayInMs, maxRetryDelayInMs) => {
        return stub.wrappedMethod(retryCount, retryDelayInMs, maxRetryDelayInMs, true);
      });

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
      timer.runAll();
    }
    assert.deepEqual(modifiers, [
      { redirectTo: "https://read1.azure/" },
      { redirectTo: "https://read2.azure/" },
      { redirectTo: "https://read3.azure/" },
      { redirectTo: "https://read1.azure/", retryAfterInMs: 100 },
      { redirectTo: "https://read2.azure/", retryAfterInMs: 100 },
      { redirectTo: "https://read3.azure/", retryAfterInMs: 100 },
      { redirectTo: "https://read1.azure/", retryAfterInMs: 300 },
      { redirectTo: "https://read2.azure/", retryAfterInMs: 300 },
      { redirectTo: "https://read3.azure/", retryAfterInMs: 300 },
      { redirectTo: "https://read1.azure/", retryAfterInMs: 700 },
    ]);

    stub.restore();
    timer.restore();
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
        "https://read1.azure/",
        "https://read2.azure/",
        "https://read3.azure/",
        "https://read1.azure/",
        "https://read2.azure/",
        "https://read3.azure/",
        "https://read1.azure/",
        "https://read2.azure/",
        "https://read3.azure/",
        "https://read1.azure/",
        "https://write1.azure/",
        "https://write2.azure/",
        "https://write1.azure/",
        "https://write2.azure/",
        "https://write1.azure/",
        "https://write2.azure/",
        "https://write1.azure/",
        "https://write2.azure/",
        "https://write1.azure/",
        "https://write2.azure/",
      ]
    );
  });
});
