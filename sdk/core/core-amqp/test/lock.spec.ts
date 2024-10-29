// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach } from "vitest";
import { AbortError } from "@azure/abort-controller";
import { CancellableAsyncLock, CancellableAsyncLockImpl } from "../src/util/lock.js";
import { OperationTimeoutError } from "rhea-promise";
import { delay } from "../src/index.js";
import { settleAllTasks } from "./utils/utils.js";

describe("CancellableAsyncLock", function () {
  const TEST_FAILURE = "Test failure";

  describe(".acquire", function () {
    let lock: CancellableAsyncLock;
    beforeEach(() => {
      lock = new CancellableAsyncLockImpl();
    });

    it("forwards values from task", async () => {
      const expectedValues = ["foo", "bar", 3.14159, new Date(), {}, null];

      const tasks: Promise<any>[] = [];
      for (const val of expectedValues) {
        tasks.push(
          lock.acquire("lock", async () => val, {
            timeoutInMs: undefined,
            abortSignal: undefined,
          }),
        );
      }

      const results = await Promise.all(tasks);
      assert.deepEqual(results, expectedValues, "Unexpected value returned from tasks.");
    });

    it("forwards error from task", async () => {
      try {
        await lock.acquire(
          "lock",
          async () => {
            throw new Error("I break things!");
          },
          { timeoutInMs: undefined, abortSignal: undefined },
        );
        throw new Error(TEST_FAILURE);
      } catch (err) {
        assert.instanceOf(err, Error);
        assert.equal((err as Error).message, "I break things!");
      }
    });

    it("works using single key", async () => {
      const taskCount = 10;
      const tasks: Promise<number>[] = [];
      for (let i = 0; i < taskCount; i++) {
        tasks.push(
          lock.acquire(
            "lock",
            async () => {
              // Add a delay such that later tasks would resolve
              // faster than early tasks if they all ran at the
              // same time.
              await delay(taskCount - i);
              return i;
            },
            { timeoutInMs: undefined, abortSignal: undefined },
          ),
        );
      }

      // verify order
      for (let i = 0; i < taskCount; i++) {
        const result = await Promise.race(tasks);
        assert.equal(result, i, "Tasks ran out of order.");
        // Since tasks should be completed in order, remove head task.
        tasks.shift();
      }
      assert.equal(tasks.length, 0, "There are still tasks pending.");
    });

    it("keys are isolated", async () => {
      /*
        We enqueue 2 tasks on key "1", and 2 tasks on key "2".
        Each task has a delay so that it yields control to the event loop
        before resolving.

        The 1st task on key "1" will resolve first.
        The 1st task on key "2" will resolve second because it does not
        need to wait for tasks on key "1" to resolve.
        The 2nd task on key "1" will resolve third. It must wait for
        the 1st tak on key "1" to resolve.
        The 2nd task on key "2" will resolve last. It must wait for
        the 1st task on key "2" to resolve.
      */
      const tasks = [
        lock.acquire(
          "1",
          async () => {
            await delay(0);
            return 0;
          },
          { timeoutInMs: undefined, abortSignal: undefined },
        ),
        lock.acquire(
          "1",
          async () => {
            await delay(0);
            return 2;
          },
          { timeoutInMs: undefined, abortSignal: undefined },
        ),
        lock.acquire(
          "2",
          async () => {
            await delay(0);
            return 1;
          },
          { timeoutInMs: undefined, abortSignal: undefined },
        ),
        lock.acquire(
          "1",
          async () => {
            await delay(0);
            return 3;
          },
          { timeoutInMs: undefined, abortSignal: undefined },
        ),
      ];

      const results: number[] = [];
      const queue: Promise<number>[] = [];
      for (const task of tasks) {
        queue.push(task);
        task
          .then((value) => {
            results.push(value);
            queue.splice(queue.indexOf(task), 1);
            return;
          })
          .catch(() => {
            /* no-op */
          });
      }

      while (queue.length) {
        await Promise.race(queue);
      }

      assert.deepEqual(results, [0, 1, 2, 3], "Tasks completed out of order.");
    });

    it("supports timeouts", async () => {
      const tasks = [
        lock.acquire(
          "lock",
          async () => {
            await delay(0);
            return 0;
          },
          { timeoutInMs: undefined, abortSignal: undefined },
        ),
        lock.acquire(
          "lock",
          async () => {
            await delay(0);
            return 1;
          },
          { timeoutInMs: undefined, abortSignal: undefined },
        ),
        lock.acquire(
          "lock",
          async () => {
            await delay(0);
            return 2;
          },
          { timeoutInMs: 0, abortSignal: undefined },
        ),
        lock.acquire(
          "lock",
          async () => {
            await delay(0);
            return 3;
          },
          { timeoutInMs: undefined, abortSignal: undefined },
        ),
        lock.acquire(
          "lock",
          async () => {
            await delay(0);
            return 4;
          },
          { timeoutInMs: 0, abortSignal: undefined },
        ),
      ];

      const results = await settleAllTasks(tasks);
      assert.equal(results.length, 5, "Unexpected number of tasks completed.");

      const expectedResults = [0, 1, OperationTimeoutError, 3, OperationTimeoutError];
      for (let i = 0; i < results.length; i++) {
        const value = results[i];
        const expectedResult = expectedResults[i];
        if (typeof expectedResult === "number") {
          assert.equal(value, expectedResult, "Unexpected task value.");
        } else {
          assert.instanceOf(value, expectedResult, "Unexpected task value.");
        }
      }
    });

    it("supports cancellation (already cancelled)", async () => {
      const abortController = new AbortController();
      abortController.abort();
      const abortSignal = abortController.signal;
      const tasks = [
        lock.acquire(
          "lock",
          async () => {
            await delay(0);
            return 0;
          },
          { timeoutInMs: undefined, abortSignal: undefined },
        ),
        lock.acquire(
          "lock",
          async () => {
            await delay(0);
            return 1;
          },
          { timeoutInMs: undefined, abortSignal: undefined },
        ),
        lock.acquire(
          "lock",
          async () => {
            await delay(0);
            return 2;
          },
          { abortSignal, timeoutInMs: undefined },
        ),
        lock.acquire(
          "lock",
          async () => {
            await delay(0);
            return 3;
          },
          { timeoutInMs: undefined, abortSignal: undefined },
        ),
        lock.acquire(
          "lock",
          async () => {
            await delay(0);
            return 4;
          },
          { abortSignal, timeoutInMs: undefined },
        ),
      ];

      const results: any[] = [];
      for (const task of tasks) {
        task
          .then((value) => {
            results.push(value);
            tasks.splice(tasks.indexOf(task), 1);
            return;
          })
          .catch((err) => {
            results.push(err);
            tasks.splice(tasks.indexOf(task), 1);
          });
      }

      while (tasks.length) {
        try {
          await Promise.race(tasks);
        } catch (err) {
          /* no-op */
        }
      }

      assert.equal(tasks.length, 0, "Queue of tasks not empty.");
      assert.equal(results.length, 5, "Unexpected number of tasks completed.");

      const expectedResults = [AbortError, AbortError, 0, 1, 3];

      for (let i = 0; i < results.length; i++) {
        const value = results[i];
        const expectedResult = expectedResults[i];
        if (typeof expectedResult === "number") {
          assert.equal(value, expectedResult, "Unexpected task value.");
        } else {
          assert.equal(value.name, expectedResult.name, "Unexpected task value.");
        }
      }
    });

    it("supports cancellation", async () => {
      const abortController = new AbortController();
      setTimeout(() => abortController.abort(), 0);
      const abortSignal = abortController.signal;
      const tasks = [
        lock.acquire(
          "lock",
          async () => {
            await delay(0);
            return 0;
          },
          { timeoutInMs: undefined, abortSignal: undefined },
        ),
        lock.acquire(
          "lock",
          async () => {
            await delay(0);
            return 1;
          },
          { timeoutInMs: undefined, abortSignal: undefined },
        ),
        lock.acquire(
          "lock",
          async () => {
            await delay(0);
            return 2;
          },
          { abortSignal, timeoutInMs: undefined },
        ),
        lock.acquire(
          "lock",
          async () => {
            await delay(0);
            return 3;
          },
          { timeoutInMs: undefined, abortSignal: undefined },
        ),
        lock.acquire(
          "lock",
          async () => {
            await delay(0);
            return 4;
          },
          { abortSignal, timeoutInMs: undefined },
        ),
      ];

      const results: any[] = [];
      for (const task of tasks) {
        task
          .then((value) => {
            results.push(value);
            tasks.splice(tasks.indexOf(task), 1);
            return;
          })
          .catch((err) => {
            results.push(err);
            tasks.splice(tasks.indexOf(task), 1);
          });
      }

      while (tasks.length) {
        try {
          await Promise.race(tasks);
        } catch (err) {
          /* no-op */
        }
      }

      assert.equal(tasks.length, 0, "Queue of tasks not empty.");
      assert.equal(results.length, 5, "Unexpected number of tasks completed.");

      const expectedResults = [AbortError, AbortError, 0, 1, 3];

      for (let i = 0; i < results.length; i++) {
        const value = results[i];
        const expectedResult = expectedResults[i];
        if (typeof expectedResult === "number") {
          assert.equal(value, expectedResult, "Unexpected task value.");
        } else {
          assert.equal(value.name, expectedResult.name, "Unexpected task value.");
        }
      }
    });
  });
});
