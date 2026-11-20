// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineResponse } from "@azure/core-rest-pipeline";

/**
 * Returns undefined: React Native's `Blob` can't be read as text, so the body a response streamed
 * is left alone.
 */
export async function readStreamedBody(_response: PipelineResponse): Promise<string | undefined> {
  return undefined;
}
