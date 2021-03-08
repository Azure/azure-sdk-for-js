// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * A wrapper for setTimeout that resolves a promise after timeInMs milliseconds.
 * @param timeInMs - The number of milliseconds to be delayed.
 * @returns Promise that is resolved after timeInMs
 */
export function delay(timeInMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), timeInMs));
}
