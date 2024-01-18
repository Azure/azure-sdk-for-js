// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert, vi, afterEach } from "vitest";
import { delay } from "../../src/index.js";

describe("delay", function () {
  afterEach(function () {
    vi.useRealTimers();
  });

  it("should resolve after the given number of ms", async function () {
    const clock = vi.useFakeTimers();
    const delayTime = 2500;
    const delayPromise = delay(delayTime);
    await clock.advanceTimersByTimeAsync(delayTime);
    assert.strictEqual(clock.getTimerCount(), 0);
    clock.useRealTimers();
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
