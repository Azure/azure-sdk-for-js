// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "node:stream";
import type { PipelineRequest, PipelineResponse } from "#platform/interfaces";

/**
 * Sets the streaming response body on a PipelineResponse.
 * On Node, converts the web ReadableStream from fetch() to a Node.js Readable stream.
 * @internal
 */
export function setStreamingResponse(
  response: PipelineResponse,
  bodyStream: ReadableStream<Uint8Array> | null,
  _request: PipelineRequest,
  cleanup?: () => void,
): void {
  if (bodyStream) {
    response.readableStreamBody = Readable.fromWeb(
      bodyStream as import("node:stream/web").ReadableStream,
    );
  }
  cleanup?.();
}
