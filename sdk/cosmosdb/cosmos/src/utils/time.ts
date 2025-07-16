// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @hidden
 * Utility function to get currentTime in UTC milliseconds.
 * @returns
 */

export function getCurrentTimestampInMs(): number {
  return Date.now();
}

/**
 * @hidden
 * Utility function to start a background task that runs at specified intervals.
 */
export function startBackgroundTask(
  action: () => Promise<void>,
  intervalMs: number,
): NodeJS.Timeout {
  const timer = setInterval(() => {
    (async () => {
      await action();
    })();
  }, intervalMs);
  // Unref the timer if available to prevent it from keeping the Node.js event loop alive
  if (timer.unref && typeof timer.unref === "function") {
    timer.unref();
  }
  return timer;
}
