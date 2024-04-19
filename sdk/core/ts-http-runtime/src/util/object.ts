// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * A generic shape for a plain JS object.
 */
export type UnknownObject = { [s: string]: unknown };

/**
 * Helper to determine when an input is a generic JS object.
 * @returns true when input is an object type that is not null, Array, RegExp, or Date.
 */
export function isObject(input: unknown): input is UnknownObject {
  return (
    typeof input === "object" &&
    input !== null &&
    !Array.isArray(input) &&
    !(input instanceof RegExp) &&
    !(input instanceof Date)
  );
}
