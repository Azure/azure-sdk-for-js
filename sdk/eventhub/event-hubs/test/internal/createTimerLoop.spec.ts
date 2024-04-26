// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import { assert } from "@azure-tools/test-utils";
import { createTimerLoop } from "../../src/util/timerLoop";

describe("createTimerLoop", function () {
  let clock: sinon.SinonFakeTimers;

  before(function () {
    clock = sinon.useFakeTimers();
  });
  after(function () {
    clock.restore();
  });

  it("loops the exact number of iterations and can be stopped", async function () {
    const interval = 1000;
    const callCount = 10;
    let curCallCount = 0;
    const loop = createTimerLoop(interval, async () => {
      ++curCallCount;
    });
    assert.isFalse(loop.isRunning);
    assert.doesNotThrow(() => loop.stop()); // stopping an not yet started loop is a no-op
    loop.start();
    assert.isTrue(loop.isRunning);
    await clock.tickAsync(interval * callCount);
    assert.strictEqual(
      curCallCount,
      callCount,
      "Expected the loop to run the exact number of iterations",
    );
    loop.stop();
    assert.isFalse(loop.isRunning);
    await clock.tickAsync(interval * 2);
    assert.doesNotThrow(() => loop.stop()); // stopping an already stopped loop is a no-op
    assert.strictEqual(curCallCount, callCount, "Expected the loop to stop after stop() is called");
    assert.isFalse(loop.isRunning);
  });

  it("continues looping in the presence of errors", async function () {
    const interval = 1000;
    const loop = createTimerLoop(interval, async () => {
      throw new Error("expected exception");
    });
    loop.start();
    assert.isTrue(loop.isRunning);
    await clock.tickAsync(interval);
    assert.isTrue(loop.isRunning);
    loop.stop();
  });
});
