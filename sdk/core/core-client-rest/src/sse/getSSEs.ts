// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventMessage, HttpResponse } from "../common";
import { toSSE } from "./sse";

export async function getSSEs(response: HttpResponse): Promise<AsyncIterable<EventMessage>> {
  const chunkIterator = await getStream(response);
  return toSSE(chunkIterator);
}

async function getStream(response: HttpResponse): Promise<AsyncIterable<Uint8Array>> {
  const stream = response.body;
  if (!stream) throw new Error("No stream found in response");
  return stream as AsyncIterable<Uint8Array>;
}
