// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, beforeEach, describe, it } from "vitest";
import type { Batcher } from "../../../../src/bulk/Batcher.js";
import { LimiterQueue } from "../../../../src/bulk/Limiter.js";
import { StatusCodes } from "../../../../src/index.js";

function createFakeBatcher(result: any, delay = 0): Batcher {
  return {
    dispatch: (_metric: any) => new Promise((resolve) => setTimeout(() => resolve(result), delay)),
    getOperations: (): any[] => [],
  } as unknown as Batcher;
}
function createNeverEndingBatcher(): Batcher {
  return {
    dispatch: (_metric: any) => new Promise(() => {}),
    getOperations: (): any[] => [{ operationContext: { diagnosticNode: {} } }],
  } as unknown as Batcher;
}

const fakeRetryCallback = (_op: any, _diagnostic: any): Promise<any> => {
  return Promise.resolve();
};

describe("LimiterQueue", () => {
  let limiter: LimiterQueue;
  const dummyMetric = {} as any;

  beforeEach(() => {
    // Instantiate with concurrency of 1 for ordered processing.
    limiter = new LimiterQueue(1, dummyMetric, fakeRetryCallback, {} as any);
  });

  it("should process a single task and return its value", async () => {
    const expected = "result1";
    const fakeBatcher = createFakeBatcher(expected);

    const promise = limiter.push(fakeBatcher);
    const result = await promise;
    assert.equal(result, expected);
  });

  it("should process multiple tasks in order with concurrency as 1", async () => {
    const results: string[] = [];
    const batcher1 = createFakeBatcher("first", 20);
    const batcher2 = createFakeBatcher("second", 5);
    const batcher3 = createFakeBatcher("third", 10);

    const p1 = limiter.push(batcher1).then((res) => results.push(res));
    const p2 = limiter.push(batcher2).then((res) => results.push(res));
    const p3 = limiter.push(batcher3).then((res) => results.push(res));

    await Promise.all([p1, p2, p3]);
    // tasks pushed in order with concurrency 1 should resolve in the same order.
    assert.deepEqual(results, ["first", "second", "third"]);
  });

  it("should handle concurrency dynamically", async () => {
    let currentActive = 0;
    let maxActive = 0;

    function createCountingBatcher(result: string, delay = 50): Batcher {
      return {
        dispatch: async (_metric: any) => {
          currentActive++;
          if (currentActive > maxActive) {
            maxActive = currentActive;
          }
          await new Promise((resolve) => setTimeout(resolve, delay));
          currentActive--;
          return result;
        },
        getOperations: (): any[] => [],
      } as unknown as Batcher;
    }
    // Initially set concurrency to 3
    limiter.setConcurrency(3);

    const tasks1: Promise<any>[] = [];
    for (let i = 0; i < 5; i++) {
      tasks1.push(limiter.push(createCountingBatcher(`task-${i}`)));
    }

    await Promise.all(tasks1);
    // Check that at most 3 tasks were active at any time.
    assert.equal(maxActive, 3);

    maxActive = 0; // Reset for next test

    // Increase concurrency to 5
    limiter.setConcurrency(5);

    const tasks2: Promise<any>[] = [];
    for (let i = 5; i < 10; i++) {
      tasks2.push(limiter.push(createCountingBatcher(`task-${i}`)));
    }
    await Promise.all(tasks2);

    // Check that no more than 5 tasks were active concurrently.
    assert.equal(maxActive, 5);

    maxActive = 0; // Reset for next test

    // Decrease concurrency to 1
    limiter.setConcurrency(1);

    const tasks3: Promise<any>[] = [];
    for (let i = 10; i < 15; i++) {
      tasks3.push(limiter.push(createCountingBatcher(`task-${i}`)));
    }
    await Promise.all(tasks3);
    // Check that no more than 1 task was active concurrently.
    assert.isAtMost(maxActive, 1);
  });

  it("should refresh pk range cache and retry operations when pauseAndClear is called on split", async () => {
    const terminatedValue = StatusCodes.Gone;
    const retriedOperations: any[] = [];
    let refreshCalled = false;

    // Override retrier and refresh functions
    limiter = new LimiterQueue(
      1,
      dummyMetric,
      async (op, _diag) => {
        retriedOperations.push(op);
        return Promise.resolve();
      },
      async (_diag) => {
        refreshCalled = true;
      },
    );

    const batchers = Array.from({ length: 10 }, () => createNeverEndingBatcher());
    const promises = batchers.map((batcher) => limiter.push(batcher));

    await limiter.pauseAndClear(terminatedValue);
    const results = await Promise.all(promises);
    results.forEach((result) => {
      assert.equal(result, terminatedValue);
    });
    // Verify that partition key range cache was refreshed
    assert.isTrue(
      refreshCalled,
      "Partition key range cache should be refreshed when terminated value is 410",
    );
    // Verify that each queued operation was retried
    assert.equal(retriedOperations.length, 10, "All queued operations should have been retried");
  });

  it("should simply clear the queue without refresh or retry when pauseAndClear is called with a non-410 terminated value", async () => {
    const terminatedValue: null = null;
    const retriedOperations: any[] = [];
    let refreshCalled = false;

    // Override retrier and refresh functions
    limiter = new LimiterQueue(
      1,
      dummyMetric,
      async (op, _diag) => {
        retriedOperations.push(op);
        return Promise.resolve();
      },
      async (_diag) => {
        refreshCalled = true;
      },
    );

    const batchers = Array.from({ length: 10 }, () => createNeverEndingBatcher());
    const promises = batchers.map((batcher) => limiter.push(batcher));

    await limiter.pauseAndClear(terminatedValue);
    const results = await Promise.all(promises);
    results.forEach((result) => {
      assert.equal(result, terminatedValue);
    });
    // Verify that partition key range cache was not refreshed
    assert.isFalse(
      refreshCalled,
      "Partition key range cache should not be refreshed when terminated value is not 410",
    );
    // Verify that no queued operations were retried
    assert.equal(retriedOperations.length, 0, "No queued operations should have been retried");
  });
});
