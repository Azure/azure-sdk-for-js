// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "node:stream";
import type { PipelineResponse } from "@azure/core-rest-pipeline";

/**
 * Reads the body a response streamed as text, as the HTTP client reads a body it doesn't stream, and
 * puts an unread copy of the body on the response. Returns undefined when the response streamed no
 * body.
 */
export async function readStreamedBody(response: PipelineResponse): Promise<string | undefined> {
  if (!response.readableStreamBody) {
    return undefined;
  }
  const chunks: Buffer[] = [];
  for await (const chunk of response.readableStreamBody) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  const body = Buffer.concat(chunks);
  response.readableStreamBody = Readable.from([body], { objectMode: false });
  return body.toString("utf8");
}
