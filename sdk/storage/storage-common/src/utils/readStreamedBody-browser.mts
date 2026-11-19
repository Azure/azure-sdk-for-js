// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineResponse } from "@azure/core-rest-pipeline";

/**
 * Reads the body a response streamed as text, and puts an unread copy of the body on the response.
 * Returns undefined when the response streamed no body.
 */
export async function readStreamedBody(response: PipelineResponse): Promise<string | undefined> {
  if (response.browserStreamBody) {
    const [body, copy] = response.browserStreamBody.tee();
    response.browserStreamBody = copy;
    return new Response(body).text();
  }
  return (await response.blobBody)?.text();
}
