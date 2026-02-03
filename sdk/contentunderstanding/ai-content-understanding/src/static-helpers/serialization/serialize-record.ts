// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// CUSTOMIZATION: Added explicit return type annotation `: Record<string, any>` and typed `item` parameter
// to satisfy Azure SDK ESLint rules (`@typescript-eslint/explicit-module-boundary-types`).
// Also renamed `excludes` to `propertiesToExclude` to avoid reassigning the parameter (`no-param-reassign`).
export function serializeRecord(
  item: Record<string, any>,
  excludes?: string[],
  serializer?: (item: any) => any,
): Record<string, any> {
  // CUSTOMIZATION: Use a new local variable instead of reassigning the parameter
  const propertiesToExclude = excludes ?? [];
  const res: any = {};
  for (const key of Object.keys(item)) {
    if (propertiesToExclude.includes(key) || item[key] === undefined) {
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
