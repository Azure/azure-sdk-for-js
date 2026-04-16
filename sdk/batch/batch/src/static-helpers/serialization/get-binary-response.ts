// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpResponse, StreamableMethod } from "@azure-rest/core-client";
import { Buffer } from "node:buffer";

/**
 * Gets a response type representing the given streamable response, using the stream methods
 * to bypass Core's default response handling. This works around an issue where binary bodies in Core
 * are coerced into UTF-8, regardless of whether the body is valid UTF-8 or not.
 */
export async function getBinaryResponse(
  streamableMethod: StreamableMethod,
): Promise<HttpResponse & { body?: Uint8Array }> {
  const response = await streamableMethod.asNodeStream();
  if (response.body === undefined) {
    return response as HttpResponse & { body?: Uint8Array };
  }
  const bufs: Buffer[] = [];
  for await (const buf of response.body) {
    bufs.push(Buffer.isBuffer(buf) ? buf : Buffer.from(buf));
  }

  return {
    ...response,
    body: Buffer.concat(bufs),
  };
}
