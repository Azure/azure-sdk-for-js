// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

/**
 * Encodes a string in base64 format.
 * @param value the string to encode
 */
export function encodeString(value: string): string {
  if (typeof Buffer === "undefined") {
    return btoa(value);
  } else {
    return Buffer.from(value).toString("base64");
  }
}

/**
 * Encodes a byte array in base64 format.
 * @param value the Uint8Aray to encode
 */
export function encodeByteArray(value: Uint8Array): string {
  if (typeof Buffer === "undefined") {
    return btoa(new TextDecoder().decode(value));
  } else {
    const bufferValue = (value instanceof Buffer) ? value : new Buffer(value);
    return bufferValue.toString("base64");
  }
}

/**
 * Decodes a base64 string into a byte array.
 * @param value the base64 string to decode
 */
export function decodeString(value: string): Uint8Array {
  if (typeof Buffer === "undefined") {
    return new TextEncoder().encode(atob(value));
  } else {
    return Buffer.from(value, "base64");
  }
}
