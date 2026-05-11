// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NodeBuffer, NodeReadableStream } from "@azure/core-rest-pipeline";

/**
 * Convert a Browser Blob object into ArrayBuffer.
 *
 * @param blob -
 */
export async function blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
  return blob.arrayBuffer();
}

/**
 * Convert a Browser Blob object into string.
 *
 * @param blob -
 */
export async function blobToString(blob: Blob): Promise<string> {
  return blob.text();
}

export async function streamToBuffer(
  _stream: NodeReadableStream,
  _buffer: NodeBuffer,
  _offset: number,
  _end: number,
  _encoding?: string,
): Promise<void> {
  throw new Error("streamToBuffer is not supported in the browser.");
}

export async function streamToBuffer2(
  _stream: NodeReadableStream,
  _buffer: NodeBuffer,
  _encoding?: string,
): Promise<number> {
  throw new Error("streamToBuffer2 is not supported in the browser.");
}

export async function readStreamToLocalFile(_rs: NodeReadableStream, _file: string): Promise<void> {
  throw new Error("readStreamToLocalFile is not supported in the browser.");
}

export const fsStat = async function stat(_path: string): Promise<{ size: number }> {
  throw new Error("fsStat is not supported in the browser.");
};

export const fsCreateReadStream = function createReadStream(
  _path: string,
  _options?: { autoClose?: boolean; end?: number; start?: number },
): NodeReadableStream {
  throw new Error("fsCreateReadStream is not supported in the browser.");
};
