// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "node:stream";
import { buffer } from "node:stream/consumers";
import type { PipelineResponse } from "@azure/core-rest-pipeline";

/**
 * Reads the body a response streamed as text, as the HTTP client reads a body it doesn't stream, and
 * puts an unread copy of the body on the response. Returns undefined when the response streamed no
 * body. The read is stopped when it takes longer than the request's `timeout`.
 */
export async function readStreamedBody(response: PipelineResponse): Promise<string | undefined> {
  const stream = response.readableStreamBody;
  if (!stream) {
    return undefined;
  }
  // The HTTP client stops timing the request once it returns a streamed response.
  const timeout = response.request.timeout;
  const timer =
    timeout > 0
      ? setTimeout(() => {
          (stream as { destroy?(error?: Error): void }).destroy?.(
            new Error(`Reading the response body took longer than ${timeout} ms.`),
          );
        }, timeout)
      : undefined;
  try {
    const body = await buffer(stream);
    response.readableStreamBody = Readable.from([body], { objectMode: false });
    return body.toString("utf8");
  } finally {
    clearTimeout(timer);
  }
}
