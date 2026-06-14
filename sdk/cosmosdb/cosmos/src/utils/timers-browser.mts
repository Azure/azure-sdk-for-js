// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Creates a recurring interval.
 * @param fn - The function to call on each interval.
 * @param ms - The interval in milliseconds.
 * @returns A cleanup function that stops the interval.
 */
export function createInterval(fn: () => void, ms: number): () => void {
  const id = setInterval(fn, ms);
  return () => clearInterval(id);
}
