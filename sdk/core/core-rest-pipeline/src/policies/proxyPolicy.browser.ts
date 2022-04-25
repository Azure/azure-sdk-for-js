// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 * NOTE: When moving this file, please update "browser" section in package.json
 */

const NotSupported = new Error("proxyPolicy is not supported in browser environment");

export const proxyPolicyName = "proxyPolicy";

export function getDefaultProxySettings(): never {
  throw NotSupported;
}

/**
 * proxyPolicy is not supported in the browser and attempting
 * to use it will raise an error.
 */
export function proxyPolicy(): never {
  throw NotSupported;
}

/**
 * A function to reset the cached agents.
 * proxyPolicy is not supported in the browser and attempting
 * to use it will raise an error.
 * @internal
 */
export function resetCachedProxyAgents(): never {
  throw NotSupported;
}
