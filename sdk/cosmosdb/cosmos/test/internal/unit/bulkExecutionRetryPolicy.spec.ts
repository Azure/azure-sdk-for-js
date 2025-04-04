// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// import assert from "assert";
// import type { Container } from "../../../src/client/Container/Container";
// import { BulkExecutionRetryPolicy } from "../../../src/retry/bulkExecutionRetryPolicy";
// import { ResourceThrottleRetryPolicy } from "../../../src/retry/resourceThrottleRetryPolicy";
// import type { PartitionKeyRangeCache } from "../../../src/routing";
// import type { RetryOptions } from "../../../src";
// import { ErrorResponse, StatusCodes } from "../../../src";
// import { SubStatusCodes } from "../../../src/common";

// describe("BulkExecutionRetryPolicy", () => {
//   let retryPolicy: BulkExecutionRetryPolicy;
//   let mockPartitionKeyRangeCache: PartitionKeyRangeCache;
//   let mockContainer: Container;
//   let calledPartitionkeyRefresh: boolean;

//   beforeEach(() => {
//     mockContainer = {} as Container;
//     mockPartitionKeyRangeCache = {
//       onCollectionRoutingMap: async () => {
//         calledPartitionkeyRefresh = true;
//       },
//     } as unknown as PartitionKeyRangeCache;
//     retryPolicy = new BulkExecutionRetryPolicy(
//       mockContainer,
//       new ResourceThrottleRetryPolicy({}),
//       mockPartitionKeyRangeCache,
//     );
//   });
//   it("shouldRetry returns false if no error is provided", async () => {
//     const shouldRetryResult = await retryPolicy.shouldRetry(null, {} as any);
//     assert.strictEqual(shouldRetryResult, false);
//   });
//   it("handles partition key range Gone error", async () => {
//     const err = new ErrorResponse(null, StatusCodes.Gone, SubStatusCodes.PartitionKeyRangeGone);
//     // MaxRetriesOn410 is 10
//     for (let i = 0; i < 10; i++) {
//       calledPartitionkeyRefresh = false;
//       const shouldRetryResult = await retryPolicy.shouldRetry(err, {} as any);
//       assert.strictEqual(calledPartitionkeyRefresh, true);
//       assert.strictEqual(shouldRetryResult, true);
//     }
//     calledPartitionkeyRefresh = false;
//     const shouldRetryResult = await retryPolicy.shouldRetry(err, {} as any);
//     assert.strictEqual(calledPartitionkeyRefresh, false);
//     assert.strictEqual(shouldRetryResult, false);
//   });

//   it("handles 413 error", async () => {
//     const err = new ErrorResponse(
//       null,
//       StatusCodes.RequestEntityTooLarge,
//       SubStatusCodes.ResponseSizeExceeded,
//     );
//     const shouldRetryResult = await retryPolicy.shouldRetry(err, {} as any);
//     assert.strictEqual(shouldRetryResult, true);
//   });

//   it("handles throttling error", async () => {
//     const err = new ErrorResponse(null, StatusCodes.TooManyRequests, null);
//     err.retryAfterInMs = 5;
//     const throttlingRetryPolicy = retryPolicy.nextRetryPolicy as ResourceThrottleRetryPolicy;

//     // default maxTries is 9
//     while (throttlingRetryPolicy.currentRetryAttemptCount < 9) {
//       const shouldRetryResult = await throttlingRetryPolicy.shouldRetry(err, {
//         addData: () => {},
//       } as any);
//       assert.strictEqual(throttlingRetryPolicy.retryAfterInMs, 5);
//       assert.strictEqual(shouldRetryResult, true);
//     }
//     const shouldRetryResult = await retryPolicy.shouldRetry(err, {} as any);
//     assert.strictEqual(shouldRetryResult, false);
//   });

//   it("handles throttling error with custom policy", async () => {
//     const err = new ErrorResponse(null, StatusCodes.TooManyRequests, null);
//     err.retryAfterInMs = 50;
//     const retryOptions: RetryOptions = {
//       maxRetryAttemptCount: 5,
//       fixedRetryIntervalInMilliseconds: 10,
//     };
//     retryPolicy.nextRetryPolicy = new ResourceThrottleRetryPolicy(retryOptions);
//     const throttlingRetryPolicy = retryPolicy.nextRetryPolicy as ResourceThrottleRetryPolicy;

//     while (throttlingRetryPolicy.currentRetryAttemptCount < 5) {
//       const shouldRetryResult = await throttlingRetryPolicy.shouldRetry(err, {
//         addData: () => {},
//       } as any);
//       assert.strictEqual(throttlingRetryPolicy.retryAfterInMs, 10);
//       assert.strictEqual(shouldRetryResult, true);
//     }
//     const shouldRetryResult = await retryPolicy.shouldRetry(err, {} as any);
//     assert.strictEqual(shouldRetryResult, false);
//   });
// });
