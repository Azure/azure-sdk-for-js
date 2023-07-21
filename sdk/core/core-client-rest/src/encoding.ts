import { isNode } from "@azure/core-util";

/**
 * Decodes a Uint8Array into a Base64 string.
 * @internal
 */
export function uint8ArayToBase64(bytes: Uint8Array): string {
  if (isNode) {
    return Buffer.from(bytes).toString("base64");
  } else {
    return btoa(String.fromCharCode.apply(null, bytes as any as number[]));
  }
}

/**
 * Decodes a Uint8Array into a javascript string.
 * @internal
 */
export function uint8ArayToString(bytes: Uint8Array): string {
  if (isNode) {
    return Buffer.from(bytes).toString();
  } else {
    return btoa(String.fromCharCode.apply(null, bytes as any as number[]));
  }
}

/**
 * Encodes a JavaScript string into a Uint8Array.
 * @internal
 */
export function stringToUint8Array(value: string): Uint8Array {
  if (isNode) {
    return Buffer.from(value);
  } else {
    return new TextEncoder().encode(value);
  }
}

/**
 * Encodes a Base64 string into a Uint8Array.
 * @internal
 */
export function base64ToUint8Array(value: string): Uint8Array {
  if (isNode) {
    return Buffer.from(value, "base64");
  } else {
    return Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
  }
}

/**
 * Decodes a base64 string into a string.
 * @param value - the base64 string to decode
 * @internal
 */
export function base64StringToString(value: string): string {
  return Buffer.from(value, "base64").toString();
}
