// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Returns true if all specified properties of the item are undefined.
 * @param item The object to check.
 * @param properties The list of property names to check on the item.
 * @returns True if all specified properties are undefined, otherwise false.
 */
export function areAllPropsUndefined(item: Record<string, any>, properties: string[]): boolean {
  for (const property of properties) {
    if (item[property] !== undefined) {
      return false;
    }
  }
  return true;
}
