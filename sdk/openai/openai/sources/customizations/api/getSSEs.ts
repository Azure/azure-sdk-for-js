// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StreamableMethod } from "@azure-rest/core-client";
import { EventMessage, onSSE } from "./sse.js";
import { PassThrough } from "stream";

export async function getStream<TResponse>(
  response: StreamableMethod<TResponse>
): Promise<AsyncIterable<Uint8Array>> {
  const stream = (await response.asNodeStream()).body;
  if (!stream) throw new Error("No stream found in response. Did you enable the stream option?");
  return stream as AsyncIterable<Uint8Array>;
}

export async function getSSEs(
  response: StreamableMethod<unknown>,
  options: { onError?: (reason: any) => void } = {}
): Promise<AsyncIterable<EventMessage>> {
  const stream = new PassThrough({ objectMode: true });
  function onMessage(msg: EventMessage): void {
    stream.write(msg);
  }
  // eslint-disable-next-line promise/catch-or-return
  onSSE(await getStream(response), onMessage)
    .catch(options.onError)
    .finally(() => stream.end());
  return stream;
}
