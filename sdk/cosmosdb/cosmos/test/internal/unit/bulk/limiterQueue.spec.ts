// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, beforeEach, describe, it } from "vitest";
import type { Batcher } from "../../../../src/bulk/Batcher.js";
import { LimiterQueue } from "../../../../src/bulk/Limiter.js";

function createFakeBatcher(result: any, delay = 0): Batcher {
  return {
    dispatch: (_metric: any) => new Promise((resolve) => setTimeout(() => resolve(result), delay)),
    getOperations: (): any[] => [],
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
    limiter = new LimiterQueue(1, dummyMetric, fakeRetryCallback);
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

    // Enqueue tasks; processing is asynchronous.
    const p1 = limiter.push(batcher1).then((res) => results.push(res));
    const p2 = limiter.push(batcher2).then((res) => results.push(res));
    const p3 = limiter.push(batcher3).then((res) => results.push(res));

    await Promise.all([p1, p2, p3]);
    // Even though processing is concurrent by scheduling,
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
    assert.isAtMost(maxActive, 3);

    maxActive = 0; // Reset for next test

    // Increase concurrency to 5
    limiter.setConcurrency(5);

    const tasks2: Promise<any>[] = [];
    for (let i = 5; i < 10; i++) {
      tasks2.push(limiter.push(createCountingBatcher(`task-${i}`)));
    }
    await Promise.all(tasks2);

    // Check that no more than 5 tasks were active concurrently.
    assert.isAtMost(maxActive, 5);

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

  it("should resolve queued tasks immediately with terminated value on pauseAndClear", async () => {
    const terminatedValue = "terminated";

    function createNeverEndingBatcher(): Batcher {
      return {
        dispatch: (_metric: any) => new Promise(() => {}),
        getOperations: (): any[] => [],
      } as unknown as Batcher;
    }

    const batchers = Array.from({ length: 10 }, () => createNeverEndingBatcher());
    const promises = batchers.map((batcher) => limiter.push(batcher));

    await limiter.pauseAndClear(terminatedValue);

    const results = await Promise.all(promises);
    results.forEach((result) => assert.equal(result, terminatedValue));

    // eslint-disable-next-line promise/catch-or-return
    limiter.push(createFakeBatcher("should not be processed", 60000)).then((res) => {
      assert.equal(res, terminatedValue);
      return res;
    });
  });
});
