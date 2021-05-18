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

export const isNode8 = () => isNode && Number(process.versions.node.split(".")[0]) === 8;
