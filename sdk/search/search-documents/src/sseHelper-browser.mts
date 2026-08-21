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

  if (response.status !== "200" || !response.body) {
    throw createRestError(response);
  }

  return createSseStream(response.body);
}
