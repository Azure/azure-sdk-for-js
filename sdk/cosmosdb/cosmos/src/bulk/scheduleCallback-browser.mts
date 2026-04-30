// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Schedules a callback using queueMicrotask (universal in browsers).
 */
export function scheduleCallback(fn: () => void): void {
  queueMicrotask(fn);
}
