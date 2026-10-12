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
    if (serializer) {
      res[key] = serializer(value);
    } else {
      res[key] = value;
    }
  }
  return res;
}
