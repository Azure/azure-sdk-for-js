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
  const stream = (await response.asBrowserStream()).body;
  if (!stream) throw new Error("No stream found in response. Did you enable the stream option?");
  return stream;
}
