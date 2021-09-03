// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { blobToUint8Array } from "./blob";

// TypeScript is still behind on making their ReadableStream type iterable, so we need to use this hack
// see https://github.com/microsoft/TypeScript/issues/29867
// and https://streams.spec.whatwg.org/#rs-asynciterator
declare global {
  interface ReadableStream<R = any> {
    [Symbol.asyncIterator](options?: { preventCancel?: boolean }): AsyncIterableIterator<R>;
  }
}

/**
 * @param input - Input to `deserialize`.
 * @returns Promise which completes with the input data as a Uint8Array.
 */
export async function toUint8Array(
  input: Uint8Array | Buffer | Blob | ReadableStream | NodeJS.ReadableStream
): Promise<Uint8Array> {
  if (isWHATWGReadableStream(input)) {
    const buffer: any[] = [];
    for await (const chunk of input) {
      if (Array.isArray(chunk)) {
        buffer.push(...chunk);
      } else {
        buffer.push(chunk);
      }
    }
    return Buffer.isBuffer(buffer[0]) ? Buffer.concat(buffer) : new Uint8Array(buffer);
  } else if (isNodeJSReadableStream(input)) {
    const buffer: any[] = [];
    for await (const chunk of input) {
      buffer.push(chunk);
    }
    return Buffer.isBuffer(buffer[0]) ? Buffer.concat(buffer) : new Uint8Array(buffer);
    // If this is not a Uint8Array or a buffer, assume it's a blob and retrieve an ArrayBuffer from the blob.
  } else if ((input as any).byteLength === undefined) {
    return await blobToUint8Array(input as Blob);
  } else return input as Uint8Array;
}

function isWHATWGReadableStream(input: any): input is ReadableStream {
  return input && typeof input.pipeThrough === "function";
}

function isNodeJSReadableStream(input: any): input is NodeJS.ReadableStream {
  return input && typeof input.pipe === "function";
}
