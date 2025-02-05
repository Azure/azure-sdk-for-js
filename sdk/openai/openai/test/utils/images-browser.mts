// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineResponse } from "@azure/core-rest-pipeline";

interface Dimensions {
  width: number;
  height: number;
}

export async function getImageDimensionsFromResponse(
  response: PipelineResponse,
): Promise<Dimensions> {
  const blob = await response.blobBody;
  if (!blob) {
    throw new Error("Cannot find browser body");
  }
  const image = await createImageBitmap(blob);
  return { width: image.width, height: image.height };
}

export function getImageDimensionsFromString(data: string): Dimensions {
  // Extract width and height from bytes 16 - 23 of the base64 encoded string
  const header = atob(data.slice(0, 50)).slice(16, 24)
  const array = Uint8Array.from(header, c => c.charCodeAt(0))
  const dimensions = new DataView(array.buffer)

  return {
    width: dimensions.getInt32(0),
    height: dimensions.getInt32(4)
  }
}
