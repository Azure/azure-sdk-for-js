// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Converts a string representing binary content into a Uint8Array
 */
export function encodeBinaryContent(content: string): Uint8Array {
  return Buffer.from(content);
}

/**
 * Converts binary contenty to its string representation
 */
export function decodeBinaryContent(content: unknown): string {
  if (typeof content === "string") {
    return String(content);
  }

  if (ArrayBuffer.isView(content)) {
    return Buffer.from(content).toString();
  }

  return JSON.stringify(content);
}
