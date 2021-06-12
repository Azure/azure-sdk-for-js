// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Base64 decode
 *
 * @internal
 * @param encodedString -
 * @returns
 */
export function base64decode(encodedString: string): string {
  return Buffer.from(encodedString, "base64").toString();
}
