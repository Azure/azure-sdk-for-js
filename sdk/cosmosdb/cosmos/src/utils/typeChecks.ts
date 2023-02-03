// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  NonePartitionKeyLiteral,
  NonePartitionKeyType,
  NullPartitionKeyLiteral,
  NullPartitionKeyType,
  PrimitivePartitionKeyValue,
} from "../documents";

/**
 * A type which could be any type but undefined
 */
export type NonUndefinable<T> = T extends undefined ? never : T;

/**
 * Utility function to avoid writing boilder plate code while checking for
 * undefined values. It throws Error if the input value is undefined.
 * @param value - Value which is potentially undefined.
 * @param msg - Error Message to throw if value is undefined.
 * @returns
 */
export function assertNotUndefined<T>(value: T, msg?: string): NonUndefinable<T> {
  if (value !== undefined) {
    return value as NonUndefinable<T>;
  }
  throw new Error(msg || "Unexpected 'undefined' value encountered");
}

/**
 * Check for value being PrimitivePartitionKeyValue.
 * @internal
 */
export function isPrimitivePartitionKeyValue(value: unknown): value is PrimitivePartitionKeyValue {
  return (
    isWellDefinedPartitionKeyValue(value) ||
    isNonePartitionKeyValue(value) ||
    isNullPartitionKeyValue(value)
  );
}

/**
 * Check for value being string, number or boolean.
 * @internal
 */
export function isWellDefinedPartitionKeyValue(value: unknown): value is string | number | boolean {
  return typeof value === "string" || typeof value === "boolean" || typeof value === "number";
}

/**
 * Check for value being NonePartitionKeyType.
 * @internal
 */
export function isNonePartitionKeyValue(value: unknown): value is NonePartitionKeyType {
  return value !== undefined && JSON.stringify(value) === JSON.stringify(NonePartitionKeyLiteral);
}

/**
 * Check for value being NullPartitionKeyType.
 * @internal
 */
export function isNullPartitionKeyValue(value: unknown): value is NullPartitionKeyType {
  return value === NullPartitionKeyLiteral;
}
