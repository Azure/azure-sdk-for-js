import type { IncomingMessage } from "node:http";
import type { EventMessageStream, NodeJSReadableStream } from "./models.js";
/**
 * Processes a response stream into a stream of events.
 * @param chunkStream - A stream of Uint8Array chunks
 * @returns A stream of EventMessage objects
 */
export declare function createSseStream(chunkStream: ReadableStream<Uint8Array>): EventMessageStream;
/**
 * Processes a response stream into a stream of events.
 * @param chunkStream - A NodeJS HTTP response
 * @returns A stream of EventMessage objects
 */
export declare function createSseStream(chunkStream: IncomingMessage): EventMessageStream;
/**
 * Processes a response stream into a stream of events.
 * @param chunkStream - A NodeJS Readable stream
 * @returns A stream of EventMessage objects
 */
export declare function createSseStream(chunkStream: NodeJSReadableStream): EventMessageStream;
//# sourceMappingURL=sse.d.ts.map