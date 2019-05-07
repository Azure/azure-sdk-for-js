import * as assert from "assert";
import delay from "delay";
import { Aborter } from "../src/aborter";

describe("Aborter", () => {
  async function doAsyncOperation(
    aborter: Aborter,
    runningTimeinMs: number = 100
  ): Promise<number> {
    await delay(runningTimeinMs);
    if (aborter.aborted) {
      throw new Error("Operation aborted");
    }
    return 0;
  }

  it("should set value and get value successfully", async () => {
    const aborter = Aborter.none.withValue("mykey", "myvalue");
    assert.deepStrictEqual(aborter.getValue("mykey"), "myvalue");
  });

  it("should get value from parent successfully", async () => {
    const aborter = Aborter.none.withValue("parentkey", "parentvalue");
    const child = aborter.withValue("childkey", "childvalue");
    assert.deepStrictEqual(child.getValue("parentkey"), "parentvalue");
  });

  it("should not abort without calling abort()", async () => {
    await doAsyncOperation(Aborter.none);
  });

  it("should abort when calling abort() before request finishes", async () => {
    const aborter = Aborter.none;
    const response = doAsyncOperation(aborter);
    aborter.abort();
    try {
      await response;
      assert.fail();
    } catch (err) {}
  });

  it("should not abort when calling abort() after request finishes", async () => {
    const aborter = Aborter.none;
    await doAsyncOperation(aborter);
    aborter.abort();
  });

  it("should abort after aborter timeout", async () => {
    try {
      await doAsyncOperation(Aborter.timeout(1));
      assert.fail();
    } catch (err) {}
  });

  it("should abort after parent aborter calls abort()", async () => {
    try {
      const aborter = Aborter.none;
      const response = doAsyncOperation(aborter.withTimeout(10 * 60 * 1000));
      aborter.abort();
      await response;
      assert.fail();
    } catch (err) {}
  });

  it("should abort after parent aborter timeout", async () => {
    try {
      const aborter = Aborter.timeout(1);
      const response = doAsyncOperation(aborter.withTimeout(10 * 60 * 1000));
      await response;
      assert.fail();
    } catch (err) {}
  });

  it("should invoke onabort callback when aborting", async () => {
    let s = undefined;
    try {
      const aborter = Aborter.none;
      aborter.onabort = () => {
        s = "aborted";
      };
      const response = doAsyncOperation(aborter);
      aborter.abort();
      await response;
      assert.fail();
    } catch (err) {
      assert.equal(s, "aborted");
    }
  });
});
