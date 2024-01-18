// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpBrowserStreamResponse, HttpNodeStreamResponse } from "@azure-rest/core-client";

/**
 * Gets the schema definition from the response
 * @param response - The service response for a get schema by ID request.
 * @returns a string representing a schema definition
 */
export async function getSchemaDefinition<
  T extends {
    asNodeStream: () => Promise<HttpNodeStreamResponse>;
    asBrowserStream: () => Promise<HttpBrowserStreamResponse>;
  },
>(response: T): Promise<string> {
  return streamToText((await response.asBrowserStream()).body!);
}

export async function streamToText(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const buffers: Uint8Array[] = [];
  let length = 0;
  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        return new TextDecoder().decode(concatBuffers(buffers, length));
      }
      length += value.length;
      buffers.push(value);
    }
  } finally {
    reader.releaseLock();
  }
}

function concatBuffers(buffers: Uint8Array[], len?: number): Uint8Array {
  const length = len ?? getBuffersLength(buffers);
  const res = new Uint8Array(length);
  for (let i = 0, pos = 0; i < buffers.length; i++) {
    const buffer = buffers[i];
    res.set(buffer, pos);
    pos += buffer.length;
  }

  return res;
}

function getBuffersLength(buffers: Uint8Array[]): number {
  return buffers.reduce((acc, curr) => acc + curr.length, 0);
}
