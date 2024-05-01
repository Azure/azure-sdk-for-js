// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import { assert } from "chai";
import { delay } from "../../src";

describe("delay", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("should resolve after the given number of ms", async function () {
    const clock = sinon.useFakeTimers();
    const delayTime = 2500;
    const delayPromise = delay(delayTime);
    const time = await clock.nextAsync();
    clock.restore();
    assert.strictEqual(time, delayTime);
    // should be resolved, so we can await it and it will resolve next tick
    await delayPromise;
  });

  it("should return when the abort signal is called", async function () {
    const delayTime = 2500;
    const controller = new AbortController();
    const StandardAbortMessage = "The operation was aborted.";
    const delayPromise = delay(delayTime, {
      abortSignal: controller.signal,
      abortErrorMsg: StandardAbortMessage,
    });
    try {
      controller.abort();
      await delayPromise;
      assert.fail();
    } catch (err: any) {
      assert.strictEqual(err.name, "AbortError");
      assert.strictEqual(err.message, StandardAbortMessage);
    }
  });
});
