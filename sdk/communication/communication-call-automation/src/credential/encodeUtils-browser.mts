// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const encodeUTF8 = (str: string): Uint8Array<ArrayBuffer> => new TextEncoder().encode(str);

export function encodeUTF8fromBase64(str: string): Uint8Array<ArrayBuffer> {
  if (typeof atob !== "function") {
    throw new Error("Your browser environment is missing the global `atob` function");
  }
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export function encodeBase64(value: ArrayBuffer): string {
  if (typeof btoa !== "function") {
    throw new Error("Your browser environment is missing the global `btoa` function");
  }
  const bytes = new Uint8Array(value);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}
