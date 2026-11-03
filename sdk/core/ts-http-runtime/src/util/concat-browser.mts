// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isWebReadableStream } from "#platform/typeGuards";

/**
 * Drain the content of the given ReadableStream into a Blob.
 */
function drain(stream: ReadableStream<Uint8Array<ArrayBuffer>>): Promise<Blob> {
  return new Response(stream).blob();
}

async function toBlobPart(
  source: ReadableStream<Uint8Array<ArrayBuffer>> | Uint8Array<ArrayBuffer> | Blob,
): Promise<Blob | Uint8Array<ArrayBuffer>> {
  if (source instanceof Blob || source instanceof Uint8Array) {
    return source;
  }

  if (isWebReadableStream(source)) {
    return drain(source);
  }

  throw new Error(
    "Unsupported source type. Only Blob, Uint8Array, and ReadableStream are supported in browser.",
  );
}

/**
 * Converts a Uint8Array to a Uint8Array<ArrayBuffer>.
 */
function arrayToArrayBuffer(source: Uint8Array): Uint8Array<ArrayBuffer> {
  if ("resize" in source.buffer) {
    // ArrayBuffer
    return source as Uint8Array<ArrayBuffer>;
  }
  // SharedArrayBuffer
  return source.map((x) => x);
}

/**
 * Accepted binary data types for concat
 *
 * @internal
 */
export type ConcatSource = ReadableStream<Uint8Array<ArrayBuffer>> | Uint8Array<ArrayBuffer> | Blob;

/**
 * Utility function that concatenates a set of binary inputs into one combined output.
 *
 * @param sources - array of sources for the concatenation
 * @returns a `Blob` representing all the concatenated inputs.
 *
 * @internal
 */
export async function concat(sources: (ConcatSource | (() => ConcatSource))[]): Promise<Blob> {
  const parts: Blob[] = [];
  for (const source of sources) {
    const blobPart = await toBlobPart(typeof source === "function" ? source() : source);
    if (blobPart instanceof Blob) {
      parts.push(blobPart);
    } else {
      parts.push(new Blob([arrayToArrayBuffer(blobPart)]));
    }
  }

  return new Blob(parts);
}
