// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// CUSTOMIZATION: EMITTER-FIX: Typed `item` parameter as `Record<string, any>` instead of `any`
// to satisfy Azure SDK ESLint rules (`@typescript-eslint/explicit-module-boundary-types`).
// The return type annotation and `propertiesToExclude` local variable are now generated upstream.
export function serializeRecord(
  item: Record<string, any>,
  excludes?: string[],
  serializer?: (item: any) => any,
): Record<string, any> {
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
