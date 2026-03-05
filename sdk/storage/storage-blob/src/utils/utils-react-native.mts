// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export async function streamToBuffer(
  _stream: NodeJS.ReadableStream,
  _buffer: Buffer,
  _offset: number,
  _end: number,
  _encoding?: BufferEncoding,
): Promise<void> {
  throw new Error("streamToBuffer is not supported in React Native.");
}

export async function streamToBuffer2(
  _stream: NodeJS.ReadableStream,
  _buffer: Buffer,
  _encoding?: BufferEncoding,
): Promise<number> {
  throw new Error("streamToBuffer2 is not supported in React Native.");
}

export async function readStreamToLocalFile(
  _rs: NodeJS.ReadableStream,
  _file: string,
): Promise<void> {
  throw new Error("readStreamToLocalFile is not supported in React Native.");
}

export const fsStat = async function stat(
  _path: string,
): Promise<{ size: number }> {
  throw new Error("fsStat is not supported in React Native.");
};

export const fsCreateReadStream = function createReadStream(
  _path: string,
  _options?: { autoClose?: boolean; end?: number; start?: number },
): NodeJS.ReadableStream {
  throw new Error("fsCreateReadStream is not supported in React Native.");
};
