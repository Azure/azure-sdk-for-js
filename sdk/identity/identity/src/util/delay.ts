// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Usage - `await delay(<milliseconds>)`
 *
 * @param milliseconds - The number of milliseconds to be delayed.
 * @returns Resolved promise
 */
export function delay(milliseconds: number): Promise<void> | null {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
