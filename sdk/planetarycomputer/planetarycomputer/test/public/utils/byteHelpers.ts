// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Browser-compatible utility functions for handling binary data.
 * Matches the pattern from the old JS PR's byteHelpers.ts.
 */

/** PNG magic bytes: 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A */
export const PNG_MAGIC = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/** GZIP magic bytes signature. */
export const GZIP_MAGIC = new Uint8Array([0x1f, 0x8b]);

/**
 * Converts various input types to a Uint8Array.
 * Works in both Node.js and browser environments.
 * Handles raw responses with blobBody/readableStreamBody from the generated SDK.
 */
export async function toUint8Array(input: unknown): Promise<Uint8Array> {
  if (input instanceof Uint8Array) {
    return input;
  }
  if (typeof input === "string") {
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
  // Handle generated SDK response with body, blobBody, or readableStreamBody
  if (typeof input === "object" && input !== null) {
    const obj = input as Record<string, any>;
    // Check body first — the pipeline may have already consumed the stream
    // and placed the result in body (e.g. WMTS gzip-decoded XML)
    if (obj.body instanceof Uint8Array || obj.body instanceof ArrayBuffer) {
      return toUint8Array(obj.body);
    }
    if (obj.blobBody) {
      const blob: Blob = await obj.blobBody;
      const arrayBuffer = await blob.arrayBuffer();
      return new Uint8Array(arrayBuffer);
    }
    if (obj.readableStreamBody) {
      const stream = obj.readableStreamBody as NodeJS.ReadableStream;
      const chunks: Uint8Array[] = [];
      for await (const chunk of stream) {
        chunks.push(typeof chunk === "string" ? new TextEncoder().encode(chunk) : chunk);
      }
      return concatUint8Arrays(chunks);
    }
    // Fallback for other body types (string, etc.)
    if (obj.body !== undefined) {
      return toUint8Array(obj.body);
    }
  }
  throw new Error(
    `Cannot convert ${typeof input} to Uint8Array (constructor: ${(input as any)?.constructor?.name}, keys: ${typeof input === "object" && input !== null ? Object.keys(input).join(",") : "n/a"})`,
  );
}

/**
 * Checks if two Uint8Arrays are equal.
 */
export function uint8ArrayEquals(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/**
 * Checks whether the given byte array starts with the PNG magic bytes.
 */
export function isPng(data: Uint8Array): boolean {
  return uint8ArrayEquals(data.subarray(0, 8), PNG_MAGIC);
}

/**
 * Checks if the given bytes represent gzip-compressed data.
 */
export function isGzip(bytes: Uint8Array): boolean {
  return uint8ArrayEquals(bytes.subarray(0, 2), GZIP_MAGIC);
}

/**
 * Concatenates multiple Uint8Arrays into a single Uint8Array.
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
 * Decompresses gzip-compressed data. Returns original data if not gzip.
 */
export async function decompressIfGzip(bytes: Uint8Array): Promise<Uint8Array> {
  if (!isGzip(bytes)) {
    return bytes;
  }
  const ds = new DecompressionStream("gzip");
  const writer = ds.writable.getWriter();
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
