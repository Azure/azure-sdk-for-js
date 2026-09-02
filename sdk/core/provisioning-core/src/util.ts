// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isExpression } from "./expression/expressions.js";
import { isResource } from "./constructs/resource/resource-utils.js";

/**
 * Filters an object to only include properties with defined (non-undefined) values.
 * Useful for constructing objects with fixed types that use optional properties
 * (e.g. InfraNode) where `exactOptionalPropertyTypes` prevents assigning undefined.
 *
 * Keys whose value type includes undefined become optional in the return type.
 * Keys whose value type is exactly undefined are removed entirely.
 */
export function definedProps<T extends Record<string, unknown>>(
  obj: T,
): { [K in keyof T as undefined extends T[K] ? never : K]: T[K] } & {
  [
    K in keyof T as undefined extends T[K] ? (T[K] extends undefined ? never : K) : never
  ]+?: Exclude<T[K], undefined>;
} {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as any;
}

/**
 * Asserts that a value is assignable to a primitive Bicep type
 * (`string`, `int`, `bool`, `object`, `array`).
 *
 * @remarks
 * The value may be a literal, an `Expression`, a resource view, or a
 * `Resource`. Only **concrete literals** are validated; symbolic values
 * (expressions / views / resources) are skipped because their type is
 * enforced by the type system at author time. `undefined` and non-primitive
 * (`any`/structural) types are also no-ops. Throws on a literal/type
 * mismatch.
 *
 * @param value - The candidate value (literal or symbolic).
 * @param type - The primitive Bicep type to check against.
 * @param label - Optional prefix for the error message (e.g. the declaration).
 */
export function assertValueAssignableToType(value: unknown, type: string, label?: string): void {
  if (value === undefined) return;
  if (isExpression(value) || isResource(value)) return;

  const prefix = label ? `${label} ` : "";
  const fail = (got: string): never => {
    throw new Error(`${prefix}expected type "${type}" but got ${got}.`);
  };

  switch (type) {
    case "string":
      if (typeof value !== "string") fail(typeof value);
      break;
    case "int":
      if (typeof value !== "number" || !Number.isInteger(value)) {
        fail(typeof value === "number" ? "non-integer number" : typeof value);
      }
      break;
    case "bool":
      if (typeof value !== "boolean") fail(typeof value);
      break;
    case "object":
      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        fail(Array.isArray(value) ? "array" : value === null ? "null" : typeof value);
      }
      break;
    case "array":
      if (!Array.isArray(value)) fail(value === null ? "null" : typeof value);
      break;
    // "any" and other (structural) types: no runtime check.
  }
}
