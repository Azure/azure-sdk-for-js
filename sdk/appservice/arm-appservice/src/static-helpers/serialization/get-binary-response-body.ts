// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StreamableMethod } from "@azure-rest/core-client";
import { createRestError } from "@azure-rest/core-client";

/**
 * Gets the binary response body from a StreamableMethod, returning it as a NodeJS.ReadableStream in Node.js environments. In browser environments, this function returns `undefined` for the stream and instead provides a `blobBody` that is a Promise resolving to a Blob, since browser environments do not support NodeJS.ReadableStream.
 */
export async function getBinaryResponseBody(
  result: StreamableMethod,
  expectedStatuses: string[] = ["200"],
  deserializeError?: (error: any) => unknown,
): Promise<{
  blobBody?: Promise<Blob>;
  readableStreamBody?: NodeJS.ReadableStream;
}> {
  const nodeStream = await result.asNodeStream();
  if (!expectedStatuses.includes(nodeStream.status)) {
    const error = createRestError(nodeStream);
    if (deserializeError) {
      error.details = deserializeError(nodeStream.body);
    }

    throw error;
  }
  return { blobBody: undefined, readableStreamBody: nodeStream.body };
}
