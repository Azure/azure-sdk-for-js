// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Browser-compatible utility functions for handling binary data.
 * These functions work in both Node.js and browser environments.
 */

/**
 * Converts various input types to a Uint8Array.
 * Works in both Node.js and browser environments.
 */
export function toUint8Array(input: unknown): Uint8Array {
  if (input instanceof Uint8Array) {
    return input;
  }
  if (typeof input === "string") {
    // Convert binary string to Uint8Array
    const bytes = new Uint8Array(input.length);
    for (let i = 0; i < input.length; i++) {
      bytes[i] = input.charCodeAt(i);
    }
    return bytes;
  }
  if (ArrayBuffer.isView(input)) {
    return new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
  }
  if (input instanceof ArrayBuffer) {
    return new Uint8Array(input);
  }
  if (typeof input === "number") {
    return new Uint8Array([input]);
  }
  throw new Error(`Cannot convert ${typeof input} to Uint8Array`);
}

/**
 * Concatenates multiple Uint8Arrays into a single Uint8Array.
 * Browser-compatible alternative to Buffer.concat().
 */
export function concatUint8Arrays(arrays: Uint8Array[]): Uint8Array {
  const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

/**
 * Checks if two Uint8Arrays are equal.
 * Browser-compatible alternative to Buffer.equals().
 */
export function uint8ArrayEquals(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/**
 * Converts a Uint8Array to a hex string.
 * Browser-compatible alternative to Buffer.toString("hex").
 */
export function toHexString(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * PNG magic bytes signature.
 */
export const PNG_MAGIC = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/**
 * JPEG magic bytes signature (first 3 bytes).
 */
export const JPEG_MAGIC = new Uint8Array([0xff, 0xd8, 0xff]);

/**
 * WEBP RIFF header.
 */
export const WEBP_RIFF = new Uint8Array([0x52, 0x49, 0x46, 0x46]); // "RIFF"
export const WEBP_SIGNATURE = new Uint8Array([0x57, 0x45, 0x42, 0x50]); // "WEBP"

/**
 * Checks if the given bytes represent a PNG image.
 */
export function isPng(bytes: Uint8Array): boolean {
  return uint8ArrayEquals(bytes.subarray(0, 8), PNG_MAGIC);
}

/**
 * Checks if the given bytes represent a JPEG image.
 */
export function isJpeg(bytes: Uint8Array): boolean {
  return uint8ArrayEquals(bytes.subarray(0, 3), JPEG_MAGIC);
}

/**
 * Checks if the given bytes represent a WebP image.
 */
export function isWebp(bytes: Uint8Array): boolean {
  return (
    uint8ArrayEquals(bytes.subarray(0, 4), WEBP_RIFF) &&
    uint8ArrayEquals(bytes.subarray(8, 12), WEBP_SIGNATURE)
  );
}

/**
 * GZIP magic bytes signature.
 */
export const GZIP_MAGIC = new Uint8Array([0x1f, 0x8b]);

/**
 * Checks if the given bytes represent gzip-compressed data.
 */
export function isGzip(bytes: Uint8Array): boolean {
  return uint8ArrayEquals(bytes.subarray(0, 2), GZIP_MAGIC);
}

/**
 * Decompresses gzip-compressed data using the browser-native DecompressionStream
 * or Node.js zlib. Returns the original data if not gzip-compressed.
 */
export async function decompressIfGzip(bytes: Uint8Array): Promise<Uint8Array> {
  if (!isGzip(bytes)) {
    return bytes;
  }

  // Use DecompressionStream if available (modern browsers and Node.js 18+)
  if (typeof DecompressionStream !== "undefined") {
    const ds = new DecompressionStream("gzip");
    const writer = ds.writable.getWriter();
    // Create a new ArrayBuffer copy to avoid SharedArrayBuffer issues
    const buffer = new Uint8Array(bytes).buffer;
    writer.write(new Uint8Array(buffer));
    writer.close();

    const reader = ds.readable.getReader();
    const chunks: Uint8Array[] = [];
    let result = await reader.read();
    while (!result.done) {
      chunks.push(result.value);
      result = await reader.read();
    }
    return concatUint8Arrays(chunks);
  }

  // Fallback for older Node.js versions
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const zlib = await import("zlib");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { promisify } = await import("util");
  const gunzip = promisify(zlib.gunzip);
  const result = await gunzip(Buffer.from(bytes));
  return new Uint8Array(result);
}

/**
 * Collects all chunks from an async iterable into a single Uint8Array.
 * Works with both Node.js streams and browser ReadableStreams.
 */
export async function collectStreamToUint8Array(
  stream: AsyncIterable<unknown>,
): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(toUint8Array(chunk));
  }
  return concatUint8Arrays(chunks);
}
