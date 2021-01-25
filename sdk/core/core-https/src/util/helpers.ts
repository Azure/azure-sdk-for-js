// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * A constant that indicates whether the environment the code is running is Node.JS.
 */
export const isNode =
  typeof process !== "undefined" && Boolean(process.version) && Boolean(process.versions?.node);

/**
 * A wrapper for setTimeout that resolves a promise after t milliseconds.
 * @param {number} t The number of milliseconds to be delayed.
 * @param {T} value The value to be resolved with after a timeout of t milliseconds.
 * @returns {Promise<T>} Resolved promise
 */
export function delay<T>(t: number, value?: T): Promise<T> {
  return new Promise<T>((resolve) => setTimeout(() => resolve(value), t));
}

/**
 * Returns a random integer value between a lower and upper bound,
 * inclusive of both bounds.
 * Note that this uses Math.random and isn't secure. If you need to use
 * this for any kind of security purpose, find a better source of random.
 * @param min The smallest integer value allowed.
 * @param max The largest integer value allowed.
 * @ignore @internal
 */
export function getRandomIntegerInclusive(min: number, max: number): number {
  // Make sure inputs are integers.
  min = Math.ceil(min);
  max = Math.floor(max);
  // Pick a random offset from zero to the size of the range.
  // Since Math.random() can never return 1, we have to make the range one larger
  // in order to be inclusive of the maximum value after we take the floor.
  const offset = Math.floor(Math.random() * (max - min + 1));
  return offset + min;
}
