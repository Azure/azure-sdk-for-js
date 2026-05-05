// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Schedule a callback to run after the current event loop iteration.
 * Uses setImmediate on Node.js for optimal performance.
 */
export function scheduleImmediate(callback: () => void): void {
  setImmediate(callback);
}
