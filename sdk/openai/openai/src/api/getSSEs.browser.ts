// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { StreamableMethod } from "@azure-rest/core-client";
import { EventMessage, iterateSseStream } from "@azure/core-sse";
import { wrapError } from "./util.js";

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
    throw wrapError(() => JSON.parse(text).error, "Error parsing response body");
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
