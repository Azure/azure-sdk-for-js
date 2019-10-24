// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as fs from "fs";
import * as util from "util";
import { isNode } from "@azure/core-http";

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
      if (pos >= bufferSize) {
        reject(new Error(`Stream exceeds buffer size. Buffer size: ${bufferSize}`));
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
      const chunkLength = pos + chunk.length > bufferSize ? bufferSize - pos : chunk.length;

      buffer.fill(chunk.slice(0, chunkLength), pos, pos + chunkLength);
      pos += chunkLength;
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
 * If Promise is rejected, the reason will be set to the first error raised by either the
 * ReadableStream or the fs.WriteStream.
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

    // Set STREAM_DEBUG env var to log stream events while running tests
    if (process.env.STREAM_DEBUG) {
      rs.on("close", () => console.log("rs.close"));
      rs.on("data", () => console.log("rs.data"));
      rs.on("end", () => console.log("rs.end"));
      rs.on("error", () => console.log("rs.error"));

      ws.on("close", () => console.log("ws.close"));
      ws.on("drain", () => console.log("ws.drain"));
      ws.on("error", () => console.log("ws.error"));
      ws.on("finish", () => console.log("ws.finish"));
      ws.on("pipe", () => console.log("ws.pipe"));
      ws.on("unpipe", () => console.log("ws.unpipe"));
    }

    let error: Error;

    rs.on("error", (err: Error) => {
      // First error wins
      if (!error) {
        error = err;
      }

      // When rs.error is raised, rs.end will never be raised automatically, so it must be raised manually
      // to ensure ws.close is eventually raised.
      rs.emit("end");
    });

    ws.on("error", (err: Error) => {
      // First error wins
      if (!error) {
        error = err;
      }
    });

    ws.on("close", () => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

    rs.pipe(ws);
  });
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Promisified version of fs.stat().
 */
export const fsStat = util.promisify(isNode ? fs.stat : function stat() {});
