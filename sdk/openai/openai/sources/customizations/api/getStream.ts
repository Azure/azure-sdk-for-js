// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StreamableMethod } from "@azure-rest/core-client";

export async function* getStream<TResponse>(
  response: StreamableMethod<TResponse>
): AsyncIterable<string> {
  const stream = (await response.asNodeStream()).body;
  if (!stream) throw new Error("No stream found in response. Did you enable the stream option?");
  for await (const chunk of stream) {
    yield chunk.toString();
  }
}
