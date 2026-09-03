// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpResponse, StreamableMethod } from "@azure-rest/core-client";
import type { NodeReadableStream } from "#platform/static-helpers/platform-types";
import { parseJsonOrText } from "./parse-json-or-text.js";

/**
 * Resolves a StreamableMethod into a binary stream response using Node.js streaming.
 * Returns both the raw HttpResponse (for status/header inspection) and the readable stream body.
 * Error handling is left to the caller so that generated deserializers can apply
 * operation-specific error deserialization (per-status-code details, exception headers, etc.).
 */
export async function getBinaryStreamResponse(streamableMethod: StreamableMethod): Promise<
  HttpResponse & {
    blobBody?: Promise<Blob>;
    readableStreamBody?: NodeReadableStream;
  }
> {
  const response = await streamableMethod.asNodeStream();
  if (!response.status.startsWith("2")) {
    const chunks: Buffer[] = [];
    if (response.body) {
      for await (const chunk of response.body) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
    }
    return {
      ...response,
      body: parseJsonOrText(Buffer.concat(chunks).toString("utf8")),
      blobBody: undefined,
      readableStreamBody: undefined,
    };
  }
  return {
    ...response,
    blobBody: undefined,
    readableStreamBody: response.body,
  };
}
