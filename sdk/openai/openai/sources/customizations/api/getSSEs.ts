// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StreamableMethod } from "@azure-rest/core-client";
import { EventMessage, iterateSseStream } from "@azure/core-sse";

async function getStream<TResponse>(
  response: StreamableMethod<TResponse>
): Promise<AsyncIterable<Uint8Array>> {
  const stream = (await response.asNodeStream()).body;
  if (!stream) throw new Error("No stream found in response. Did you enable the stream option?");
  return stream as AsyncIterable<Uint8Array>;
}

export async function getSSEs(
  response: StreamableMethod<unknown>
): Promise<AsyncIterable<EventMessage>> {
  const chunkIterator = await getStream(response);
  return iterateSseStream(chunkIterator);
}
