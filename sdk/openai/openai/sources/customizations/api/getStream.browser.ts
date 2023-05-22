// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StreamableMethod } from "@azure-rest/core-client";

declare const TextDecoder: any;

export async function* getStream<TResponse>(
  response: StreamableMethod<TResponse>
): AsyncIterable<string> {
  const stream = (await response.asBrowserStream()).body;
  if (!stream) throw new Error("No stream found in response. Did you enable the stream option?");
  const encoder = new TextDecoder();
  const reader = (stream as any).getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    yield encoder.decode(value);
  }
}
