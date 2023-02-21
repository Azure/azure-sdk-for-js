// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import { AbortController } from "@azure/abort-controller";
import { assert } from "chai";
import { checkOnInterval } from "../../src/eventHubReceiver";

describe("checkOnInterval", function () {
  it("should resolve when the check function returns true", async function () {
    const clock = sinon.useFakeTimers();
    const delayTime = 2500;
    const callCount = 3;
    let curCallCount = 0;
    const delayPromise = checkOnInterval(delayTime, () => ++curCallCount === callCount);
    const time = await clock.runAllAsync();
    clock.restore();
    assert.strictEqual(time, delayTime * callCount);
    await delayPromise;
  });

  it("should return when the abort signal is called", async function () {
    const delayTime = 2500;
    const aborter = new AbortController();
    const StandardAbortMessage = "The operation was aborted.";
    let callCount = 3;
    const delayPromise = checkOnInterval(delayTime, () => --callCount === 0, {
      abortSignal: aborter.signal,
      abortErrorMsg: StandardAbortMessage,
    });
    aborter.abort();
    await assert.isRejected(delayPromise, StandardAbortMessage);
  });
});
