// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function serializeRecord<T, U = T>(
  item: Record<string, T>,
  excludes?: string[],
  serializer?: (item: T) => U,
): Record<string, T | U> {
  const propertiesToExclude = excludes ?? [];
  const res: Record<string, T | U> = {};
  for (const key of Object.keys(item)) {
    const value = item[key];
    if (propertiesToExclude.includes(key) || value === undefined) {
      continue;
    }
    // Native JSON keys must remain own properties, including __proto__.
    Object.defineProperty(res, key, {
      value: serializer ? serializer(value) : value,
      enumerable: true,
      writable: true,
      configurable: true,
    });
  }
  return res;
}
