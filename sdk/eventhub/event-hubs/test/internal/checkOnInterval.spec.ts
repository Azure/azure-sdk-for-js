// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { checkOnInterval } from "../../src/partitionReceiver.js";
import { describe, it, vi } from "vitest";
import { StandardAbortMessage } from "@azure/core-amqp";
import { expect } from "../utils/chai.js";

describe("checkOnInterval", function () {
  it("should resolve when the check function returns true", async function () {
    vi.useFakeTimers();
    const delayTime = 2500;
    const callCount = 3;
    let curCallCount = 0;
    const promise = checkOnInterval(delayTime, () => ++curCallCount === callCount);
    const time = delayTime * callCount;
    await vi.advanceTimersByTimeAsync(time - 1);
    expect(vi.getTimerCount()).to.equal(1);
    await vi.advanceTimersByTimeAsync(1);
    expect(vi.getTimerCount()).to.equal(0);
    await promise;
    vi.useRealTimers();
  });

  it("should return when the abort signal is called", async function () {
    const delayTime = 2500;
    const aborter = new AbortController();
    let callCount = 3;
    const delayPromise = checkOnInterval(delayTime, () => --callCount === 0, {
      abortSignal: aborter.signal,
      abortErrorMsg: StandardAbortMessage,
    });
    aborter.abort();
    await expect(delayPromise).to.be.rejectedWith(StandardAbortMessage);
  });
});
