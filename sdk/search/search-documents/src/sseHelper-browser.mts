// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StreamableMethod } from "@azure-rest/core-client";
import { createRestError } from "@azure-rest/core-client";
import type { EventMessage } from "@azure/core-sse";
import { createSseStream } from "@azure/core-sse";

/**
 * Issues the given streamable request and exposes the server-sent event response as an async
 * iterable of raw event messages.
 */
export async function getSseStream(
  streamableMethod: StreamableMethod,
): Promise<AsyncIterable<EventMessage>> {
  const response = await streamableMethod.asBrowserStream();

  if (response.status !== "200") {
    if (!response.body) {
      throw createRestError(response);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf8");
    const chunks: string[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      chunks.push(decoder.decode(value, { stream: true }));
    }
    chunks.push(decoder.decode());
    reader.releaseLock();

    const body = chunks.join("");
    let parsedError: unknown;
    try {
      parsedError = JSON.parse(body);
    } catch {
      throw createRestError(body, { ...response, body });
    }
    throw createRestError({ ...response, body: parsedError });
  }

  if (!response.body) {
    throw createRestError(response);
  }

  return createSseStream(response.body);
}
