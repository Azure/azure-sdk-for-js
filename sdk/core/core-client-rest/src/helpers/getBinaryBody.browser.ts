// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Converts a string representing binary content into a Uint8Array
 */
export function encodeBinaryContent(content: string): Uint8Array {
  const arr = new Uint8Array(content.length);
  for (let i = 0; i < content.length; i++) {
    arr[i] = content.charCodeAt(i);
  }

  return arr;
}

/**
 * Converts binary contenty to its string representation
 */
export function decodeBinaryContent(content: unknown): string {
  if (typeof content === "string") {
    return String(content);
  }

  if (content instanceof Uint8Array) {
    let decodedBody = "";
    for (const element of content) {
      decodedBody += String.fromCharCode(element);
    }

    return decodedBody;
  }

  return JSON.stringify(content);
}
