// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { IsArray, IsTuple, IsFunction } from "type-plus";
import { isObject } from "./object";

export type JsonMergePatch<T> = T extends object
  ? IsArray<
      T,
      T,
      IsTuple<
        T,
        T,
        IsFunction<T, T, T extends Date ? T : T extends RegExp ? T : JsonMergePatchObject<T>>
      >
    >
  : T;

type JsonMergePatchObject<T extends object> =
  // The recursion exits when the object doesn't contain string-keyed properties
  {
    // Checks if a property is optional or undefined already (no way to distinguish them AFAIK)
    [K in keyof T as K extends string ? K : never]?: JsonMergePatchProperty<T[K]>;
  };

type JsonMergePatchProperty<T> = undefined extends T
  ? // Recurses, adding null to the type union of only the optional properties
    JsonMergePatch<NonNullable<T>> | null
  : // If null is already present, this preserves it
    JsonMergePatch<NonNullable<T>> | (T & null);

/**
 * Applies `patch` to `target` according to the JSON Merge Patch RFC's spec. Does not remove
 * required fields.
 * @param target - The target of the patch.
 * @param patch - The patch. The TS type will prevent the removal of required fields from object
 * types, but no such validation is done in the function body.
 * @returns - If the patch and target are non-array objects, returns the patched target. Otherwise
 * returns `patch`.
 */
export function mergePatch<T>(target: T, patch: JsonMergePatch<T>): T {
  return mergePatchStrict(target, patch, (p): p is T => true);
}

/**
 * Applies `patch` to `target` according to the JSON Merge Patch RFC's spec. Does not remove
 * required fields.
 * @param target - The target of the patch.
 * @param patch - The patch. The TS type will prevent the removal of required fields from object
 * types, but no such validation is done in the function body.
 * @param typeGuard - A callback to provide for the handling of cases where either `target` or
 * `patch` is not an object. If this callback is not provided, the function returns `undefined`
 * when any input isn't a non-array object. This function should return a truthy value only when
 * `patch` is a suitable fallback for the patched target. Specifically, this function has no way
 * to account for missing required fields at runtime, so this function should return false when
 * such fields are missing.
 * @returns - If the patch and target are non-array objects, returns the patched target.
 * If the type guard is defined and returns a truthy value for `patch`, returns `patch` as-is.
 * Returns undefined otherwise.
 */
export function mergePatchStrict<T>(
  target: T,
  patch: JsonMergePatch<T>,
  typeGuard: (patch: T | JsonMergePatch<T>) => patch is T
): T;
export function mergePatchStrict<T>(target: T, patch: JsonMergePatch<T>): T | undefined;
export function mergePatchStrict<T>(
  target: T,
  patch: JsonMergePatch<T>,
  typeGuard?: (patch: T | JsonMergePatch<T>) => patch is T
): T | undefined {
  if (!isObject(target) || !isObject(patch)) {
    return typeGuard?.(patch) ? patch : undefined;
  }

  const keysToRemove = Object.entries(patch)
    .filter(([_, value]) => value === null)
    .map(([key, _]) => key);

  const patchedEntries = Object.entries(patch).filter(([key, _]) => !keysToRemove.includes(key));

  for (const entry of patchedEntries) {
    const [key, value] = entry;
    const childTarget = target[key];
    if (isObject(childTarget)) {
      entry[1] = mergePatchStrict(childTarget, value as JsonMergePatch<typeof childTarget>);
    }
  }

  return Object.fromEntries([
    ...Object.entries(target).filter(([key, _]) => !keysToRemove.includes(key)),
    ...patchedEntries,
  ]) as T;
}
