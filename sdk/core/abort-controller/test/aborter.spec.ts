// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController, AbortError, AbortSignal } from "../src";
import { assert } from "chai";

describe("AbortController", () => {
  function doAsyncOperation(aborter: AbortSignal, runningTimeinMs: number = 100): Promise<void> {
    const s = Date.now();
    return new Promise((resolve, reject) => {
      // check status every 10 ms.
      const handle = setInterval(() => {
        // check if we're aborted.
        if (aborter.aborted) {
          clearInterval(handle);
          return reject(new AbortError());
        }

        // if we're completed, resolve.
        if (Date.now() - s > runningTimeinMs) {
          clearInterval(handle);
          return resolve();
        }

        // else, continue trying.
      }, 10);
    });
  }

  it("should not abort without calling abort()", async () => {
    await doAsyncOperation(AbortSignal.none);
  });

  it("should abort when calling abort() before request finishes", async () => {
    const controller = new AbortController();
    const aborter = controller.signal;
    const response = doAsyncOperation(aborter);
    controller.abort();
    try {
      const rs = await response;
      console.log("got result", rs);
      assert.fail();
    } catch (err: any) {
      assert.strictEqual(err.name, "AbortError");
    }
  });

  it("should abort when calling abort() after creation but before request finishes", async () => {
    const controller = new AbortController();
    const aborter = controller.signal;
    const response = doAsyncOperation(aborter, 500);
    setTimeout(() => controller.abort(), 50);
    try {
      const r = await response;
      console.log("got, r", r);
      assert.fail();
    } catch (err: any) {
      assert.strictEqual(err.name, "AbortError");
    }
  });

  it("should not abort when calling abort() after request finishes", async () => {
    const controller = new AbortController();
    const aborter = controller.signal;
    await doAsyncOperation(aborter);
    controller.abort();
  });

  it("should invoke onabort callback when aborting", async () => {
    const controller = new AbortController();
    const aborter = controller.signal;
    let s = undefined;
    try {
      aborter.onabort = () => {
        s = "aborted";
      };
      const response = doAsyncOperation(aborter);
      controller.abort();
      await response;
      assert.fail();
    } catch (err: any) {
      assert.strictEqual(s, "aborted");
    }
  });

  it("should invoke abort listener callbacks when aborting", async () => {
    const controller = new AbortController();
    const aborter = controller.signal;
    const s: string[] = [];
    try {
      aborter.addEventListener("abort", () => {
        s.push("aborted");
      });
      aborter.addEventListener("abort", () => {
        s.push("aborted");
      });
      const response = doAsyncOperation(aborter);
      controller.abort();
      await response;
      assert.fail();
    } catch (err: any) {
      assert.deepEqual(s, ["aborted", "aborted"]);
    }
  });

  // Test for the issue reported in https://github.com/Azure/azure-sdk-for-js/issues/13985
  it("should invoke all abort listener callbacks when aborting even when listeners self-remove", async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    const acks: string[] = [];
    try {
      const onAbortFoo = () => {
        acks.push("foo");
        signal.removeEventListener("abort", onAbortFoo);
      };

      const onAbortBar = () => {
        acks.push("bar");
        signal.removeEventListener("abort", onAbortBar);
      };

      signal.addEventListener("abort", onAbortFoo);
      signal.addEventListener("abort", onAbortBar);

      const response = doAsyncOperation(signal);
      controller.abort();
      await response;
      assert.fail();
    } catch (err: any) {
      assert.deepEqual(acks, ["foo", "bar"]);
    }
  });

  it("should abort after timeout when using created using timeout()", async () => {
    const aborter = AbortController.timeout(50);
    let s = undefined;
    try {
      aborter.onabort = () => {
        s = "aborted";
      };
      await doAsyncOperation(aborter, 200);
      assert.fail();
    } catch (err: any) {
      assert.deepEqual(s, "aborted");
    }
  });

  it("should propagate aborted state to child signals", async () => {
    const parentController = new AbortController();
    const parentSignal = parentController.signal;
    let s = undefined;

    parentSignal.addEventListener("abort", () => {
      s = "parent";
    });
    parentController.abort();

    const childController = new AbortController(parentSignal);
    assert.strictEqual(true, childController.signal.aborted);
    assert.strictEqual(s, "parent");
  });

  it("should propagate 'true' aborted state from any parent to child signals", async () => {
    const parent1 = new AbortController();
    const parent2 = new AbortController();
    const parent3 = new AbortController();
    let s = undefined;

    parent1.signal.addEventListener("abort", () => {
      s = "parent1";
    });
    parent2.signal.addEventListener("abort", () => {
      s = "parent2";
    });
    parent3.signal.addEventListener("abort", () => {
      s = "parent3";
    });
    parent1.abort();

    const childController = new AbortController(parent1.signal, parent2.signal, parent3.signal);
    assert.strictEqual(true, childController.signal.aborted);
    assert.strictEqual(true, parent1.signal.aborted);
    assert.strictEqual(false, parent2.signal.aborted);
    assert.strictEqual(false, parent3.signal.aborted);
    assert.strictEqual(s, "parent1");
  });

  it("should propagate 'true' aborted state from any parent to child signals (arrays)", async () => {
    const parent1 = new AbortController();
    const parent2 = new AbortController();
    const parent3 = new AbortController();
    let s = undefined;

    parent1.signal.addEventListener("abort", () => {
      s = "parent1";
    });
    parent2.signal.addEventListener("abort", () => {
      s = "parent2";
    });
    parent3.signal.addEventListener("abort", () => {
      s = "parent3";
    });
    parent1.abort();

    const childController = new AbortController([parent1.signal, parent2.signal, parent3.signal]);
    assert.strictEqual(true, childController.signal.aborted);
    assert.strictEqual(true, parent1.signal.aborted);
    assert.strictEqual(false, parent2.signal.aborted);
    assert.strictEqual(false, parent3.signal.aborted);
    assert.strictEqual(s, "parent1");
  });

  it("should call abort() on child signals that were created before parent abort() call", async function () {
    const parentController = new AbortController();
    const parentSignal = parentController.signal;

    const child1 = new AbortController(parentSignal);
    const child2 = new AbortController(parentSignal);

    const values: string[] = [];

    parentSignal.addEventListener("abort", () => {
      values.push("parent");
    });
    child1.signal.addEventListener("abort", () => {
      values.push("child1");
    });
    child2.signal.addEventListener("abort", () => {
      values.push("child2");
    });

    // trigger abort() on parentSignal, event listeners should trigger on children
    parentController.abort();
    assert.strictEqual(3, values.length);
    assert.strictEqual(true, parentSignal.aborted);
    assert.strictEqual(true, child1.signal.aborted);
    assert.strictEqual(true, child2.signal.aborted);

    assert.strictEqual(true, values.includes("parent"));
    assert.strictEqual(true, values.includes("child1"));
    assert.strictEqual(true, values.includes("child2"));
  });

  it("should call abort() on child signal that was created before any parent's abort() call", async () => {
    const parent1 = new AbortController();
    const parent2 = new AbortController();
    const parent3 = new AbortController();

    const child = new AbortController(parent1.signal, parent2.signal, parent3.signal);

    const values: string[] = [];

    parent1.signal.addEventListener("abort", () => {
      values.push("parent1");
    });
    parent2.signal.addEventListener("abort", () => {
      values.push("parent2");
    });
    parent3.signal.addEventListener("abort", () => {
      values.push("parent3");
    });
    child.signal.addEventListener("abort", () => {
      values.push("child");
    });

    // trigger abort() on a parent, event listeners should trigger on child
    parent2.abort();
    assert.strictEqual(true, child.signal.aborted);
    assert.strictEqual(false, parent1.signal.aborted);
    assert.strictEqual(true, parent2.signal.aborted);
    assert.strictEqual(false, parent3.signal.aborted);
    assert.strictEqual(2, values.length);
    assert.strictEqual(true, values.includes("parent2"));
    assert.strictEqual(true, values.includes("child"));
  });

  it("should call abort() on child signal that was created before any parent's abort() call (arrays)", async () => {
    const parent1 = new AbortController();
    const parent2 = new AbortController();
    const parent3 = new AbortController();

    const child = new AbortController([parent1.signal, parent2.signal, parent3.signal]);

    const values: string[] = [];

    parent1.signal.addEventListener("abort", () => {
      values.push("parent1");
    });
    parent2.signal.addEventListener("abort", () => {
      values.push("parent2");
    });
    parent3.signal.addEventListener("abort", () => {
      values.push("parent3");
    });
    child.signal.addEventListener("abort", () => {
      values.push("child");
    });

    // trigger abort() on a parent, event listeners should trigger on child
    parent2.abort();
    assert.strictEqual(true, child.signal.aborted);
    assert.strictEqual(false, parent1.signal.aborted);
    assert.strictEqual(true, parent2.signal.aborted);
    assert.strictEqual(false, parent3.signal.aborted);
    assert.strictEqual(2, values.length);
    assert.strictEqual(true, values.includes("parent2"));
    assert.strictEqual(true, values.includes("child"));
  });

  it("should call abort() on deeply nested child signals that were created before parent abort() call", async function () {
    const parentController = new AbortController();
    const parentSignal = parentController.signal;

    const child1 = new AbortController(parentSignal);
    const child2 = new AbortController(child1.signal);

    const values: string[] = [];

    parentSignal.addEventListener("abort", () => {
      values.push("parent");
    });
    child1.signal.addEventListener("abort", () => {
      values.push("child1");
    });
    child2.signal.addEventListener("abort", () => {
      values.push("child2");
    });

    // trigger abort() on parentSignal, event listeners should trigger on children
    parentController.abort();
    assert.strictEqual(3, values.length);
    assert.strictEqual(true, parentSignal.aborted);
    assert.strictEqual(true, child1.signal.aborted);
    assert.strictEqual(true, child2.signal.aborted);

    assert.strictEqual(true, values.includes("parent"));
    assert.strictEqual(true, values.includes("child1"));
    assert.strictEqual(true, values.includes("child2"));
  });

  it("should not call abort() on parent signals when child calls abort()", async function () {
    const parentController = new AbortController();
    const parentSignal = parentController.signal;

    const child1 = new AbortController(parentSignal);
    const child2 = new AbortController(child1.signal);

    const values: string[] = [];

    parentSignal.addEventListener("abort", () => {
      values.push("parent");
    });
    child1.signal.addEventListener("abort", () => {
      values.push("child1");
    });
    child2.signal.addEventListener("abort", () => {
      values.push("child2");
    });

    // trigger abort() on child, event listeners should not trigger on parent
    child1.abort();
    assert.strictEqual(2, values.length);
    assert.strictEqual(false, parentSignal.aborted);
    assert.strictEqual(true, child1.signal.aborted);
    assert.strictEqual(true, child2.signal.aborted);

    assert.strictEqual(true, values.includes("child1"));
    assert.strictEqual(true, values.includes("child2"));

    // trigger abort() on parent, children should not invoke listeners again
    parentController.abort();
    assert.strictEqual(3, values.length);
    assert.strictEqual(true, parentSignal.aborted);
    assert.strictEqual(true, child1.signal.aborted);
    assert.strictEqual(true, child2.signal.aborted);

    assert.strictEqual(true, values.includes("parent"));
    assert.strictEqual(true, values.includes("child1"));
    assert.strictEqual(true, values.includes("child2"));
  });
});
