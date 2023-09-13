// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StreamableMethod } from "@azure-rest/core-client";
import { EventMessage, iterateSseStream } from "@azure/core-sse";

export async function getSSEs(
  response: StreamableMethod<unknown>
): Promise<AsyncIterable<EventMessage>> {
  const iter = await getStream(response);
  return iterateSseStream(iter);
}

async function getStream<TResponse>(
  response: StreamableMethod<TResponse>
): Promise<ReadableStream<Uint8Array>> {
  const { body, status } = await response.asBrowserStream();
  if (status !== "200" && body !== undefined) {
    const text = await streamToText(body);
    throw JSON.parse(text).error;
  }
  if (!body) throw new Error("No stream found in response. Did you enable the stream option?");
  return body;
}

async function streamToText(stream: ReadableStream<Uint8Array>): Promise<string> {
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

function getBuffersLength(buffers: Uint8Array[]): number {
  return buffers.reduce((acc, curr) => acc + curr.length, 0);
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
