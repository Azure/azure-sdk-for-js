// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Schedule a callback to run after the current event loop iteration.
 * Uses setTimeout(0) in browser environments.
 */
export function scheduleImmediate(callback: () => void): void {
  setTimeout(callback, 0);
}
