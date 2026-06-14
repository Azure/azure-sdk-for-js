// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Schedules a callback using process.nextTick (highest priority microtask in Node.js).
 */
export function scheduleCallback(fn: () => void): void {
  process.nextTick(fn);
}
