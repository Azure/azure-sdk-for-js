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

export async function getSSEs(
  response: StreamableMethod<unknown>
): Promise<AsyncIterable<EventMessage>> {
  const chunkIterator = await getStream(response);
  return iterateSseStream(chunkIterator);
}

async function getStream<TResponse>(
  response: StreamableMethod<TResponse>
): Promise<AsyncIterable<Uint8Array>> {
  const stream = (await response.asNodeStream()).body;
  if (!stream) throw new Error("No stream found in response. Did you enable the stream option?");
  return stream as AsyncIterable<Uint8Array>;
}
