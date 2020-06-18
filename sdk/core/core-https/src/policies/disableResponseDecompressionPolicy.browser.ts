// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 * NOTE: When moving this file, please update "browser" section in package.json
 */

const NotSupported = new Error(
  "disableResponseDecompressionPolicy is not supported in browser environment"
);

export const disableResponseDecompressionPolicyName = "disableResponseDecompressionPolicy";

/**
 * disableResponseDecompressionPolicy is not supported in browser and attempting
 * to use it will results in error being thrown.
 */
export function disableResponseDecompressionPolicy(): never {
  throw NotSupported;
}
