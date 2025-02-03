// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Base64 encode.
 *
 * @internal
 * @param content - The string to be encoded
 * @returns encoded string
 */
export function base64encode(content: string): string {
  const utf8Bytes = new TextEncoder().encode(content);
  const binaryString = String.fromCharCode(...utf8Bytes);
  return btoa(binaryString);
}

/**
 * Base64 decode.
 *
 * @internal
 * @param encodedString - The encoded string
 * @returns decoded string
 */
export function base64decode(encodedString: string): string {
  const binaryString = atob(encodedString);
  const utf8Bytes = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(utf8Bytes);
}
