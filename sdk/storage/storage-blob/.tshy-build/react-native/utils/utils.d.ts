import * as fs from "node:fs";
/**
 * Reads a readable stream into buffer. Fill the buffer from offset to end.
 *
 * @param stream - A Node.js Readable stream
 * @param buffer - Buffer to be filled, length must greater than or equal to offset
 * @param offset - From which position in the buffer to be filled, inclusive
 * @param end - To which position in the buffer to be filled, exclusive
 * @param encoding - Encoding of the Readable stream
 */
export declare function streamToBuffer(stream: NodeJS.ReadableStream, buffer: Buffer, offset: number, end: number, encoding?: BufferEncoding): Promise<void>;
/**
 * Reads a readable stream into buffer entirely.
 *
 * @param stream - A Node.js Readable stream
 * @param buffer - Buffer to be filled, length must greater than or equal to offset
 * @param encoding - Encoding of the Readable stream
 * @returns with the count of bytes read.
 * @throws `RangeError` If buffer size is not big enough.
 */
export declare function streamToBuffer2(stream: NodeJS.ReadableStream, buffer: Buffer, encoding?: BufferEncoding): Promise<number>;
/**
 * Reads a readable stream into a buffer.
 *
 * @param stream - A Node.js Readable stream
 * @param encoding - Encoding of the Readable stream
 * @returns with the count of bytes read.
 */
export declare function streamToBuffer3(readableStream: NodeJS.ReadableStream, encoding?: BufferEncoding): Promise<Buffer>;
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Writes the content of a readstream to a local file. Returns a Promise which is completed after the file handle is closed.
 *
 * @param rs - The read stream.
 * @param file - Destination file path.
 */
export declare function readStreamToLocalFile(rs: NodeJS.ReadableStream, file: string): Promise<void>;
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Promisified version of fs.stat().
 */
export declare const fsStat: typeof fs.stat.__promisify__;
export declare const fsCreateReadStream: typeof fs.createReadStream;
//# sourceMappingURL=utils.d.ts.map