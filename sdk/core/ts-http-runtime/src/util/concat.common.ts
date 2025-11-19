// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isWebReadableStream } from "./typeGuards.js";

/**
 * Drain the content of the given ReadableStream into a Blob.
 * The blob's content may end up in memory or on disk dependent on size.
 */
function drain(stream: ReadableStream<Uint8Array>): Promise<Blob> {
  return new Response(stream).blob();
}

async function toBlobPart(
  source: ReadableStream<Uint8Array> | Blob | Uint8Array,
): Promise<Blob | Uint8Array> {
  if (source instanceof Blob || source instanceof Uint8Array) {
    return source;
  }

  if (isWebReadableStream(source)) {
    return drain(source);
  } else {
    throw new Error(
      "Unsupported source type. Only Blob, Uint8Array, and ReadableStream are supported in browser.",
    );
  }
}

/**
 * Converts a Uint8Array to a Uint8Array<ArrayBuffer>.
 * @param source - The source Uint8Array.
 * @returns
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
type ConcatSource = ReadableStream<Uint8Array> | Blob | Uint8Array;

/**
 * Utility function that concatenates a set of binary inputs into one combined output.
 *
 * @param sources - array of sources for the concatenation
 * @returns - in Node, a (() =\> NodeJS.ReadableStream) which, when read, produces a concatenation of all the inputs.
 *           In browser, returns a `Blob` representing all the concatenated inputs.
 *
 * @internal
 */
export async function concat(
  sources: (ConcatSource | (() => ConcatSource))[],
): Promise<(() => NodeJS.ReadableStream) | Blob> {
  const parts = [];
  for (const source of sources) {
    const blobPart = await toBlobPart(typeof source === "function" ? source() : source);
    if (blobPart instanceof Blob) {
      parts.push(blobPart);
    } else {
      // Uint8Array
      parts.push(new Blob([arrayToArrayBuffer(blobPart)]));
    }
  }

  return new Blob(parts);
}
