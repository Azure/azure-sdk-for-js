// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// TODO:
// Either drop Node 8 or re-enable it.

/**
 * @internal
 */
export const isNode8 = process.versions.node[0] === "8";

/**
 * @internal
 */
export const Node8NotSupportedError = new Error("Node 8 does not support persistence caching.");

/**
 * @internal
 */
export function requireMsalNodeExtensions(): any {
  if (isNode8) {
    throw Node8NotSupportedError;
  }
  /* eslint-disable-next-line @typescript-eslint/no-require-imports, import/no-extraneous-dependencies */
  return require("@azure/msal-node-extensions");
}
