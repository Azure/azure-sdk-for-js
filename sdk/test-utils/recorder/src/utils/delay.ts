// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isPlaybackMode } from "./utils";

/**
 * Usage - `await delay(<milliseconds>)`
 * This `delay` has no effect if the `TEST_MODE` is `"playback"`.
 * If the `TEST_MODE` is not `"playback"`, `delay` is a wrapper for setTimeout that resolves a promise after t milliseconds.
 *
 * @param {number} milliseconds The number of milliseconds to be delayed.
 */
export function delay(milliseconds: number): Promise<void> | void {
  if (isPlaybackMode()) {
    return;
  }
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
