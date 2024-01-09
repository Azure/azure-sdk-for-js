// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
