// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Returns all parameters per item*/
export function buildMultiCollection(items: string[], parameterName: string): string {
  return items
    .map((item, index) => {
      if (index === 0) {
        return item;
      }
      return `${parameterName}=${item}`;
    })
    .join("&");
}
