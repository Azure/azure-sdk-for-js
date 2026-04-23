// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpResponse, StreamableMethod } from "@azure-rest/core-client";

/**
 * Resolves a StreamableMethod into a binary stream response using Node.js streaming.
 * Returns both the raw HttpResponse (for status/header inspection) and the readable stream body.
 * Error handling is left to the caller so that generated deserializers can apply
 * operation-specific error deserialization (per-status-code details, exception headers, etc.).
 */
export async function getBinaryStreamResponse(streamableMethod: StreamableMethod): Promise<
  HttpResponse & {
    blobBody?: Promise<Blob>;
    readableStreamBody?: NodeJS.ReadableStream;
  }
> {
  const response = await streamableMethod.asNodeStream();
  return {
    ...response,
    blobBody: undefined,
    readableStreamBody: response.body,
  };
}
