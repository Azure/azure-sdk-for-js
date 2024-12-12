// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Base64 encode.
 *
 * @param content -
 */
export function base64encode(content: string): string {
  return btoa(content);
}

/**
 * Base64 decode.
 *
 * @param encodedString -
 */
export function base64decode(encodedString: string): string {
  return atob(encodedString);
}
