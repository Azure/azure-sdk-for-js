import type { AvroReadable } from "@azure/storage-internal-avro";
/**
 * Read body from downloading operation methods to string.
 * Works in both Node.js and browsers.
 *
 * @param response - Convenience layer methods response with downloaded body
 * @param length - Length of Readable stream, needed for Node.js environment
 */
export declare function bodyToString(response: {
    readableStreamBody?: NodeJS.ReadableStream;
    blobBody?: Promise<Blob>;
}, length?: number): Promise<string>;
export declare function streamToAvroReadable(readableStream: NodeJS.ReadableStream): AvroReadable;
//# sourceMappingURL=utils.node.d.ts.map