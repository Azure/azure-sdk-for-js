import * as assert from "assert";
import { AbortController, AbortSignal, AbortError } from "../src/aborter";

describe("Aborter", () => {
  function doAsyncOperation(aborter: AbortSignal, runningTimeinMs: number = 100): Promise<number> {
    const s = Date.now();
    return new Promise((res, rej) => {
      // check status every 10 ms.
      const handle = setInterval(() => {
        // check if we're aborted.
        if (aborter.aborted) {
          clearInterval(handle);
          return rej(new AbortError());
        }

        // if we're completed, resolve.
        if (Date.now() - s > runningTimeinMs) {
          clearInterval(handle);
          return res();
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
      let rs = await response;
      console.log("got result", rs);
      assert.fail();
    } catch (err) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("should abort when calling abort() after creation but before request finishes", async () => {
    const controller = new AbortController();
    const aborter = controller.signal;
    const response = doAsyncOperation(aborter, 100);
    setTimeout(() => controller.abort(), 50);
    try {
      let r = await response;
      console.log("got, r", r);
      assert.fail();
    } catch (err) {
      assert.equal(err.name, "AbortError");
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
    } catch (err) {
      assert.equal(s, "aborted");
    }
  });

  it("should invoke abort listener callbacks when aborting", async () => {
    const controller = new AbortController();
    const aborter = controller.signal;
    let s: string[] = [];
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
    } catch (err) {
      assert.deepEqual(s, ["aborted", "aborted"]);
    }
  });

  it("should abort after timeout when using created using timeout()", async () => {
    const aborter = AbortSignal.timeout(50);
    let s = undefined;
    try {
      aborter.onabort = () => {
        s = "aborted";
      };
      await doAsyncOperation(aborter, 100);
      assert.fail();
    } catch (err) {
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
    assert.equal(true, childController.signal.aborted);
    assert.equal(s, "parent");
  });

  it("should call abort() on child signals that were created before parent abort() call", async function() {
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
    assert.equal(3, values.length);
    assert.equal(true, parentSignal.aborted);
    assert.equal(true, child1.signal.aborted);
    assert.equal(true, child2.signal.aborted);

    assert.equal(true, values.includes("parent"));
    assert.equal(true, values.includes("child1"));
    assert.equal(true, values.includes("child2"));
  });

  it("should call abort() on deeply nested child signals that were created before parent abort() call", async function() {
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
    assert.equal(3, values.length);
    assert.equal(true, parentSignal.aborted);
    assert.equal(true, child1.signal.aborted);
    assert.equal(true, child2.signal.aborted);

    assert.equal(true, values.includes("parent"));
    assert.equal(true, values.includes("child1"));
    assert.equal(true, values.includes("child2"));
  });

  it("should not call abort() on parent signals when child calls abort()", async function() {
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
    assert.equal(2, values.length);
    assert.equal(false, parentSignal.aborted);
    assert.equal(true, child1.signal.aborted);
    assert.equal(true, child2.signal.aborted);

    assert.equal(true, values.includes("child1"));
    assert.equal(true, values.includes("child2"));

    // trigger abort() on parent, children should not invoke listeners again
    parentController.abort();
    assert.equal(3, values.length);
    assert.equal(true, parentSignal.aborted);
    assert.equal(true, child1.signal.aborted);
    assert.equal(true, child2.signal.aborted);

    assert.equal(true, values.includes("parent"));
    assert.equal(true, values.includes("child1"));
    assert.equal(true, values.includes("child2"));
  });
});
