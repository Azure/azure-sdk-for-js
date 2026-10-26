// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StreamableMethod } from "@azure-rest/core-client";
import type { EventMessage } from "@azure/core-sse";
import { createSseStream } from "@azure/core-sse";
import { Buffer } from "node:buffer";
import type { IncomingMessage } from "node:http";
import { createSseError } from "./sseError.js";

/**
 * Issues the given streamable request and exposes the server-sent event response as an async
 * iterable of raw event messages.
 */
export async function getSseStream(
  streamableMethod: StreamableMethod,
): Promise<AsyncIterable<EventMessage>> {
  const response = await streamableMethod.asNodeStream();

  if (response.status !== "200") {
    if (!response.body) {
      throw createSseError(response);
    }

    const chunks: Buffer[] = [];
    for await (const chunk of response.body) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    const body = Buffer.concat(chunks).toString("utf8");
    throw createSseError(response, body);
  }

  if (!response.body) {
    throw createSseError(response);
  }

  return createSseStream(response.body as IncomingMessage);
}
