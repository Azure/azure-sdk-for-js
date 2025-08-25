// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, beforeEach, describe, it } from "vitest";
import { SubStatusCodes } from "$internal/common/statusCodes.js";
import type { RetryOptions } from "@azure/cosmos";
import { ErrorResponse, StatusCodes } from "@azure/cosmos";
import { BulkExecutionRetryPolicy } from "$internal/retry/bulkExecutionRetryPolicy.js";
import { ResourceThrottleRetryPolicy } from "$internal/retry/resourceThrottleRetryPolicy.js";

describe("BulkExecutionRetryPolicy", () => {
  let retryPolicy: BulkExecutionRetryPolicy;

  beforeEach(() => {
    retryPolicy = new BulkExecutionRetryPolicy(new ResourceThrottleRetryPolicy({}));
  });
  it("shouldRetry returns false if no error is provided", async () => {
    const shouldRetryResult = await retryPolicy.shouldRetry(null, {} as any);
    assert.strictEqual(shouldRetryResult, false);
  });
  it("handles partition key range Gone error", async () => {
    const err = new ErrorResponse();
    err.code = StatusCodes.Gone;
    err.substatus = SubStatusCodes.PartitionKeyRangeGone;
    // MaxRetriesOn410 is 10
    for (let i = 0; i < 10; i++) {
      const shouldRetryResult = await retryPolicy.shouldRetry(err, {} as any);
      assert.strictEqual(shouldRetryResult, true);
    }
    const shouldRetryResult = await retryPolicy.shouldRetry(err, {} as any);
    assert.strictEqual(shouldRetryResult, false);
  });

  it("handles 413 error", async () => {
    const err = new ErrorResponse();
    err.code = StatusCodes.RequestEntityTooLarge;
    err.substatus = SubStatusCodes.ResponseSizeExceeded;
    const shouldRetryResult = await retryPolicy.shouldRetry(err, {} as any);
    assert.strictEqual(shouldRetryResult, true);
  });

  it("handles throttling error", async () => {
    const err = new ErrorResponse();
    err.code = StatusCodes.TooManyRequests;
    err.retryAfterInMs = 5;
    const throttlingRetryPolicy = retryPolicy.nextRetryPolicy as ResourceThrottleRetryPolicy;

    // default maxTries is 9
    while (throttlingRetryPolicy.currentRetryAttemptCount < 9) {
      const shouldRetryResult = await throttlingRetryPolicy.shouldRetry(err, {
        addData: () => {},
      } as any);
      assert.strictEqual(throttlingRetryPolicy.retryAfterInMs, 5);
      assert.strictEqual(shouldRetryResult, true);
    }
    const shouldRetryResult = await retryPolicy.shouldRetry(err, {} as any);
    assert.strictEqual(shouldRetryResult, false);
  });

  it("handles throttling error with custom policy", async () => {
    const err = new ErrorResponse();
    err.code = StatusCodes.TooManyRequests;
    err.retryAfterInMs = 50;
    const retryOptions: RetryOptions = {
      maxRetryAttemptCount: 5,
      fixedRetryIntervalInMilliseconds: 10,
    };
    retryPolicy.nextRetryPolicy = new ResourceThrottleRetryPolicy(retryOptions);
    const throttlingRetryPolicy = retryPolicy.nextRetryPolicy as ResourceThrottleRetryPolicy;

    while (throttlingRetryPolicy.currentRetryAttemptCount < 5) {
      const shouldRetryResult = await throttlingRetryPolicy.shouldRetry(err, {
        addData: () => {},
      } as any);
      assert.strictEqual(throttlingRetryPolicy.retryAfterInMs, 10);
      assert.strictEqual(shouldRetryResult, true);
    }
    const shouldRetryResult = await retryPolicy.shouldRetry(err, {} as any);
    assert.strictEqual(shouldRetryResult, false);
  });
});
