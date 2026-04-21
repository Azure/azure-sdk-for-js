// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import { describe, it, assert, expect, afterEach, vi } from "vitest";
import { cancelablePromiseRace, createAbortablePromise } from "../../src/index.js";

describe("createAbortablePromise", function () {
  let token: ReturnType<typeof setTimeout>;
  const delayTime = 2500;
  const createPromise = ({
    abortSignal,
    abortErrorMsg,
  }: { abortSignal?: AbortSignalLike; abortErrorMsg?: string } = {}): Promise<unknown> =>
    createAbortablePromise(
      (resolve) => {
        token = setTimeout(() => resolve(undefined), delayTime);
      },
      {
        cleanupBeforeAbort: () => clearTimeout(token),
        abortSignal,
        abortErrorMsg,
      },
    );
  afterEach(function () {
    vi.useRealTimers();
  });

  it("should resolve if not aborted nor rejected", async function () {
    const clock = vi.useFakeTimers();
    const promise = createPromise();
    await clock.advanceTimersToNextTimerAsync();
    assert.strictEqual(clock.getTimerCount(), 0);
    clock.useRealTimers();
    await expect(promise).resolves.toBeUndefined();
  });

  it("should reject when aborted", async function () {
    const aborter = new AbortController();
    const abortErrorMsg = "The test operation was aborted.";
    const promise = createPromise({
      abortSignal: aborter.signal,
      abortErrorMsg,
    });
    aborter.abort();
    await expect(promise).rejects.toThrowError(abortErrorMsg);
  });

  it("should reject immediately if abort signal is already aborted", async function () {
    const aborter = new AbortController();
    aborter.abort();
    const promise = createAbortablePromise(
      (resolve) => {
        setTimeout(() => resolve(undefined), 1000);
      },
      {
        abortSignal: aborter.signal,
        abortErrorMsg: "Already aborted",
      },
    );
    await expect(promise).rejects.toThrowError("Already aborted");
  });

  it("should reject when buildPromise calls reject", async function () {
    const promise = createAbortablePromise((_resolve, reject) => {
      reject(new Error("build error"));
    });
    await expect(promise).rejects.toThrowError("build error");
  });

  it("should reject when buildPromise throws synchronously", async function () {
    const promise = createAbortablePromise(() => {
      throw new Error("sync throw");
    });
    await expect(promise).rejects.toThrowError("sync throw");
  });
});

describe("cancelablePromiseRace", function () {
  const cleanup1 = vi.fn();
  const cleanup2 = vi.fn();
  const cleanup3 = vi.fn();
  const function1Delay = 1000;
  let function2Delay = 2000;
  const function3Delay = 5000; // Default: function1Delay < function2Delay < function3Delay
  const function2Message = "function 2 is rejected";
  const function3Message = "function 3 is rejected";

  const function1 = async (abortOptions: { abortSignal?: AbortSignalLike }): Promise<void> => {
    let token: ReturnType<typeof setTimeout>;
    return createAbortablePromise(
      (resolve) => {
        token = setTimeout(resolve, function1Delay);
      },
      {
        cleanupBeforeAbort: () => {
          clearTimeout(token);
          cleanup1();
        },
        abortSignal: abortOptions.abortSignal,
      },
    );
  };

  const function2 = async (abortOptions: { abortSignal?: AbortSignalLike }): Promise<string> => {
    let token: ReturnType<typeof setTimeout>;
    return createAbortablePromise(
      (reject) => {
        token = setTimeout(() => reject(function2Message), function2Delay);
      },
      {
        cleanupBeforeAbort: () => {
          clearTimeout(token);
          cleanup2();
        },
        abortSignal: abortOptions.abortSignal,
      },
    );
  };

  const function3 = async (abortOptions: { abortSignal?: AbortSignalLike }): Promise<void> => {
    let token: ReturnType<typeof setTimeout>;
    return createAbortablePromise(
      (resolve, reject) => {
        token =
          Math.random() < 0.5
            ? setTimeout(resolve, function3Delay)
            : setTimeout(() => reject(function3Message), function3Delay);
      },
      {
        cleanupBeforeAbort: () => {
          clearTimeout(token);
          cleanup3();
        },
        abortSignal: abortOptions.abortSignal,
      },
    );
  };

  afterEach(function () {
    // reset to default values
    cleanup1.mockClear();
    cleanup2.mockClear();
    cleanup3.mockClear();
    function2Delay = 2000;
  });

  it("should resolve with the first promise that resolves, abort the rest", async function () {
    await cancelablePromiseRace<[number, string, void]>([function1, function2, function3]); // 1 finishes first, 2&3 are aborted
    expect(cleanup1).not.toHaveBeenCalled(); // checks 1 is not aborted
    expect(cleanup2).toHaveBeenCalled(); // checks 2 is aborted
    expect(cleanup3).toHaveBeenCalled(); // checks 3 is aborted
  });

  it("should reject with the first promise that rejects, abort the rest", async function () {
    function2Delay = function1Delay / 2;
    assert.strictEqual(
      await cancelablePromiseRace<[number, string, void]>([function1, function2, function3]),
      function2Message,
    ); // 2 rejects and finishes first, 1&3 are aborted
    expect(cleanup1).toHaveBeenCalled(); // checks 1 is aborted
    expect(cleanup2).not.toHaveBeenCalled(); // checks 2 is not aborted
    expect(cleanup3).toHaveBeenCalled(); // checks 3 is aborted
  });

  it("should respect the abort signal supplied", async function () {
    const aborter = new AbortController();
    setTimeout(() => aborter.abort(), function1Delay / 2);
    await expect(
      cancelablePromiseRace<[number, string, void]>([function1, function2, function3], {
        abortSignal: aborter.signal,
      }),
    ).rejects.toThrow("The operation was aborted.");
    expect(cleanup1).toHaveBeenCalled(); // checks 1 is aborted
    expect(cleanup2).toHaveBeenCalled(); // checks 2 is aborted
    expect(cleanup3).toHaveBeenCalled(); // checks 3 is aborted
  });
});
