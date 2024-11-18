// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * A constant that indicates whether the environment is node.js or browser based.
 */
export const isNode =
  typeof process !== "undefined" &&
  !!process.version &&
  !!process.versions &&
  !!process.versions.node;

/**
 * A constant that indicates whether the environment is node.js version 8.
 */
export const isNode8 = isNode && Number(process.versions.node.split(".")[0]) === 8;
