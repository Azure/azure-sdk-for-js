// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IncomingMessage } from "node:http";
import type { ReadableStream } from "node:stream/web";
import type { EventMessageStream, NodeJSReadableStream } from "./models.js";
import { createSseStream as _createSseStream } from "./sse.js";
export * from "./models.js";

/**
 * Processes a response stream into a stream of events.
 * @param chunkStream - A stream of Uint8Array chunks
 * @returns A stream of EventMessage objects
 */
export function createSseStream(chunkStream: ReadableStream<Uint8Array>): EventMessageStream;
/**
 * Processes a response stream into a stream of events.
 * @param chunkStream - A NodeJS HTTP response
 * @returns A stream of EventMessage objects
 */
export function createSseStream(chunkStream: IncomingMessage): EventMessageStream;
/**
 * Processes a response stream into a stream of events.
 * @param chunkStream - A NodeJS Readable stream
 * @returns A stream of EventMessage objects
 */
export function createSseStream(chunkStream: NodeJSReadableStream): EventMessageStream;
export function createSseStream(
  chunkStream: IncomingMessage | NodeJSReadableStream | ReadableStream<Uint8Array>,
): EventMessageStream {
  return _createSseStream(chunkStream as any);
}
