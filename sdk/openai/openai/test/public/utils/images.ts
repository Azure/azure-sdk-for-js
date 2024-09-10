// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PipelineResponse } from "@azure/core-rest-pipeline";

export interface Dimensions {
  width: number;
  height: number;
}

async function getResponseBuffer(response: PipelineResponse): Promise<Buffer> {
  const stream = response.readableStreamBody;
  if (!stream) {
    throw new Error("Stream body is not found");
  }
  const buffer: Buffer[] = [];
  for await (const chunk of stream) {
    buffer.push(Buffer.from(chunk));
  }
  return Buffer.concat(buffer);
}

export async function getImageDimensionsFromResponse(
  response: PipelineResponse,
): Promise<Dimensions> {
  const buffer = await getResponseBuffer(response);
  return { width: buffer.readInt32BE(16), height: buffer.readInt32BE(20) };
}
