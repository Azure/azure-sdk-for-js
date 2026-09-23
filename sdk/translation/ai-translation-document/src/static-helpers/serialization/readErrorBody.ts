// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpResponse } from "@azure-rest/core-client";
import type { NodeReadableStream } from "#platform/static-helpers/platform-types";

/**
 * Reads and deserializes the error payload of a response whose success body was
 * requested as a binary stream.
 *
 * For binary-stream operations the service error payload is delivered through the
 * streamed (`readableStreamBody`) or blob (`blobBody`) body rather than a parsed
 * `body`, so it must be consumed and parsed here. Without this, `createRestError`
 * sees an unread stream, loses the real error code/message, and leaks the stream.
 *
 * NOTE: This is a package customization that works around a gap in the modular
 * emitter (`@azure-tools/typespec-ts`), which does not deserialize error bodies
 * for binary-stream operations. It can be removed once that is fixed upstream.
 */
export async function readBinaryErrorBody(
  response: HttpResponse & {
    blobBody?: Promise<Blob>;
    readableStreamBody?: NodeReadableStream;
  },
): Promise<unknown> {
  let text: string | undefined;

  if (response.blobBody) {
    text = await (await response.blobBody).text();
  } else if (response.readableStreamBody) {
    text = await readStreamToString(response.readableStreamBody);
  }

  if (text === undefined || text.length === 0) {
    return response.body;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function readStreamToString(stream: NodeReadableStream): Promise<string> {
  const chunks: Uint8Array[] = [];
  let total = 0;
  for await (const chunk of stream as AsyncIterable<Uint8Array | string>) {
    const bytes = typeof chunk === "string" ? new TextEncoder().encode(chunk) : chunk;
    chunks.push(bytes);
    total += bytes.length;
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.length;
  }
  return new TextDecoder().decode(merged);
}
