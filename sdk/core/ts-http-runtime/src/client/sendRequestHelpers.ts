// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineResponse } from "#platform/interfaces";

/**
 * Extracts the platform-specific response stream from a PipelineResponse.
 * On Node, this is the readableStreamBody. On browser/RN, this is the browserStreamBody.
 * @internal
 */
export function getStreamBody(response: PipelineResponse): NodeJS.ReadableStream | undefined {
  return response.readableStreamBody;
}

/**
 * Whether to request browser-style streaming from the HTTP client.
 * On Node this is false; on browser/RN this is true.
 * @internal
 */
export const enableBrowserStreams = false;
