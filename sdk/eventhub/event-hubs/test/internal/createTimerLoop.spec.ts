// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import { assert } from "@azure/test-utils";
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
    const interval = Math.ceil(Math.random() * 1000);
    const callCount = Math.ceil(Math.random() * 10);
    let curCallCount = 0;
    const loop = createTimerLoop(interval, async () => {
      ++curCallCount;
    });
    assert.doesNotThrow(() => loop.stop()); // stopping an not yet started loop is a no-op
    loop.start();
    await clock.tickAsync(interval * callCount);
    assert.strictEqual(
      curCallCount,
      callCount,
      "Expected the loop to run the exact number of iterations"
    );
    loop.stop();
    await clock.tickAsync(interval * Math.random() * 10);
    assert.doesNotThrow(() => loop.stop()); // stopping an already stopped loop is a no-op
    assert.strictEqual(curCallCount, callCount, "Expected the loop to stop after stop() is called");
  });
});
