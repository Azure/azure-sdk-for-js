// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function serializeRecord(item: any, excludes?: string[], serializer?: (item: any) => any) {
  // Handle null/undefined input
  if (!item) {
    return {};
  }

  excludes = excludes ?? [];
  const res: any = {};
  for (const key of Object.keys(item)) {
    if (excludes.includes(key) || item[key] === undefined) {
      continue;
    }
    if (serializer) {
      res[key] = serializer(item[key]);
    } else {
      res[key] = item[key] as any;
    }
  }
  return res;
}
