// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";

/**
 * Creates an AbortSignal that signals that it's aborted after .aborted is checked a certain
 * number of times.
 */
export function createCountdownAbortSignal(
  numTimesTillAborted: number
): ReturnType<typeof createAbortSignalForTest> {
  const countdownFn = () => {
    --numTimesTillAborted;

    if (numTimesTillAborted < 0) {
      throw new Error(
        "We're checking abortSignal more than we thought. Our count is probably incorrect."
      );
    }

    return numTimesTillAborted === 0;
  };

  return createAbortSignalForTest(countdownFn);
}

/**
 * Creates an AbortSignal that is already signalled or can be controlled by a
 * custom function passed via isAborted.
 */
export function createAbortSignalForTest(
  isAborted: boolean | (() => boolean) = false
): AbortSignalLike & {
  removeWasCalled: boolean;
  addWasCalled: boolean;
} {
  const removeWasCalled = false;
  let addWasCalled = false;

  const signal = {
    addEventListener(): void {
      addWasCalled = true;
    },
    removeEventListener(): void {
      this.removeWasCalled = true;
    },
    removeWasCalled,
    addWasCalled,
    get aborted(): boolean {
      if (typeof isAborted === "function") {
        return isAborted();
      }
      return isAborted;
    }
  };

  return signal;
}
