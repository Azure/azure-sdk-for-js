// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Schedules a callback using the best available method for Node.js.
 * Prefers process.nextTick (highest priority microtask in Node).
 */
export function scheduleCallback(fn: () => void): void {
  process.nextTick(fn);
}
