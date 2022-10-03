// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest, RetryStrategy, createHttpHeaders } from "@azure/core-rest-pipeline";
import { assert } from "@azure/test-utils";
import { georedundantRetryStrategy } from "../../src/policies/georedundantRetryStrategy";
import sinon from "sinon";

describe(`georedundantRetryStrategy`, () => {
  const options = {
    maxRetries: 10,
    maxRetryDelayInMs: 1600,
    readHosts: ["read1.azure", "read2.azure", "read3.azure"],
    writeHosts: ["write1.azure", "write2.azure"],
    retryDelayInMs: 100,
  };
  const now = 0;

  let strategy: RetryStrategy;
  let stub: sinon.SinonStub;
  beforeEach(() => {
    strategy = georedundantRetryStrategy(options);
    stub = sinon.stub(Date, "now").callsFake(() => 0);
  });
  afterEach(() => {
    stub.restore();
  });

  it("should redirect and delay correctly", () => {
    const modifiers = [];
    for (let retryCount = 0; retryCount < options.maxRetries; retryCount++) {
      const modifier = strategy.retry({
        retryCount,
        response: {
          headers: createHttpHeaders(),
          request: {
            headers: createHttpHeaders(),
            method: "GET",
            url: "https://localhost",
            requestId: "",
            timeout: 1000,
            withCredentials: false,
          },
          status: 500,
        },
      });
      modifiers.push(modifier);
    }
    assert.deepEqual(modifiers, [
      { redirectTo: "read1.azure" },
      { redirectTo: "read2.azure" },
      { redirectTo: "read3.azure" },
      { redirectTo: "read1.azure", retryAfterInMs: now + 100 },
      { redirectTo: "read2.azure", retryAfterInMs: now + 100 },
      { redirectTo: "read3.azure", retryAfterInMs: now + 100 },
      { redirectTo: "read1.azure", retryAfterInMs: now + 200 },
      { redirectTo: "read2.azure", retryAfterInMs: now + 200 },
      { redirectTo: "read3.azure", retryAfterInMs: now + 200 },
      { redirectTo: "read1.azure", retryAfterInMs: now + 400 },
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
      for (let retryCount = 0; retryCount < options.maxRetries; retryCount++) {
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
    assert.deepEqual(modifiers, [
      { redirectTo: "read1.azure" },
      { redirectTo: "read2.azure" },
      { redirectTo: "read3.azure" },
      { redirectTo: "read1.azure", retryAfterInMs: now + 100 },
      { redirectTo: "read2.azure", retryAfterInMs: now + 100 },
      { redirectTo: "read3.azure", retryAfterInMs: now + 100 },
      { redirectTo: "read1.azure", retryAfterInMs: now + 200 },
      { redirectTo: "read2.azure", retryAfterInMs: now + 200 },
      { redirectTo: "read3.azure", retryAfterInMs: now + 200 },
      { redirectTo: "read1.azure", retryAfterInMs: now + 400 },
      { redirectTo: "write1.azure" },
      { redirectTo: "write2.azure" },
      { redirectTo: "write1.azure", retryAfterInMs: now + 100 },
      { redirectTo: "write2.azure", retryAfterInMs: now + 100 },
      { redirectTo: "write1.azure", retryAfterInMs: now + 200 },
      { redirectTo: "write2.azure", retryAfterInMs: now + 200 },
      { redirectTo: "write1.azure", retryAfterInMs: now + 400 },
      { redirectTo: "write2.azure", retryAfterInMs: now + 400 },
      { redirectTo: "write1.azure", retryAfterInMs: now + 800 },
      { redirectTo: "write2.azure", retryAfterInMs: now + 800 },
    ]);
  });
});
