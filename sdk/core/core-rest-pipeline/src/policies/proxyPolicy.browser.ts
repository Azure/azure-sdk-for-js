// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 * NOTE: When moving this file, please update "browser" section in package.json
 */

export const proxyPolicyName = "proxyPolicy";

export function getDefaultProxySettings(): never {
  throw new Error("proxyPolicy is not supported in browser environment");
}

/**
 * proxyPolicy is not supported in the browser and attempting
 * to use it will raise an error.
 */
export function proxyPolicy(): never {
  throw new Error("proxyPolicy is not supported in browser environment");
}

/**
 * A function to reset the cached agents.
 * proxyPolicy is not supported in the browser and attempting
 * to use it will raise an error.
 * @internal
 */
export function resetCachedProxyAgents(): never {
  throw new Error("proxyPolicy is not supported in browser environment");
}
