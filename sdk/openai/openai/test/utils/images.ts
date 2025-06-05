// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineResponse } from "@azure/core-rest-pipeline";

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
    buffer.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(buffer);
}

export async function getImageDimensionsFromResponse(
  response: PipelineResponse,
): Promise<Dimensions> {
  const buffer = await getResponseBuffer(response);
  return { width: buffer.readInt32BE(16), height: buffer.readInt32BE(20) };
}

export function getImageDimensionsFromString(data: string): Dimensions {
  // Width in PNG is byte 16 - 19
  const actualWidth = Buffer.from(data, "base64").readUInt32BE(16);
  // Height in PNG is byte 20 - 23
  const actualHeight = Buffer.from(data, "base64").readUInt32BE(20);
  return { width: actualWidth, height: actualHeight };
}
