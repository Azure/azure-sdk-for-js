// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PipelineResponse } from "@azure/core-rest-pipeline";

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
