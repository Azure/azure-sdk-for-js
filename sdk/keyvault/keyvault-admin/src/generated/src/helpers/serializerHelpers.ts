// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function serializeRecord<
  T extends string | number | boolean | Date | null,
  R,
>(item: Record<string, T>): Record<string, R>;
export function serializeRecord<T, R>(
  item: Record<string, T>,
  serializer: (item: T) => R,
): Record<string, R>;
export function serializeRecord<T, R>(
  item: Record<string, T>,
  serializer?: (item: T) => R,
): Record<string, R> {
  return Object.keys(item).reduce(
    (acc, key) => {
      if (isSupportedRecordType(item[key])) {
        acc[key] = item[key] as any;
      } else if (serializer) {
        const value = item[key];
        if (value !== undefined) {
          acc[key] = serializer(value);
        }
      } else {
        console.warn(`Don't know how to serialize ${item[key]}`);
        acc[key] = item[key] as any;
      }
      return acc;
    },
    {} as Record<string, R>,
  );
}

function isSupportedRecordType(t: any) {
  return (
    ["number", "string", "boolean", "null"].includes(typeof t) ||
    t instanceof Date
  );
}
