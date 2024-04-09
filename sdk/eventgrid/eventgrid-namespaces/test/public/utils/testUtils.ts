// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * A constant that indicates whether the environment is node.js or browser based.
 */
export const isNode =
  typeof process !== "undefined" &&
  !!process.version &&
  !!process.versions &&
  !!process.versions.node;

export function getRandomNumber(): number {
  return Math.floor(Math.random() * 1000 + 100000);
}
