// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController, AbortError } from "@azure/abort-controller";
import * as chai from "chai";
import { OperationTimeoutError } from "rhea-promise";
import { delay } from "../src";
const should = chai.should();

import { CancellableAsyncLock, CancellableAsyncLockImpl } from "../src/util/lock";

describe("CancellableAsyncLock", function() {
  const TEST_FAILURE = "Test failure";

  describe(".acquire", function() {
    let lock: CancellableAsyncLock;
    beforeEach("create lock", () => {
      lock = new CancellableAsyncLockImpl();
    });

    it("forwards values from task", async () => {
      const expectedValues = ["foo", "bar", 3.14159, new Date(), {}, null];

      const tasks: Promise<any>[] = [];
      for (const val of expectedValues) {
        tasks.push(lock.acquire("lock", async () => val));
      }

      const results = await Promise.all(tasks);
      results.should.deep.equal(expectedValues, "Unexpected value returned from tasks.");
    });

    it("forwards error from task", async () => {
      try {
        await lock.acquire("lock", async () => {
          throw new Error("I break things!");
        });
        throw new Error(TEST_FAILURE);
      } catch (err) {
        should.equal(err.message, "I break things!");
      }
    });

    it("works using single key", async () => {
      const taskCount = 10;
      const tasks: Promise<number>[] = [];
      for (let i = 0; i < taskCount; i++) {
        tasks.push(
          lock.acquire("lock", async () => {
            // Add a delay such that later tasks would resolve
            // faster than early tasks if they all ran at the
            // same time.
            await delay(taskCount - i);
            return i;
          })
        );
      }

      // verify order
      for (let i = 0; i < taskCount; i++) {
        const result = await Promise.race(tasks);
        should.equal(result, i, "Tasks ran out of order.");
        // Since tasks should be completed in order, remove head task.
        tasks.shift();
      }
      should.equal(tasks.length, 0, "There are still tasks pending.");
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
        lock.acquire("1", async () => {
          await delay(0);
          return 0;
        }),
        lock.acquire("1", async () => {
          await delay(0);
          return 2;
        }),
        lock.acquire("2", async () => {
          await delay(0);
          return 1;
        }),
        lock.acquire("1", async () => {
          await delay(0);
          return 3;
        })
      ];

      const queue: Promise<number>[] = [];
      for (const task of tasks) {
        queue.push(task);
        task.then(() => {
          queue.splice(queue.indexOf(task), 1);
        });
      }

      const results = [];
      while (queue.length) {
        const result = await Promise.race(queue);
        results.push(result);
      }
      results.should.deep.equal([0, 1, 2, 3], "Tasks completed out of order.");
    });

    it("supports timeouts", async () => {
      const tasks = [
        lock.acquire("lock", async () => {
          await delay(0);
          return 0;
        }),
        lock.acquire("lock", async () => {
          await delay(0);
          return 1;
        }),
        lock.acquire(
          "lock",
          async () => {
            await delay(0);
            return 2;
          },
          { acquireTimeoutInMs: 0 }
        ),
        lock.acquire("lock", async () => {
          await delay(0);
          return 3;
        }),
        lock.acquire(
          "lock",
          async () => {
            await delay(0);
            return 4;
          },
          { acquireTimeoutInMs: 0 }
        )
      ];

      const results: any[] = [];
      for (const task of tasks) {
        task
          .then((value) => {
            results.push(value);
            tasks.splice(tasks.indexOf(task), 1);
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

      tasks.length.should.equal(0, "Queue of tasks not empty.");
      results.length.should.equal(5, "Unexpected number of tasks completed.");

      const expectedResults = [0, OperationTimeoutError, OperationTimeoutError, 1, 3];

      for (let i = 0; i < results.length; i++) {
        const value = results[i];
        const expectedResult = expectedResults[i];
        if (typeof expectedResult === "number") {
          should.equal(value, expectedResult, "Unexpected task value.");
        } else {
          should.equal(value instanceof expectedResult, true, "Unexpected task value.");
        }
      }
    });

    it("supports cancellation (already cancelled)", async () => {
      const abortController = new AbortController();
      abortController.abort();
      const abortSignal = abortController.signal;
      const tasks = [
        lock.acquire("lock", async () => {
          await delay(0);
          return 0;
        }),
        lock.acquire("lock", async () => {
          await delay(0);
          return 1;
        }),
        lock.acquire(
          "lock",
          async () => {
            await delay(0);
            return 2;
          },
          { abortSignal }
        ),
        lock.acquire("lock", async () => {
          await delay(0);
          return 3;
        }),
        lock.acquire(
          "lock",
          async () => {
            await delay(0);
            return 4;
          },
          { abortSignal }
        )
      ];

      const results: any[] = [];
      for (const task of tasks) {
        task
          .then((value) => {
            results.push(value);
            tasks.splice(tasks.indexOf(task), 1);
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

      tasks.length.should.equal(0, "Queue of tasks not empty.");
      results.length.should.equal(5, "Unexpected number of tasks completed.");

      const expectedResults = [AbortError, AbortError, 0, 1, 3];

      for (let i = 0; i < results.length; i++) {
        const value = results[i];
        const expectedResult = expectedResults[i];
        if (typeof expectedResult === "number") {
          should.equal(value, expectedResult, "Unexpected task value.");
        } else {
          should.equal(value.name, expectedResult.name, "Unexpected task value.");
        }
      }
    });

    it("supports cancellation", async () => {
      const abortController = new AbortController();
      setTimeout(() => abortController.abort(), 0);
      const abortSignal = abortController.signal;
      const tasks = [
        lock.acquire("lock", async () => {
          await delay(0);
          return 0;
        }),
        lock.acquire("lock", async () => {
          await delay(0);
          return 1;
        }),
        lock.acquire(
          "lock",
          async () => {
            await delay(0);
            return 2;
          },
          { abortSignal }
        ),
        lock.acquire("lock", async () => {
          await delay(0);
          return 3;
        }),
        lock.acquire(
          "lock",
          async () => {
            await delay(0);
            return 4;
          },
          { abortSignal }
        )
      ];

      const results: any[] = [];
      for (const task of tasks) {
        task
          .then((value) => {
            results.push(value);
            tasks.splice(tasks.indexOf(task), 1);
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

      tasks.length.should.equal(0, "Queue of tasks not empty.");
      results.length.should.equal(5, "Unexpected number of tasks completed.");

      const expectedResults = [AbortError, AbortError, 0, 1, 3];

      for (let i = 0; i < results.length; i++) {
        const value = results[i];
        const expectedResult = expectedResults[i];
        if (typeof expectedResult === "number") {
          should.equal(value, expectedResult, "Unexpected task value.");
        } else {
          should.equal(value.name, expectedResult.name, "Unexpected task value.");
        }
      }
    });
  });
});
