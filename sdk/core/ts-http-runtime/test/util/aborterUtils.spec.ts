// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import { AbortSignalLike } from "../../src/abort-controller/AbortSignalLike";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { cancelablePromiseRace, createAbortablePromise } from "../../src";

chai.use(chaiAsPromised);
const { assert } = chai;

describe("createAbortablePromise", function () {
  let token: ReturnType<typeof setTimeout>;
  const delayTime = 2500;
  const createPromise = ({
    abortSignal,
    abortErrorMsg,
  }: { abortSignal?: AbortSignalLike; abortErrorMsg?: string } = {}): Promise<unknown> =>
    createAbortablePromise(
      (resolve) => {
        token = setTimeout(resolve, delayTime);
      },
      {
        cleanupBeforeAbort: () => clearTimeout(token),
        abortSignal,
        abortErrorMsg,
      }
    );
  afterEach(function () {
    sinon.restore();
  });

  it("should resolve if not aborted nor rejected", async function () {
    const clock = sinon.useFakeTimers();
    const promise = createPromise();
    const time = await clock.nextAsync();
    clock.restore();
    assert.strictEqual(time, delayTime);
    await assert.isFulfilled(promise);
  });

  it("should reject when aborted", async function () {
    const aborter = new AbortController();
    const abortErrorMsg = "The test operation was aborted.";
    const promise = createPromise({
      abortSignal: aborter.signal,
      abortErrorMsg,
    });
    aborter.abort();
    await assert.isRejected(promise, abortErrorMsg);
  });
});

describe("cancelablePromiseRace", function () {
  let function1Aborted = false;
  let function2Aborted = false;
  let function3Aborted = false;
  const function1Delay = 100;
  let function2Delay = 200;
  const function3Delay = 2000; // Default: function1Delay < function2Delay < function3Delay
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
          function1Aborted = true;
        },
        abortSignal: abortOptions.abortSignal,
      }
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
          function2Aborted = true;
        },
        abortSignal: abortOptions.abortSignal,
      }
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
          function3Aborted = true;
        },
        abortSignal: abortOptions.abortSignal,
      }
    );
  };

  afterEach(function () {
    // reset to default values
    function1Aborted = false;
    function2Aborted = false;
    function2Delay = 200;
    function3Aborted = false;
  });

  it("should resolve with the first promise that resolves, abort the rest", async function () {
    await cancelablePromiseRace<[number, string, void]>([function1, function2, function3]); // 1 finishes first, 2&3 are aborted
    assert.isFalse(function1Aborted); // checks 1 is not aborted
    assert.isTrue(function2Aborted); // checks 2 is aborted
    assert.isTrue(function3Aborted); // checks 3 is aborted
  });

  it("should reject with the first promise that rejects, abort the rest", async function () {
    function2Delay = function1Delay / 2;
    assert.strictEqual(
      await cancelablePromiseRace<[number, string, void]>([function1, function2, function3]),
      function2Message
    ); // 2 rejects and finishes first, 1&3 are aborted
    assert.isTrue(function1Aborted); // checks 1 is aborted
    assert.isFalse(function2Aborted); // checks 2 is not aborted
    assert.isTrue(function3Aborted); // checks 3 is aborted
  });

  it("should respect the abort signal supplied", async function () {
    const aborter = new AbortController();
    setTimeout(() => aborter.abort(), function1Delay / 2);
    let errorThrown = false;
    try {
      await cancelablePromiseRace<[number, string, void]>([function1, function2, function3], {
        abortSignal: aborter.signal,
      }); // all are aborted
    } catch (error) {
      errorThrown = true;
      assert.strictEqual((error as { message: string }).message, "The operation was aborted.");
    }
    assert.isTrue(errorThrown);
    assert.isTrue(function1Aborted); // checks 1 is aborted
    assert.isTrue(function2Aborted); // checks 2 is aborted
    assert.isTrue(function3Aborted); // checks 3 is aborted
  });
});
