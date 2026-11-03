// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IncomingMessage } from "node:http";

/**
 * An alias for Node.js's `http.IncomingMessage` type. Defined as `never` on
 * browser and React Native platforms where Node.js HTTP is not available.
 */
export type NodeIncomingMessage = IncomingMessage;

/**
 * A Node.js Readable stream that also has a `destroy` method.
 */
export interface NodeJSReadableStream extends NodeJS.ReadableStream {
  /**
   * Destroy the stream. Optionally emit an 'error' event, and emit a
   * 'close' event (unless emitClose is set to false). After this call,
   * internal resources will be released.
   */
  destroy(error?: Error): void;
}

/**
 * Cancels a Node.js stream by destroying it.
 */
export function cancelNodeStream(stream: IncomingMessage | NodeJSReadableStream): void {
  stream.destroy();
}
