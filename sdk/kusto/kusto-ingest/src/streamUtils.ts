// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CompressionType, FileDescriptor, StreamDescriptor } from "./descriptors";
import fs from "fs";
import { PassThrough, Readable } from "stream";
import streamify from "stream-array";

export const fileToStream = (file: FileDescriptor | string): StreamDescriptor => {
  const fileDescriptor = file instanceof FileDescriptor ? file : new FileDescriptor(file);
  const streamFs = fs.createReadStream(fileDescriptor.filePath);
  const compressionType = fileDescriptor.zipped ? CompressionType.GZIP : CompressionType.None;
  return new StreamDescriptor(streamFs, fileDescriptor.sourceId, compressionType);
};

export const mergeStreams = (...streams: Readable[]): Readable => {
  let pass = new PassThrough();
  let waiting = streams.length;
  for (const stream of streams) {
    pass = stream.pipe(pass, { end: false });
    stream.once("end", () => --waiting === 0 && pass.emit("end"));
  }
  return pass;
};

export const tryStreamToArray = async (
  stream: Readable,
  maxBufferSize: number
): Promise<Buffer | Readable> => {
  return await new Promise<Buffer | Readable>((resolve, reject) => {
    const result: Buffer[] = [];
    const endListener = () => resolve(Buffer.concat(result));
    const dataHandler = (chunk: Buffer) => {
      try {
        result.push(chunk);
        if (result.reduce((sum, b) => sum + b.length, 0) > maxBufferSize) {
          stream.removeListener("data", dataHandler);
          stream.removeListener("end", endListener);
          resolve(mergeStreams(streamify(result), stream));
        }
      } catch (e) {
        reject(e);
      }
    };
    stream.on("data", dataHandler);
    stream.on("end", endListener);
  });
};
