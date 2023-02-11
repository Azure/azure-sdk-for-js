// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { createAbortablePromise } from "../../src/delay";

chai.use(chaiAsPromised);
const { assert } = chai;

describe("createAbortablePromise", function () {
  let token: ReturnType<typeof setTimeout>;
  const delayTime = 2500;
  const createPromise = ({
    abortSignal,
    abortErrorMsg,
  }: { abortSignal?: AbortSignalLike; abortErrorMsg?: string } = {}) =>
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
