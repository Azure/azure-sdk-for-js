// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Creates an interval that calls the callback every `ms` milliseconds.
 * In Node.js, the interval is unref'd to prevent it from keeping the process alive.
 * @param fn - The callback to invoke
 * @param ms - The interval in milliseconds
 * @returns A cleanup function to clear the interval
 */
export function createInterval(fn: () => void, ms: number): () => void {
  const id = setInterval(fn, ms);
  id.unref();
  return () => clearInterval(id);
}
