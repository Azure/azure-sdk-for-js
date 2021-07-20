// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Usage - `await delay(<milliseconds>)`
 * This `delay` has no effect if the `TEST_MODE` is `"playback"`.
 * If the `TEST_MODE` is not `"playback"`, `delay` is a wrapper for setTimeout that resolves a promise after t milliseconds.
 *
 * @param milliseconds - The number of milliseconds to be delayed.
 * @returns Resolved promise
 */
export function delay(milliseconds: number): Promise<void> | null {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
