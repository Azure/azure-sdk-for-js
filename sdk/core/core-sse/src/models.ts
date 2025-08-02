// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventMessage } from "./modelsCommon.js";
import type { ReadableStream } from "node:stream/web";

export type { EventMessage };

/**
 * A stream of event messages
 */
export type EventMessageStream = ReadableStream<EventMessage> & AsyncDisposable;

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
