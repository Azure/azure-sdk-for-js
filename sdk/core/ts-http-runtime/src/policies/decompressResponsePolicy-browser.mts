// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const decompressResponsePolicyName = "decompressResponsePolicy";

/**
 * decompressResponsePolicy is not supported in the browser and attempting
 * to use it will raise an error.
 */
export function decompressResponsePolicy(): never {
  throw new Error("decompressResponsePolicy is not supported in browser environment");
}
