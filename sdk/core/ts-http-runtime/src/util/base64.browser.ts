// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

declare global {
  // stub these out for the browser
  function btoa(input: string): string;
  function atob(input: string): string;
}

/**
 * Converts a base64 string into a byte array.
 * @param content - The base64 string to convert.
 * @internal
 */
export function base64ToBytes(content: string): Uint8Array {
  if (typeof atob !== "function") {
    throw new Error(`Your browser environment is missing the global "atob" function.`);
  }

  const binary = atob(content);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

/**
 * Converts an ArrayBuffer to base64 string.
 * @param buffer - Raw binary data.
 * @internal
 */
export function bufferToBase64(buffer: ArrayBuffer): string {
  if (typeof btoa !== "function") {
    throw new Error(`Your browser environment is missing the global "btoa" function.`);
  }

  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}
