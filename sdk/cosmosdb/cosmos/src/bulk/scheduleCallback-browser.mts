// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

declare function queueMicrotask(fn: () => void): void;

/**
 * Schedules a callback using queueMicrotask (universal in browsers and React Native).
 */
export function scheduleCallback(fn: () => void): void {
  queueMicrotask(fn);
}
