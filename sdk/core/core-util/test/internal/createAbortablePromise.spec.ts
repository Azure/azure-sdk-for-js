// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import { AbortController } from "@azure/abort-controller";
import { assert } from "@azure/test-utils";
import { createAbortablePromise } from "../../src/delay";

describe("createAbortablePromise", function () {
  let token: ReturnType<typeof setTimeout>;
  const delayTime = 2500;
  const createPromise = createAbortablePromise<void>({
    buildPromise: ({ resolve }) => {
      token = setTimeout(() => {
        resolve();
      }, delayTime);
    },
    cleanupBeforeAbort: () => clearTimeout(token),
  });
  afterEach(function () {
    sinon.restore();
  });

  it("should resolve if not aborted nor rejected", async function () {
    const clock = sinon.useFakeTimers();
    const promise = createPromise();
    const time = await clock.nextAsync();
    clock.restore();
    assert.strictEqual(time, delayTime);
    await promise;
  });

  it("should reject when aborted", async function () {
    const aborter = new AbortController();
    const abortErrorMsg = "The operation was aborted.";
    const promise = createPromise({
      abortSignal: aborter.signal,
      abortErrorMsg,
    });
    aborter.abort();
    assert.isRejected(promise, new RegExp(abortErrorMsg));
  });
});
