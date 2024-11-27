// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @internal
 * Workaround to create a path query string for [ collectionFormat: multi ](https://swagger.io/docs/specification/2-0/describing-parameters/#:~:text=csv%20(-,default,-)).
 * This should be removed once the core-client support collectionFormat: multi.
 */
export function createMultiCollection(key: string, values: string[]): string {
  return values.slice(1).reduce((acc, value) => {
    return `${acc}&${key}=${value}`;
  }, values[0] || "");
}
