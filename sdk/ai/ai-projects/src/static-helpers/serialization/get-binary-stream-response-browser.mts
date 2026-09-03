// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpResponse, StreamableMethod } from "@azure-rest/core-client";
import type { NodeReadableStream } from "../platform-types-browser.mjs";
import { parseJsonObject } from "./parse-json-object.js";

/**
 * Resolves a StreamableMethod into a binary stream response using browser streaming.
 * Returns both the raw HttpResponse (for status/header inspection) and a blobBody Promise.
 * Error handling is left to the caller so that generated deserializers can apply
 * operation-specific error deserialization (per-status-code details, exception headers, etc.).
 */
export async function getBinaryStreamResponse(streamableMethod: StreamableMethod): Promise<
  HttpResponse & {
    blobBody?: Promise<Blob>;
    readableStreamBody?: NodeReadableStream;
  }
> {
  const response = await streamableMethod.asBrowserStream();
  if (!response.status.startsWith("2")) {
    const body = response.body
      ? parseJsonObject(await new Response(response.body).text())
      : undefined;
    return {
      ...response,
      body,
      blobBody: undefined,
      readableStreamBody: undefined,
    };
  }
  return {
    ...response,
    blobBody: new Response(response.body).blob(),
    readableStreamBody: undefined,
  };
}
