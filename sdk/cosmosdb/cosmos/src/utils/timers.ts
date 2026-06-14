// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Creates a recurring interval that does not keep the Node.js event loop alive.
 * @param fn - The function to call on each interval.
 * @param ms - The interval in milliseconds.
 * @returns A cleanup function that stops the interval.
 */
export function createInterval(fn: () => void, ms: number): () => void {
  const id = setInterval(fn, ms);
  id.unref();
  return () => clearInterval(id);
}
