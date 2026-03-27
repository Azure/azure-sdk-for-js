// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StreamableMethod } from "@azure-rest/core-client";
import { createRestError } from "@azure-rest/core-client";

/**
 * Get the binary response body from a StreamableMethod, returning it as a Blob in browser environments and as a NodeJS.ReadableStream in Node.js environments. This function checks the response status against expected statuses and throws a RestError if the status is unexpected, optionally deserializing error details using a provided deserialization function.
 */
export async function getBinaryResponseBody(
  result: StreamableMethod,
  expectedStatuses: string[] = ["200"],
  deserializeError?: (error: any) => unknown,
): Promise<{ blobBody?: Promise<Blob>; readableStreamBody?: NodeJS.ReadableStream }> {
  const browserStream = await result.asBrowserStream();
  if (!expectedStatuses.includes(browserStream.status)) {
    const error = createRestError(browserStream);
    if (deserializeError) {
      error.details = deserializeError(browserStream.body);
    }

    throw error;
  }
  return { blobBody: new Response(browserStream.body).blob(), readableStreamBody: undefined };
}
