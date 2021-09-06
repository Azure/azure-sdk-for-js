// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { blobToUint8Array } from "./blobToUint8Array";

/**
 * @param input - Input to `deserialize`.
 * @returns Promise which completes with the input data as a Uint8Array.
 */
export async function toUint8Array(
  input: Uint8Array | Buffer | Blob | ReadableStream | NodeJS.ReadableStream
): Promise<Uint8Array> {
  if (isNodeJSReadableStream(input)) {
    return streamToBuffer(input);
  } else if (isWHATWGReadableStream(input)) {
    return readWHATWGStream(input);
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
  const buffers: Buffer[] = [];
  for await (const chunk of input) {
    if (Buffer.isBuffer(chunk)) {
      buffers.push(chunk);
    } else {
      buffers.push(Buffer.from(chunk));
    }
  }
  return Buffer.concat(buffers);
}

// WHATWG's ReadableStream spec supports async iteration: https://streams.spec.whatwg.org/#rs-asynciterator
// However, Chromium and TypeScript did not implement the support yet
// see https://bugs.chromium.org/p/chromium/issues/detail?id=929585&q=readablestream%20async&can=2
// and https://github.com/microsoft/TypeScript/issues/29867
async function readWHATWGStream(stream: ReadableStream): Promise<Buffer> {
  const reader = stream.getReader();
  const buffers: Buffer[] = [];
  async function pump(): Promise<Buffer> {
    return reader.read().then(({ value, done }) => {
      if (done) {
        return Buffer.concat(buffers);
      }
      if (Buffer.isBuffer(value)) {
        buffers.push(value);
      } else {
        buffers.push(Buffer.from(value));
      }
      return pump();
    });
  }
  return pump();
}
