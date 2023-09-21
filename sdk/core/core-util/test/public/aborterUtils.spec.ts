// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { cancelablePromiseRace, createAbortablePromise, delay } from "../../src";

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
  let function3Done = false;
  const function1Delay = 100;
  let function2Delay = 200;
  const function3Delay = 2000;
  const function2Message = "function 2 is rejected";

  const function1 = async (abortOptions: { abortSignal?: AbortSignalLike }): Promise<number> => {
    let token: ReturnType<typeof setTimeout>;
    return createAbortablePromise(
      (resolve) => {
        token = setTimeout(resolve, function1Delay);
      },
      {
        cleanupBeforeAbort: () => {
          function1Aborted = true;
          clearTimeout(token);
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
          function2Aborted = true;
          clearTimeout(token);
        },
        abortSignal: abortOptions.abortSignal,
      }
    );
  };

  const function3 = async (abortOptions: { abortSignal?: AbortSignalLike }): Promise<void> => {
    return delay(function3Delay, { abortSignal: abortOptions.abortSignal }).finally(() => {
      function3Done = true;
    });
  };

  afterEach(function () {
    // reset to default values
    function1Aborted = false;
    function2Aborted = false;
    function2Delay = 200;
    function3Done = false;
  });

  it("should resolve with the first promise that resolves, abort the rest", async function () {
    const startTime = Date.now();
    await cancelablePromiseRace<number, string, void>([function1, function2, function3]); // 1 finishes first, 2&3 are aborted
    assert.isFalse(function1Aborted); // checks 1 is not aborted
    assert.isTrue(function2Aborted); // checks 2 is aborted
    assert.isTrue(function3Done); // checks 3 is done
    const endTime = Date.now();
    assert.isBelow((endTime - startTime) / 1000, function3Delay); // checks 3 is aborted
  });

  it("should reject with the first promise that rejects, abort the rest", async function () {
    function2Delay = 50;
    const startTime = Date.now();
    assert.strictEqual(
      await cancelablePromiseRace<number, string, void>([function1, function2, function3]),
      function2Message
    ); // 2 rejects and finishes first, 1&3 are aborted
    assert.isTrue(function1Aborted); // checks 1 is aborted
    assert.isFalse(function2Aborted); // checks 2 is not aborted
    assert.isTrue(function3Done); // checks 3 is done
    const endTime = Date.now();
    assert.isBelow((endTime - startTime) / 1000, function3Delay); // checks 3 is aborted
  });

  it("should respect the abort signal supplied", async function () {
    const aborter = new AbortController();
    const startTime = Date.now();
    setTimeout(() => aborter.abort(), function1Delay / 2);
    let errorThrown = false;
    try {
      await cancelablePromiseRace<number, string, void>([function1, function2, function3], {
        abortSignal: aborter.signal,
      }); // all are aborted
    } catch (error) {
      errorThrown = true;
      assert.strictEqual((error as { message: string }).message, "The operation was aborted.");
    }
    assert.isTrue(errorThrown);
    assert.isTrue(function1Aborted); // checks 1 is aborted
    assert.isTrue(function2Aborted); // checks 2 is aborted
    assert.isTrue(function3Done); // checks 3 is done
    const endTime = Date.now();
    assert.isBelow((endTime - startTime) / 1000, function3Delay); // checks 3 is aborted
  });
});
