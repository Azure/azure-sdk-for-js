// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineRequest, PipelineResponse } from "./interfacesWeb.js";

/**
 * Sets the streaming response body on a PipelineResponse.
 * On browser, sets browserStreamBody or blobBody depending on enableBrowserStreams.
 * @internal
 */
export function setStreamingResponse(
  response: PipelineResponse,
  bodyStream: ReadableStream<Uint8Array> | null,
  request: PipelineRequest,
  cleanup?: () => void,
): void {
  if (request.enableBrowserStreams) {
    response.browserStreamBody = bodyStream ?? undefined;
  } else {
    const responseStream = new Response(bodyStream);
    response.blobBody = responseStream.blob();
    cleanup?.();
  }
}
