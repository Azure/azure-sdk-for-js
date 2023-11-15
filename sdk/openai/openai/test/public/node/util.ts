// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthMethod } from "../utils/recordedClient.js";
import { PassThrough } from "node:stream";

export function getModel(authMethod: AuthMethod): string {
  return authMethod === "OpenAIKey" ? "whisper-1" : "whisper";
}

export function stretchWAV(file: Buffer, multiplier: number): NodeJS.ReadableStream {
  const chunkLen = 4;
  function readInt32Chunk(buf: Buffer, offset: number): number {
    return buf.subarray(offset, offset + chunkLen).readInt32LE();
  }
  const headerLen = 36;
  const data1Len = readInt32Chunk(file, headerLen + chunkLen);
  const data1Offset = headerLen + 2 * chunkLen;
  const data2Offset = data1Offset + data1Len + 2 * chunkLen;
  const data2Len = readInt32Chunk(file, data2Offset - chunkLen);
  file.writeInt32LE(data2Len * multiplier, data2Offset - chunkLen);
  const stream = new PassThrough();
  // write to the stream after the current call stack has cleared
  setTimeout(() => {
    stream.write(file.subarray(0, data2Offset + data2Len));
    for (let i = 1; i < multiplier; i++) {
      stream.write(file.subarray(data2Offset, data2Len));
    }
    stream.end();
  }, 0);
  return stream;
}
