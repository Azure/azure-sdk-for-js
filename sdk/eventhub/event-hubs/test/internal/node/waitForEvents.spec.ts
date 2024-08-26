// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "../../utils/chai.js";
import EventEmitter from "events";
import { waitForEvents } from "../../../src/partitionReceiver.js";
import { AbortSignalLike } from "@azure/abort-controller";
import { afterAll, beforeAll, describe, it, vi } from "vitest";

function assertWaitForEvents(inputs: {
  maxEventCount: number;
  maxWaitTimeInMs: number;
  prefetchTimeInMs: number;
  expectedEvents: number[];
  expectedElapsedTimeInMs: number;
  sendEvents: (emitter: EventEmitter) => Promise<void>;
  queue?: number[];
  abortSignal?: AbortSignalLike;
  expectedErrorMsg?: string;
}): Promise<void> {
  const {
    maxEventCount,
    maxWaitTimeInMs,
    prefetchTimeInMs,
    queue = [],
    sendEvents,
    expectedEvents,
    abortSignal,
    expectedErrorMsg,
  } = inputs;
  const events = waitForEvents(maxEventCount, maxWaitTimeInMs, prefetchTimeInMs, queue, {
    abortSignal,
  }).catch((err) => {
    if (expectedErrorMsg !== undefined) {
      assert.deepEqual(err.message, expectedErrorMsg);
    } else {
      assert.fail(`Unexpected error: ${err.message}`);
    }
  });
  const emitter = new EventEmitter();
  emitter.on("message", (event: number) => {
    queue.push(event);
  });
  return Promise.all([
    events.then(() => queue.splice(0, maxEventCount)),
    sendEvents(emitter),
    vi.runAllTimersAsync(),
  ]).then(([resolvedEvents, _]) => {
    if (expectedErrorMsg === undefined) {
      assert.deepEqual(resolvedEvents, expectedEvents);
    }
    return;
  });
}

describe("waitForEvents", function () {
  beforeAll(async function () {
    vi.useFakeTimers();
  });
  afterAll(async function () {
    vi.useRealTimers();
  });

  it("Yields if the queue already have enough", async function () {
    await assertWaitForEvents({
      maxEventCount: 10,
      maxWaitTimeInMs: 10000,
      prefetchTimeInMs: 1000,
      queue: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      expectedEvents: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      sendEvents: async () => {
        /** already have enough :) */
      },
      expectedElapsedTimeInMs: 0,
    });
  });

  it("Waits for max wait time if no events arrived", async function () {
    const maxEventCount = 10;
    const maxWaitTimeInMs = 10000;
    await assertWaitForEvents({
      expectedEvents: [],
      maxEventCount,
      maxWaitTimeInMs,
      prefetchTimeInMs: 20,
      expectedElapsedTimeInMs: maxWaitTimeInMs,
      sendEvents: async (emitter) => {
        await vi.advanceTimersByTimeAsync(maxWaitTimeInMs);
        for (let i = 0; i < maxEventCount; i++) {
          emitter.emit("message", Math.random());
        }
      },
    });
  });

  it("Yields if events arrived within prefetch wait time", async function () {
    const maxEventCount = 10;
    const maxWaitTimeInMs = 10000;
    const prefetchTimeInMs = 40;
    await assertWaitForEvents({
      expectedEvents: [0, 1, 2, 3, 4],
      maxEventCount,
      maxWaitTimeInMs,
      prefetchTimeInMs,
      expectedElapsedTimeInMs: prefetchTimeInMs * 2,
      sendEvents: async (emitter) => {
        await vi.advanceTimersByTimeAsync(prefetchTimeInMs - Math.random() * 10);
        for (let i = 0; i < maxEventCount / 2; i++) {
          emitter.emit("message", i);
        }
        await vi.advanceTimersByTimeAsync(prefetchTimeInMs);
        for (let i = 0; i < maxEventCount; i++) {
          emitter.emit("message", Math.random());
        }
      },
    });
  });

  it("Can be aborted", async function () {
    const maxEventCount = 10;
    const maxWaitTimeInMs = 10000;
    const abortController = new AbortController();
    const prefetchTimeInMs = 1000;
    const expectedElapsedTimeInMs = prefetchTimeInMs - Math.floor(Math.random() * 1000);
    await assertWaitForEvents({
      expectedEvents: [],
      maxEventCount,
      maxWaitTimeInMs,
      prefetchTimeInMs,
      expectedElapsedTimeInMs,
      abortSignal: abortController.signal,
      expectedErrorMsg: "The operation was aborted.",
      sendEvents: async (emitter) => {
        await vi.advanceTimersByTimeAsync(expectedElapsedTimeInMs);
        abortController.abort();
        for (let i = 0; i < maxEventCount; i++) {
          emitter.emit("message", Math.random());
        }
      },
    });
  });
});
