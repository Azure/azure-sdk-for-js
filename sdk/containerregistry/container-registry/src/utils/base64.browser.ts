// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

declare global {
  function atob(input: string): string;
}

/**
 * Base64 decode
 *
 * @internal
 * @param encodedString -
 * @returns

 */
export function base64decode(encodedString: string): string {
  return atob(encodedString);
}
