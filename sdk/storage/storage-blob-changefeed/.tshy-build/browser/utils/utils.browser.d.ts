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
}, _length?: number): Promise<string>;
export declare function blobToString(blob: Blob): Promise<string>;
export declare function bodyToAvroReadable(): void;
//# sourceMappingURL=utils.browser.d.ts.map