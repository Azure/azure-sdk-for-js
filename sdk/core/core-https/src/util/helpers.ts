// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * A wrapper for setTimeout that resolves a promise after t milliseconds.
 * @param {number} t The number of milliseconds to be delayed.
 * @param {T} value The value to be resolved with after a timeout of t milliseconds.
 * @returns {Promise<T>} Resolved promise
 */
export function delay<T>(t: number, value?: T): Promise<T> {
  return new Promise<T>((resolve) => setTimeout(() => resolve(value), t));
}
