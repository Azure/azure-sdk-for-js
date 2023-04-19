// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function buildMultiCollection(
  queryParameters: string[],
  parameterName: string
) {
  return queryParameters
    .map((item, index) => {
      if (index === 0) {
        return item;
      }
      return `${parameterName}=${item}`;
    })
    .join("&");
}
