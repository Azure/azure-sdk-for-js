// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function buildMultiCollection(items: string[], parameterName: string) {
  return items
    .map((item, index) => {
      if (index === 0) {
        return item;
      }
      return `${parameterName}=${item}`;
    })
    .join("&");
}
