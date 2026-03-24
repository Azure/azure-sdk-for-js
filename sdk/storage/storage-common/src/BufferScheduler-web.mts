// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// BufferScheduler is only available in Node.js runtime.
// This stub provides matching signatures for type-checking.

/**
 * OutgoingHandler is an async function triggered by BufferScheduler.
 */
export declare type OutgoingHandler = (
  body: () => NodeJS.ReadableStream,
  length: number,
  offset?: number,
) => Promise<any>;

export class BufferScheduler {
  constructor(
    _readable: NodeJS.ReadableStream,
    _bufferSize: number,
    _maxBuffers: number,
    _outgoingHandler: OutgoingHandler,
    _concurrency: number,
    _encoding?: BufferEncoding,
  ) {
    throw new Error("BufferScheduler is not supported in browser environment");
  }

  public async do(): Promise<void> {
    throw new Error("BufferScheduler is not supported in browser environment");
  }
}
