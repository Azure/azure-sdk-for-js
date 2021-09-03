// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { blobToUint8Array } from "./blobToUint8Array";

// TypeScript is still behind on making their ReadableStream type iterable, so we need to use this hack
// see https://github.com/microsoft/TypeScript/issues/29867
// and https://streams.spec.whatwg.org/#rs-asynciterator
// eslint-disable-next-line @azure/azure-sdk/ts-no-namespaces
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
    return streamToBuffer(input);
  } else if (isNodeJSReadableStream(input)) {
    return streamToBuffer(input);
  } else if ((typeof Blob === "function" || typeof Blob === "object") && input instanceof Blob) {
    return blobToUint8Array(input);
  } else return input as Uint8Array;
}

function isWHATWGReadableStream(input: any): input is ReadableStream {
  return input && typeof input.pipeThrough === "function";
}

function isNodeJSReadableStream(input: any): input is NodeJS.ReadableStream {
  return input && typeof input.pipe === "function";
}

async function streamToBuffer(input: {
  [Symbol.asyncIterator](): AsyncIterableIterator<any>;
}): Promise<Buffer> {
  const buffer: Buffer[] = [];
  for await (const chunk of input) {
    if (Buffer.isBuffer(chunk)) {
      buffer.push(chunk);
    } else {
      buffer.push(Buffer.from(chunk));
    }
  }
  return Buffer.concat(buffer);
}
