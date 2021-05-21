// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Check that obj[k] is defined. If not, throw a specific error.
 * @internal
 */
export function expectDefinedFromService<T, K extends keyof T>(obj: T, k: K): NonNullable<T[K]> {
  const value = obj[k];
  if (value === undefined) {
    throw new Error(`Internal Error: The remote rendering service failed to set property ${k}`);
  }
  return value!;
}
