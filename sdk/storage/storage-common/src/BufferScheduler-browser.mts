// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NodeReadableStream } from "@azure/core-rest-pipeline";

// BufferScheduler is only available in Node.js runtime.
// This stub provides a matching interface for browser type-checking.
export type OutgoingHandler = (
  body: () => NodeReadableStream,
  length: number,
  offset?: number,
) => Promise<unknown>;

export class BufferScheduler {
  constructor(
    _readable: NodeReadableStream,
    _bufferSize: number,
    _maxBuffers: number,
    _outgoingHandler: OutgoingHandler,
    _concurrency: number,
    _encoding?: string,
  ) {
    throw new Error("BufferScheduler is not supported in browser.");
  }

  async do(): Promise<void> {
    throw new Error("BufferScheduler is not supported in browser.");
  }
}
