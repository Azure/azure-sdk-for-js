// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineResponse } from "../interfacesReactNative.js";

/**
 * Extracts the platform-specific response stream from a PipelineResponse.
 * @internal
 */
export function getStreamBody(response: PipelineResponse): ReadableStream<Uint8Array> | undefined {
  return response.browserStreamBody;
}

/**
 * Whether to request browser-style streaming from the HTTP client.
 * @internal
 */
export const enableBrowserStreams = true;
