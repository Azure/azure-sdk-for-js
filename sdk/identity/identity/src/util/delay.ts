// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

let testFunction: ((t: number) => Promise<void>) | undefined;

/**
 * A wrapper for setTimeout that resolves a promise after t milliseconds.
 * @internal
 * @param {number} t The number of milliseconds to be delayed.
 * @returns {Promise<void>} Resolved promise
 */
export function delay(t: number): Promise<void> {
  if (testFunction) {
    return testFunction(t);
  }

  return new Promise((resolve) => setTimeout(() => resolve(), t));
}

/**
 * @internal
 */
export function _setDelayTestFunction(func?: (t: number) => Promise<void>): void {
  testFunction = func;
}
