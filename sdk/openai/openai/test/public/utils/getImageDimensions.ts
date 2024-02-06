// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse } from "@azure/core-rest-pipeline";

interface Dimensions {
  width: number;
  height: number;
}

export async function getImageDimensions(response: PipelineResponse): Promise<Dimensions> {
  async function getBufferFromResponse(): Promise<Buffer> {
    const stream = response.readableStreamBody;
    if (!stream) {
      throw new Error("Stream body is not found");
    }
    return new Promise<Buffer>((resolve, reject) => {
      const buffer: Buffer[] = [];
      stream.on("data", (chunk: Buffer) => {
        buffer.push(chunk);
      });
      stream.on("end", () => {
        resolve(Buffer.concat(buffer));
      });
      stream.on("error", (err) => {
        reject(`Error on getting buffer: ${err}`);
      });
    });
  }
  const buffer = await getBufferFromResponse();
  return { width: buffer.readInt32BE(16), height: buffer.readInt32BE(20) };
}
