// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as fs from "fs";
import * as util from "util";

/**
 * Reads a readable stream into buffer. Fill the buffer from offset to end.
 *
 * @export
 * @param {NodeJS.ReadableStream} stream A Node.js Readable stream
 * @param {Buffer} buffer Buffer to be filled, length must >= offset
 * @param {number} offset From which position in the buffer to be filled, inclusive
 * @param {number} end To which position in the buffer to be filled, exclusive
 * @param {string} [encoding] Encoding of the Readable stream
 * @returns {Promise<void>}
 */
export async function streamToBuffer(
  stream: NodeJS.ReadableStream,
  buffer: Buffer,
  offset: number,
  end: number,
  encoding?: string
): Promise<void> {
  let pos = 0; // Position in stream
  const count = end - offset; // Total amount of data needed in stream

  return new Promise<void>((resolve, reject) => {
    stream.on("readable", () => {
      if (pos >= count) {
        resolve();
        return;
      }

      let chunk = stream.read();
      if (!chunk) {
        return;
      }
      if (typeof chunk === "string") {
        chunk = Buffer.from(chunk, encoding);
      }

      // How much data needed in this chunk
      const chunkLength = pos + chunk.length > count ? count - pos : chunk.length;

      buffer.fill(chunk.slice(0, chunkLength), offset + pos, offset + pos + chunkLength);
      pos += chunkLength;
    });

    stream.on("end", () => {
      if (pos < count) {
        reject(
          new Error(
            `Stream drains before getting enough data needed. Data read: ${pos}, data need: ${count}`
          )
        );
      }
      resolve();
    });

    stream.on("error", reject);
  });
}

/**
 * Reads a readable stream into buffer entirely.
 *
 * @export
 * @param {NodeJS.ReadableStream} stream A Node.js Readable stream
 * @param {Buffer} buffer Buffer to be filled, length must >= offset
 * @param {string} [encoding] Encoding of the Readable stream
 * @returns {Promise<number>} with the count of bytes read.
 * @throws {RangeError} If buffer size is not big enough.
 */
export async function streamToBuffer2(
  stream: NodeJS.ReadableStream,
  buffer: Buffer,
  encoding?: string
): Promise<number> {
  let pos = 0; // Position in stream
  let bufferSize = buffer.length;

  return new Promise<number>((resolve, reject) => {
    stream.on("readable", () => {
      let chunk = stream.read();
      if (!chunk) {
        return;
      }
      if (typeof chunk === "string") {
        chunk = Buffer.from(chunk, encoding);
      }

      if (pos + chunk.length > bufferSize) {
        reject(new Error(`Stream exceeds buffer size. Buffer size: ${bufferSize}`));
        return;
      }

      buffer.fill(chunk, pos, pos + chunk.length);
      pos += chunk.length;
    });

    stream.on("end", () => {
      resolve(pos);
    });

    stream.on("error", reject);
  });
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Writes the content of a readstream to a local file. Returns a Promise which is completed after the file handle is closed.
 *
 * @export
 * @param {NodeJS.ReadableStream} rs The read stream.
 * @param {string} file Destination file path.
 * @returns {Promise<void>}
 */
export async function readStreamToLocalFile(
  rs: NodeJS.ReadableStream,
  file: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const ws = fs.createWriteStream(file);

    rs.on("error", (err: Error) => {
      reject(err);
    });

    ws.on("error", (err: Error) => {
      reject(err);
    });

    ws.on("close", resolve);

    rs.pipe(ws);
  });
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Promisified version of fs.stat().
 */
export const fsStat = util.promisify(fs.stat);

export const fsCreateReadStream = fs.createReadStream;
