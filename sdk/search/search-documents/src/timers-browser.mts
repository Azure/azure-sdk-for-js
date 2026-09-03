// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Creates an interval that calls the callback every `ms` milliseconds.
 * @param fn - The callback to invoke
 * @param ms - The interval in milliseconds
 * @returns A cleanup function to clear the interval
 */
export function createInterval(fn: () => void, ms: number): () => void {
  const id = setInterval(fn, ms);
  return () => clearInterval(id);
}
