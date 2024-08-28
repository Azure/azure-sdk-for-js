// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function buildMultiCollection(queryParameters: string[], parameterName: string): string {
  return queryParameters
    .map((item, index) => {
      if (index === 0) {
        return item;
      }
      return `${parameterName}=${item}`;
    })
    .join("&");
}
