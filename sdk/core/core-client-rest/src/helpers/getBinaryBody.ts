// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Converts a string representing binary content into a Uint8Array
 */
export function stringToBinaryArray(content: string): Uint8Array {
  const arr = new Uint8Array(content.length);
  for (let i = 0; i < content.length; i++) {
    arr[i] = content.charCodeAt(i);
  }

  return arr;
}

/**
 * Converts binary content to its string representation
 */
export function binaryArrayToString(content: Uint8Array): string {
  let decodedBody = "";
  for (const element of content) {
    decodedBody += String.fromCharCode(element);
  }

  return decodedBody;
}
