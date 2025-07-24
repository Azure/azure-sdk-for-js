// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventMessageStream } from "./models.js";
import { createSseStream as _createSseStream } from "./sse.js";
export { EventMessageStream, EventMessage } from "./models.js";

/**
 * Processes a response stream into a stream of events.
 * @param chunkStream - A stream of Uint8Array chunks
 * @returns A stream of EventMessage objects
 */
export function createSseStream(chunkStream: ReadableStream<Uint8Array>): EventMessageStream {
  return _createSseStream(chunkStream as any);
}
