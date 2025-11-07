// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export function serializeRecord(item: any, excludes?: string[], serializer?: (item: any) => any) {
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
