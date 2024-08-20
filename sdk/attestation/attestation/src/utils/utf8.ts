// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// TextDecoder and TextEncoder are in the global namespace for Node version 11 and
// higher, but before that, they were in the "util" namespace. If we're running
// under node ("Buffer" is defined), then check to see if the global namespace version
// of the decoders are present, if not, import them from the util namespace.
const decoder =
  typeof Buffer === "undefined"
    ? // eslint-disable-next-line @typescript-eslint/no-require-imports
      new (TextDecoder ?? require("util").TextDecoder)("ascii")
    : undefined;

const encoder =
  typeof Buffer === "undefined"
    ? // eslint-disable-next-line @typescript-eslint/no-require-imports
      new (TextEncoder ?? require("util").TextEncoder)("ascii")
    : undefined;

const decode: (buffer: ArrayBuffer) => string = decoder
  ? (buffer) => decoder.decode(buffer)
  : (buffer) => (buffer as Buffer).toString("ascii");

const encode: (str: string) => Uint8Array = encoder
  ? (str) => encoder.encode(str)
  : (str) => Buffer.from(str, "utf8");

/**
 * Converts a string into a utf8 encoded byte array.
 * @param content - The utf8 string to convert.
 * @internal
 */
export function stringToBytes(content: string): Uint8Array {
  return encode(content);
}

/**
 * Converts a utf8 string into a byte array.
 * @param content - The utf8 string to convert.
 * @internal
 */
export function bytesToString(content: Uint8Array): string {
  return decode(content);
}
